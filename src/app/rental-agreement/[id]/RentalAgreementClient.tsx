"use client";

import Link from "next/link";
import { useCurrency } from "@/components/CurrencyProvider";
import { formatPrice } from "@/lib/currency";
import { Car as CarIcon, Download } from "lucide-react";
import { Rental, Car } from "@prisma/client";

type RentalWithCar = Rental & { car: Car };

export default function RentalAgreementClient({ rental }: { rental: RentalWithCar }) {
  const { currency } = useCurrency();
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen">
      {/* TopNavBar */}
      <header className="print:hidden bg-surface border-b border-outline w-full max-w-full px-margin-desktop py-md flex justify-between items-center fixed top-0 z-50">
        <div className="font-display-md text-[24px] font-medium tracking-tight text-primary">
          Easy Rent
        </div>
        <div className="font-utility-label text-[12px] uppercase tracking-widest text-on-surface-variant flex gap-md items-center hidden md:flex">
          <span>Document Portal</span>
        </div>
        <div className="flex items-center gap-md">
          <Link
            href="/fleet"
            className="font-utility-label text-[12px] uppercase tracking-wider font-medium text-primary border border-outline rounded-md px-lg py-sm hover:bg-surface-variant transition-colors"
          >
            Close Document
          </Link>
        </div>
      </header>
      <main className="pt-[100px] pb-2xl px-margin-mobile md:px-margin-desktop flex justify-center">
        {/* Document Container */}
        <div className="bg-surface border border-outline shadow-card rounded-xl w-full max-w-4xl flex flex-col p-xl">
          {/* Document Header */}
          <div className="border-b border-outline pb-lg mb-xl flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
            <div>
              <h1 className="font-display-md text-[28px] md:text-[36px] font-medium text-primary mb-sm tracking-tight">
                Official Rental Agreement
              </h1>
              <div className="font-utility-label text-[11px] text-on-surface-variant bg-surface-variant rounded-md py-1 px-3 inline-block border border-outline uppercase tracking-widest">
                Company ID #{rental.companyId}
              </div>
            </div>
            <div className="text-right flex flex-col items-end">
              <CarIcon className="w-12 h-12 text-primary/20 mb-2" />
              <div className="font-utility-label text-[11px] mt-sm uppercase tracking-widest text-on-surface-variant">
                Generated: {new Date(rental.createdAt).toISOString().split("T")[0]}
              </div>
            </div>
          </div>
          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-xl mb-2xl">
            {/* Section 1: Vehicle */}
            <section className="bg-surface-variant/30 border border-outline rounded-lg p-lg relative">
              <div className="font-utility-label text-[11px] font-bold uppercase tracking-widest text-primary mb-md border-b border-outline/50 pb-2">
                01. Vehicle Details
              </div>
              <div className="grid gap-md">
                <div>
                  <div className="font-utility-label text-[10px] text-on-surface-variant mb-1 uppercase tracking-widest">
                    Model
                  </div>
                  <div className="font-display-sm text-[20px] text-primary">
                    {rental.car.name}
                  </div>
                </div>
                <div>
                  <div className="font-utility-label text-[10px] text-on-surface-variant mb-1 uppercase tracking-widest">
                    License Plate
                  </div>
                  <div className="font-utility-data text-[14px] font-medium text-primary bg-surface py-1 px-2 rounded border border-outline inline-block">
                    {rental.car.licensePlate}
                  </div>
                </div>
                <div>
                  <div className="font-utility-label text-[10px] text-on-surface-variant mb-1 uppercase tracking-widest">
                    Category
                  </div>
                  <div className="inline-flex bg-primary text-on-primary px-2 py-1 rounded-[4px] font-utility-label text-[10px] uppercase tracking-wider">
                    {rental.car.type}
                  </div>
                </div>
              </div>
            </section>
            {/* Section 2: Customer */}
            <section className="bg-surface-variant/30 border border-outline rounded-lg p-lg relative">
              <div className="font-utility-label text-[11px] font-bold uppercase tracking-widest text-primary mb-md border-b border-outline/50 pb-2">
                02. Renter Information
              </div>
              <div className="grid grid-cols-2 gap-md">
                <div className="col-span-2">
                  <div className="font-utility-label text-[10px] text-on-surface-variant mb-1 uppercase tracking-widest">
                    Full Name
                  </div>
                  <div className="font-body-lg text-[18px] text-primary font-medium">
                    {rental.customerName}
                  </div>
                </div>
                <div>
                  <div className="font-utility-label text-[10px] text-on-surface-variant mb-1 uppercase tracking-widest">
                    CNIC / ID
                  </div>
                  <div className="font-utility-data text-[14px] text-primary">
                    {rental.customerCNIC}
                  </div>
                </div>
                <div>
                  <div className="font-utility-label text-[10px] text-on-surface-variant mb-1 uppercase tracking-widest">
                    Age
                  </div>
                  <div className="font-utility-data text-[14px] text-primary">
                    {rental.customerAge}
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="font-utility-label text-[10px] text-on-surface-variant mb-1 uppercase tracking-widest">
                    Contact Number
                  </div>
                  <div className="font-utility-data text-[14px] text-primary">
                    {rental.customerPhone}
                  </div>
                </div>
              </div>
            </section>
            {/* Section 3: Rental Details */}
            <section className="bg-surface-variant/30 border border-outline rounded-lg p-lg relative md:col-span-2">
              <div className="font-utility-label text-[11px] font-bold uppercase tracking-widest text-primary mb-md border-b border-outline/50 pb-2">
                03. Agreement Terms
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                <div className="border-b md:border-b-0 md:border-r border-outline md:pr-md pb-md md:pb-0">
                  <div className="font-utility-label text-[10px] text-on-surface-variant mb-2 uppercase tracking-widest">
                    Rental Period
                  </div>
                  <div className="font-utility-data text-[13px] text-primary mb-1">
                    <span className="text-on-surface-variant mr-2">START:</span> {new Date(rental.pickupDateTime).toLocaleString()}
                  </div>
                  <div className="font-utility-data text-[13px] text-primary">
                    <span className="text-on-surface-variant mr-2">END:</span> {new Date(rental.returnDateTime).toLocaleString()}
                  </div>
                </div>
                <div className="border-b md:border-b-0 md:border-r border-outline md:pr-md pb-md md:pb-0 flex flex-col justify-center">
                  <div className="font-utility-label text-[10px] text-on-surface-variant mb-2 uppercase tracking-widest">
                    Duration
                  </div>
                  <div className="font-display-sm text-[24px] text-primary">
                    {rental.durationHours / 24} Days
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-utility-label text-[10px] text-on-surface-variant mb-2 uppercase tracking-widest">
                    Total Amount Paid
                  </div>
                  <div className="font-utility-data text-[18px] text-primary bg-surface px-sm py-xs border border-outline rounded-md inline-block w-fit font-medium">
                    {currency === "USD" 
                      ? `${formatPrice(rental.totalAmount, "PKR")} (approx. ${formatPrice(rental.totalAmount, "USD")})`
                      : formatPrice(rental.totalAmount, "PKR")
                    }
                  </div>
                </div>
              </div>
            </section>
          </div>
          {/* Footer / Signatures */}
          <div className="mt-auto border-t border-outline pt-xl flex flex-col md:flex-row justify-between items-end gap-xl">
            <div className="w-full md:w-1/2 flex gap-xl">
              {/* Signature */}
              <div className="flex-1">
                <div className="h-16 border-b border-outline flex items-end pb-xs px-xs relative">
                  {/* Faux signature scribble via svg */}
                  <svg
                    className="absolute bottom-2 left-2 w-32 h-12 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 200 100"
                  >
                    <path d="M20,60 Q40,30 60,70 T100,50 T140,80 T180,40"></path>
                  </svg>
                </div>
                <div className="font-utility-label text-[10px] text-on-surface-variant mt-sm uppercase tracking-widest">
                  Renter Signature
                </div>
              </div>
              {/* Stamp */}
              <div className="w-24 h-24 border border-dashed border-outline rounded-full flex items-center justify-center relative rotate-[-5deg]">
                <div className="absolute inset-1 border border-[#059669] opacity-40 rounded-full flex items-center justify-center font-utility-label text-[9px] text-[#059669] uppercase font-bold text-center leading-tight transform -rotate-12">
                  Easy Rent<br />Verified
                </div>
              </div>
            </div>
            {/* Action */}
            <button onClick={() => window.print()} className="print:hidden bg-primary text-on-primary rounded-md px-xl py-sm font-utility-label text-[12px] uppercase tracking-wider font-medium flex items-center gap-sm shadow-soft hover:bg-primary/90 transition-all whitespace-nowrap">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
