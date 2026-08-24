import Link from "next/link";
import { ReactNode } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { CurrencyProvider } from "@/components/CurrencyProvider";
import CurrencyToggle from "@/components/shared/CurrencyToggle";
import LogoutButton from "@/components/admin/LogoutButton";
import {
  Squares2X2Icon,
  TruckIcon,
  CalendarDaysIcon,
  BanknotesIcon,
  PlusIcon,
  Bars3Icon
} from "@heroicons/react/24/outline";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <>{children}</>;
  }

  return (
    <CurrencyProvider storageKey="admin-currency">
      <div className="bg-background text-foreground font-body-md min-h-screen flex selection:bg-primary/20">
        {/* SideNavBar */}
        <nav className="bg-surface text-primary h-screen w-64 border-r border-outline flex-col overflow-y-auto hidden md:flex shrink-0">
          <div className="p-lg border-b border-outline">
            <div className="flex items-center gap-md mb-lg">
              <div className="w-10 h-10 bg-surface-variant rounded-md flex items-center justify-center shrink-0">
                <Squares2X2Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display-md text-[18px] font-medium text-primary tracking-tight leading-none">
                  Easy Rent
                </h1>
                <p className="font-utility-label text-[11px] text-on-surface-variant uppercase tracking-widest mt-1">
                  Workspace
                </p>
              </div>
            </div>
            <Link
              href="/admin/fleet/new"
              className="w-full bg-primary text-on-primary rounded-md py-sm px-md font-utility-label text-[13px] font-medium shadow-soft hover:bg-primary/90 transition-all flex items-center justify-center gap-sm"
            >
              <PlusIcon className="w-4 h-4" />
              Add Vehicle
            </Link>
          </div>
          <ul className="flex-1 py-md px-md flex flex-col gap-1">
            <li>
              <Link
                href="/admin"
                className="text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors rounded-md flex items-center gap-md px-md py-sm font-utility-label text-[13px]"
              >
                <Squares2X2Icon className="w-5 h-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/fleet"
                className="text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors rounded-md flex items-center gap-md px-md py-sm font-utility-label text-[13px]"
              >
                <TruckIcon className="w-5 h-5" />
                Fleet
              </Link>
            </li>
            <li>
              <Link
                href="/admin/rentals"
                className="text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors rounded-md flex items-center gap-md px-md py-sm font-utility-label text-[13px]"
              >
                <CalendarDaysIcon className="w-5 h-5" />
                Rentals
              </Link>
            </li>
            <li>
              <Link
                href="/admin/finance"
                className="text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors rounded-md flex items-center gap-md px-md py-sm font-utility-label text-[13px]"
              >
                <BanknotesIcon className="w-5 h-5" />
                Finance
              </Link>
            </li>
          </ul>
          <div className="p-md border-t border-outline flex flex-col gap-md">
            <div className="flex items-center justify-between">
              <CurrencyToggle />
            </div>
            <LogoutButton />
          </div>
        </nav>

        {/* Main Content Canvas */}
        <main className="flex-1 flex flex-col h-screen overflow-y-auto bg-background relative">
          {/* Minimal Top Header for Mobile */}
          <header className="md:hidden bg-surface border-b border-outline p-md flex justify-between items-center z-10 shrink-0 sticky top-0">
            <h1 className="font-display-md text-[18px] font-medium text-primary tracking-tight">
              Workspace
            </h1>
            <button className="text-primary p-2">
              <Bars3Icon className="w-6 h-6" />
            </button>
          </header>

          <div className="flex-1 p-margin-mobile md:p-margin-desktop">
            {children}
          </div>
        </main>

        {/* BottomNavBar for Mobile (Visible only on md:hidden) */}
        <nav className="md:hidden bg-surface border-t border-outline fixed bottom-0 w-full z-50 px-margin-mobile py-2 flex justify-between items-center pb-safe">
          <Link href="/admin" className="flex flex-col items-center gap-1 text-primary w-1/4">
            <div className="p-1 rounded-md bg-surface-variant">
              <Squares2X2Icon className="w-5 h-5" />
            </div>
            <span className="font-utility-label text-[10px] uppercase font-medium">Overview</span>
          </Link>
          <Link href="/admin/fleet" className="flex flex-col items-center gap-1 text-on-surface-variant w-1/4">
            <div className="p-1">
              <TruckIcon className="w-5 h-5" />
            </div>
            <span className="font-utility-label text-[10px] uppercase font-medium">Fleet</span>
          </Link>
          <Link href="/admin/rentals" className="flex flex-col items-center gap-1 text-on-surface-variant w-1/4">
            <div className="p-1">
              <CalendarDaysIcon className="w-5 h-5" />
            </div>
            <span className="font-utility-label text-[10px] uppercase font-medium">Rentals</span>
          </Link>
          <Link href="/admin/finance" className="flex flex-col items-center gap-1 text-on-surface-variant w-1/4">
            <div className="p-1">
              <BanknotesIcon className="w-5 h-5" />
            </div>
            <span className="font-utility-label text-[10px] uppercase font-medium">Finance</span>
          </Link>
        </nav>
        <div className="md:hidden h-20 w-full shrink-0"></div>
      </div>
    </CurrencyProvider>
  );
}
