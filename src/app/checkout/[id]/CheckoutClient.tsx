/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/components/CurrencyProvider";
import { formatPrice } from "@/lib/currency";
import { 
  CheckCircle, 
  FileText, 
  CreditCard, 
  Receipt, 
  ArrowLeft, 
  ArrowRight, 
  Lock
} from "lucide-react";
import { Car } from "@prisma/client";
import { differenceInDays, parseISO } from "date-fns";
import { createRentalAction } from "@/app/actions/rental";
import { useRouter } from "next/navigation";

export default function CheckoutClient({ 
  car, 
  pickup, 
  dropoff 
}: { 
  car: Car; 
  pickup: string; 
  dropoff: string;
}) {
  const { currency } = useCurrency();
  const router = useRouter();
  const [step, setStep] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  
  const [renterData, setRenterData] = useState({
    fullName: "",
    cnic: "",
    age: "",
    phone: "",
  });

  const calculatedDays = useMemo(() => {
    if (!pickup || !dropoff) return 1;
    try {
      const days = differenceInDays(parseISO(dropoff), parseISO(pickup));
      return days > 0 ? days : 1;
    } catch {
      return 1;
    }
  }, [pickup, dropoff]);

  const baseRate = calculatedDays * car.pricePerDay;
  const insurance = 0;
  const tax = 0;
  const total = baseRate;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");
    
    try {
      const result = await createRentalAction({
        carId: car.id,
        customerName: renterData.fullName,
        customerCNIC: renterData.cnic,
        customerAge: parseInt(renterData.age),
        customerPhone: renterData.phone,
        pickupDateTime: pickup ? parseISO(pickup) : new Date(),
        returnDateTime: dropoff ? parseISO(dropoff) : new Date(Date.now() + 86400000),
        durationHours: calculatedDays * 24,
        totalAmount: total,
      });

      if (result.success && result.rentalId) {
        router.push(`/rental-agreement/${result.rentalId}`);
      } else {
        setError(result.error || "Payment failed");
        setIsProcessing(false);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col md:flex-row w-full max-w-7xl mx-auto p-margin-mobile md:p-margin-desktop gap-xl bg-background">
        {/* Left Column: Booking Flow */}
        <div className="w-full md:w-2/3 flex flex-col gap-xl">
          {/* Stepper */}
          <div className="bg-surface border border-outline shadow-soft rounded-xl p-md flex items-center justify-between overflow-x-auto whitespace-nowrap">
            <div className="flex flex-col items-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-outline mb-1" />
              <span className="font-utility-label text-[11px] uppercase tracking-widest text-outline">1. Confirm</span>
            </div>
            <div className="h-0.5 bg-outline flex-1 mx-2 min-w-[20px]"></div>
            <div className="flex flex-col items-center flex-shrink-0">
              {step > 2 ? (
                <CheckCircle className="w-5 h-5 text-primary mb-1" />
              ) : (
                <FileText className={cn("w-5 h-5 mb-1", step === 2 ? "text-primary" : "text-outline")} />
              )}
              <span className={cn("font-utility-label text-[11px] uppercase tracking-widest font-bold", step >= 2 ? "text-primary" : "text-outline")}>
                2. Renter Info
              </span>
            </div>
            <div className={cn("h-0.5 flex-1 mx-2 min-w-[20px]", step > 2 ? "bg-primary" : "bg-outline-variant")}></div>
            <div className="flex flex-col items-center flex-shrink-0">
              {step > 3 ? (
                <CheckCircle className="w-5 h-5 text-primary mb-1" />
              ) : (
                <CreditCard className={cn("w-5 h-5 mb-1", step === 3 ? "text-primary" : "text-outline-variant")} />
              )}
              <span className={cn("font-utility-label text-[11px] uppercase tracking-widest", step >= 3 ? "text-primary font-bold" : "text-outline-variant")}>
                3. Payment
              </span>
            </div>
            <div className={cn("h-0.5 flex-1 mx-2 min-w-[20px]", step > 3 ? "bg-primary" : "bg-outline-variant")}></div>
            <div className="flex flex-col items-center flex-shrink-0">
              <Receipt className={cn("w-5 h-5 mb-1", step === 4 ? "text-primary" : "text-outline-variant")} />
              <span className={cn("font-utility-label text-[11px] uppercase tracking-widest", step === 4 ? "text-primary font-bold" : "text-outline-variant")}>
                4. Done
              </span>
            </div>
          </div>

          {step === 2 && (
            <div className="bg-surface border border-outline shadow-soft rounded-xl p-md md:p-xl flex flex-col gap-lg">
              <h1 className="font-display-md text-[24px] font-medium text-primary border-b border-outline pb-sm mb-md tracking-tight">
                Driver Details
              </h1>
              <form 
                className="grid grid-cols-1 md:grid-cols-2 gap-md"
                onSubmit={(e) => { e.preventDefault(); setStep(3); }}
              >
                <div className="flex flex-col gap-xs col-span-1 md:col-span-2">
                  <label className="font-utility-label text-[12px] uppercase tracking-wider text-on-surface-variant">Full Legal Name</label>
                  <input
                    required
                    className="border border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded-md p-md font-body-md text-primary w-full bg-surface"
                    placeholder="As it appears on your license"
                    value={renterData.fullName}
                    onChange={(e) => setRenterData({ ...renterData, fullName: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-utility-label text-[12px] uppercase tracking-wider text-on-surface-variant">CNIC / ID Number</label>
                  <input
                    required
                    className="border border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded-md p-md font-body-md text-primary w-full bg-surface"
                    placeholder="XXXXX-XXXXXXX-X"
                    value={renterData.cnic}
                    onChange={(e) => setRenterData({ ...renterData, cnic: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-utility-label text-[12px] uppercase tracking-wider text-on-surface-variant">Age</label>
                  <input
                    required
                    type="number"
                    min="21"
                    className="border border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded-md p-md font-body-md text-primary w-full bg-surface"
                    placeholder="Must be 21+"
                    value={renterData.age}
                    onChange={(e) => setRenterData({ ...renterData, age: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-xs col-span-1 md:col-span-2">
                  <label className="font-utility-label text-[12px] uppercase tracking-wider text-on-surface-variant">Phone Number</label>
                  <input
                    required
                    type="tel"
                    className="border border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded-md p-md font-body-md text-primary w-full bg-surface"
                    placeholder="+1 (555) 000-0000"
                    value={renterData.phone}
                    onChange={(e) => setRenterData({ ...renterData, phone: e.target.value })}
                  />
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-between items-center mt-xl pt-lg border-t border-outline">
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="font-utility-label text-[12px] uppercase tracking-wider text-primary px-xl py-md hover:bg-surface-variant rounded-md transition-colors flex items-center gap-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="font-utility-label text-[12px] uppercase tracking-wider bg-primary text-on-primary rounded-md shadow-soft hover:bg-primary/90 px-xl py-md transition-colors flex items-center gap-sm font-medium"
                  >
                    Continue to Payment
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="bg-surface border border-outline shadow-soft rounded-xl p-md md:p-xl flex flex-col gap-lg">
              <h1 className="font-display-md text-[24px] font-medium text-primary border-b border-outline pb-sm mb-md tracking-tight">
                Payment Details
              </h1>
              {error && (
                <div className="bg-error-bg text-error-text border border-error-text/20 rounded-md p-sm mb-md font-utility-label text-[13px] text-center">
                  {error}
                </div>
              )}
              <form onSubmit={handlePayment} className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs col-span-1 md:col-span-2">
                  <label className="font-utility-label text-[12px] uppercase tracking-wider text-on-surface-variant">Card Number (MOCK)</label>
                  <input
                    required
                    className="border border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded-md p-md font-body-md text-primary w-full bg-surface"
                    placeholder="0000 0000 0000 0000"
                  />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-utility-label text-[12px] uppercase tracking-wider text-on-surface-variant">Expiry Date</label>
                  <input
                    required
                    className="border border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded-md p-md font-body-md text-primary w-full bg-surface"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-utility-label text-[12px] uppercase tracking-wider text-on-surface-variant">CVC</label>
                  <input
                    required
                    type="password"
                    maxLength={4}
                    className="border border-outline focus:border-primary focus:ring-1 focus:ring-primary rounded-md p-md font-body-md text-primary w-full bg-surface"
                    placeholder="123"
                  />
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-between items-center mt-xl pt-lg border-t border-outline">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="font-utility-label text-[12px] uppercase tracking-wider text-primary px-xl py-md hover:bg-surface-variant rounded-md transition-colors flex items-center gap-sm"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="font-utility-label text-[12px] uppercase tracking-wider bg-primary text-on-primary rounded-md shadow-soft hover:bg-primary/90 px-xl py-md transition-colors flex items-center gap-sm font-medium disabled:opacity-50"
                  >
                    {isProcessing ? "Processing..." : `Pay ${formatPrice(total, currency)}`}
                    {!isProcessing && <Lock className="w-4 h-4" />}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary Sidebar */}
        <div className="w-full md:w-1/3 flex flex-col gap-lg">
          <div className="bg-surface border border-outline shadow-soft rounded-xl overflow-hidden flex flex-col">
            <div
              className="bg-cover bg-center w-full h-48 border-b border-outline mix-blend-multiply"
              style={{ backgroundImage: `url('${car.images.split(",")[0] || ""}')` }}
            ></div>
            <div className="p-lg flex flex-col gap-md">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-display-sm text-[20px] font-medium text-primary tracking-tight">{car.name}</h2>
                  <p className="font-utility-label text-[11px] text-on-surface-variant mt-1 uppercase tracking-widest">{car.type}</p>
                </div>
                <div className="bg-primary text-on-primary px-2 py-1 font-utility-label text-[10px] rounded-[4px] uppercase">
                  {car.fuelType}
                </div>
              </div>
              
              <div className="h-[1px] bg-outline w-full my-sm"></div>
              {/* Dates */}
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="font-utility-label text-[10px] text-on-surface-variant uppercase tracking-widest">Pickup</span>
                  <span className="font-utility-data text-[13px] font-medium text-primary mt-1">{pickup || "-"}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-utility-label text-[10px] text-on-surface-variant uppercase tracking-widest">Dropoff</span>
                  <span className="font-utility-data text-[13px] font-medium text-primary mt-1">{dropoff || "-"}</span>
                </div>
              </div>
              <div className="h-[1px] bg-outline w-full my-sm"></div>
              {/* Price Breakdown */}
              <div className="flex flex-col gap-sm">
                <div className="flex justify-between">
                  <span className="font-utility-label text-[11px] text-on-surface-variant uppercase tracking-widest">Base Rate ({calculatedDays} days)</span>
                  <span className="font-utility-data text-[13px] font-medium text-primary">{formatPrice(baseRate, currency)}</span>
                </div>

              </div>
              <div className="flex justify-between mt-sm pt-md border-t border-outline">
                <span className="font-display-sm text-[16px] font-medium text-primary uppercase">Total</span>
                <span className="font-utility-data text-[18px] font-medium text-primary">{formatPrice(total, currency)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
