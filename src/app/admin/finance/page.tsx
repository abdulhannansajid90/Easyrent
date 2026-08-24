import { getAdminFinance } from "./actions";
import { formatPrice } from "@/lib/currency";

export default async function AdminFinance() {
  const finance = await getAdminFinance();

  // Find max amount for chart scaling
  const maxAmount = Math.max(...finance.chartData.map(d => d.amount), 1); // Avoid div by zero

  return (
    <div className="flex flex-col gap-lg">
      <div className="border-b border-outline pb-sm">
        <h2 className="font-display-md text-[24px] font-medium text-primary tracking-tight">
          Finance & Ledger
        </h2>
        <p className="font-utility-label text-[12px] text-on-surface-variant uppercase tracking-widest mt-1">
          Revenue Tracking
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Wallet Balance & Chart (Left side) */}
        <div className="lg:col-span-1 flex flex-col gap-lg">
          <div className="bg-primary text-on-primary border border-primary shadow-soft rounded-xl p-lg flex flex-col justify-between items-start">
            <span className="font-utility-label text-[12px] uppercase tracking-wider text-primary/80">Total Wallet Balance</span>
            <div className="font-display-lg text-[36px] font-medium mt-2">
              {formatPrice(finance.walletBalance, "PKR")}
            </div>
          </div>

          <div className="bg-surface border border-outline shadow-soft rounded-xl p-lg flex flex-col gap-md">
            <h3 className="font-utility-label text-[12px] text-primary uppercase tracking-widest border-b border-outline pb-2">
              Last 7 Days Revenue
            </h3>
            <div className="h-48 flex items-end justify-between gap-2 pt-4">
              {finance.chartData.map((data, i) => {
                const heightPercent = (data.amount / maxAmount) * 100;
                return (
                  <div key={i} className="flex flex-col items-center gap-2 flex-1 group">
                    <div className="w-full bg-surface-variant rounded-t-sm relative h-full flex items-end">
                      <div 
                        className="w-full bg-primary rounded-t-sm transition-all duration-500 relative group-hover:bg-primary/80" 
                        style={{ height: `${heightPercent}%` }}
                      >
                        {/* Tooltip on hover */}
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-outline shadow-card text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 transition-opacity">
                          {formatPrice(data.amount, "PKR")}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-on-surface-variant uppercase">{data.date}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Ledger Table (Right side) */}
        <div className="lg:col-span-2 bg-surface border border-outline shadow-soft rounded-xl overflow-hidden flex flex-col">
          <div className="p-md border-b border-outline">
            <h3 className="font-utility-label text-[12px] text-primary uppercase tracking-widest">
              Ledger Transactions
            </h3>
          </div>
          
          {finance.transactions.length === 0 ? (
            <div className="p-xl text-center text-on-surface-variant font-utility-label text-[13px]">
              No transactions recorded yet.
            </div>
          ) : (
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-variant text-on-surface-variant border-b border-outline">
                    <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Date</th>
                    <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Vehicle</th>
                    <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Customer</th>
                    <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium text-right">Amount (Credited)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline">
                  {finance.transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-surface-variant/50 transition-colors">
                      <td className="p-md">
                        <div className="text-[13px] text-primary">
                          {new Date(tx.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-[11px] text-on-surface-variant">
                          {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="p-md text-[14px] text-primary">
                        {tx.rental.car.name}
                      </td>
                      <td className="p-md">
                        <div className="font-medium text-[14px] text-primary">{tx.rental.customerName}</div>
                      </td>
                      <td className="p-md text-right font-utility-data text-[14px] text-[#059669]">
                        +{formatPrice(tx.amountCredited, "PKR")}
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
