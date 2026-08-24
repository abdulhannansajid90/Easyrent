/* eslint-disable react/no-unescaped-entities */
import { getDashboardStats } from "./actions";
import { formatPrice } from "@/lib/currency";
import Link from "next/link";
import {
  TruckIcon,
  BanknotesIcon,
  ChartBarIcon,
  CheckBadgeIcon
} from "@heroicons/react/24/outline";

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div className="flex flex-col gap-xl">
      <div>
        <h2 className="font-display-md text-[24px] font-medium text-primary tracking-tight">
          Overview
        </h2>
        <p className="font-utility-label text-[12px] text-on-surface-variant uppercase tracking-widest mt-1">
          System Status & Metrics
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
        <div className="bg-surface border border-outline shadow-soft rounded-xl p-lg flex flex-col gap-sm">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <TruckIcon className="w-5 h-5" />
            <span className="font-utility-label text-[12px] uppercase tracking-wider">Total Fleet</span>
          </div>
          <div className="font-display-lg text-[32px] text-primary mt-auto">
            {stats.totalCars}
          </div>
          <div className="flex gap-2 text-[12px] mt-2">
            <span className="text-[#34D399] font-medium">{stats.availableCars} Available</span>
            <span className="text-on-surface-variant">•</span>
            <span className="text-[#FBBF24] font-medium">{stats.rentedCars} Rented</span>
          </div>
        </div>

        <div className="bg-surface border border-outline shadow-soft rounded-xl p-lg flex flex-col gap-sm">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <ChartBarIcon className="w-5 h-5" />
            <span className="font-utility-label text-[12px] uppercase tracking-wider">Today's Revenue</span>
          </div>
          <div className="font-utility-data text-[28px] font-medium text-primary mt-auto">
            {formatPrice(stats.todaysRevenue, "PKR")}
          </div>
        </div>

        <div className="bg-surface border border-outline shadow-soft rounded-xl p-lg flex flex-col gap-sm">
          <div className="flex items-center gap-2 text-on-surface-variant">
            <BanknotesIcon className="w-5 h-5" />
            <span className="font-utility-label text-[12px] uppercase tracking-wider">Wallet Balance</span>
          </div>
          <div className="font-utility-data text-[28px] font-medium text-primary mt-auto">
            {formatPrice(stats.walletBalance, "PKR")}
          </div>
        </div>

        <div className="bg-primary text-on-primary border border-primary shadow-soft rounded-xl p-lg flex flex-col justify-between items-start">
          <div className="flex items-center gap-2">
            <CheckBadgeIcon className="w-5 h-5 text-secondary" />
            <span className="font-utility-label text-[12px] uppercase tracking-wider text-primary/80">System Health</span>
          </div>
          <div>
            <div className="font-display-lg text-[24px]">All Systems Operational</div>
            <p className="text-[12px] opacity-80 mt-1">Database and Auth are active.</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Feed */}
      <div>
        <div className="flex justify-between items-end mb-md border-b border-outline pb-sm">
          <h3 className="font-headline-sm text-[18px] font-medium text-primary">Recent Bookings</h3>
          <Link href="/admin/rentals" className="font-utility-label text-[12px] text-primary hover:underline">
            View All
          </Link>
        </div>
        <div className="bg-surface border border-outline shadow-soft rounded-xl overflow-hidden">
          {stats.recentBookings.length === 0 ? (
            <div className="p-xl text-center text-on-surface-variant font-utility-label text-[13px]">
              No recent bookings found.
            </div>
          ) : (
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-variant text-on-surface-variant border-b border-outline">
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Customer</th>
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Car</th>
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Dates</th>
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Amount</th>
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline">
                {stats.recentBookings.map((rental) => (
                  <tr key={rental.id} className="hover:bg-surface-variant/50 transition-colors">
                    <td className="p-md">
                      <div className="font-medium text-[14px] text-primary">{rental.customerName}</div>
                      <div className="text-[12px] text-on-surface-variant">{rental.customerPhone}</div>
                    </td>
                    <td className="p-md text-[14px] text-primary">
                      {rental.car.name}
                    </td>
                    <td className="p-md">
                      <div className="text-[13px] text-primary">
                        {new Date(rental.pickupDateTime).toLocaleDateString()}
                      </div>
                      <div className="text-[11px] text-on-surface-variant">
                        {rental.durationHours} hours
                      </div>
                    </td>
                    <td className="p-md font-utility-data text-[14px] text-primary">
                      {formatPrice(rental.totalAmount, "PKR")}
                    </td>
                    <td className="p-md">
                      <span className="px-2 py-1 rounded bg-[#ECFDF5] text-[#065F46] dark:bg-[#022C22] dark:text-[#34D399] font-utility-label text-[10px] uppercase">
                        {rental.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
