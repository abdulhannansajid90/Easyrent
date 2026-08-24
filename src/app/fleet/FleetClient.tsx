"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/components/CurrencyProvider";
import { formatPrice } from "@/lib/currency";
import { 
  LayoutGrid, 
  List, 
  Settings, 
  Fuel, 
  Users, 
  Zap, 
  CheckCircle2, 
  Clock 
} from "lucide-react";
import { Car, Rental } from "@prisma/client";

type CarWithRentals = Car & { rentals?: Rental[] };

export default function FleetClient({ initialCars }: { initialCars: CarWithRentals[] }) {
  const { currency } = useCurrency();
  const [rateType, setRateType] = useState<"daily" | "weekly" | "monthly">("daily");

  const [transmissions, setTransmissions] = useState<string[]>([]);
  const [powertrains, setPowertrains] = useState<string[]>([]);

  const handleTransmissionChange = (val: string) => {
    setTransmissions(prev => prev.includes(val) ? prev.filter(t => t !== val) : [...prev, val]);
  };

  const handlePowertrainChange = (val: string) => {
    setPowertrains(prev => prev.includes(val) ? prev.filter(p => p !== val) : [...prev, val]);
  };

  const resetFilters = () => {
    setRateType("daily");
    setTransmissions([]);
    setPowertrains([]);
  };

  const filteredCars = useMemo(() => {
    return initialCars.filter(car => {
      const matchTrans = transmissions.length === 0 || transmissions.includes(car.transmission);
      const matchPower = powertrains.length === 0 || powertrains.includes(car.fuelType);
      return matchTrans && matchPower;
    });
  }, [initialCars, transmissions, powertrains]);

  const getPrice = (car: Car) => {
    if (rateType === "weekly") return car.pricePerWeek;
    if (rateType === "monthly") return car.pricePerMonth;
    return car.pricePerDay;
  };

  const getRateLabel = () => {
    if (rateType === "weekly") return "/WK";
    if (rateType === "monthly") return "/MO";
    return "/DAY";
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col md:flex-row flex-1 w-full max-w-[1440px] mx-auto bg-background">
        {/* Left Sidebar Filter Panel */}
        <aside className="w-full md:w-72 border-b md:border-b-0 md:border-r border-outline bg-surface p-margin-mobile md:p-margin-desktop flex-shrink-0">
          <div className="sticky top-2xl">
            <h2 className="font-display-sm text-[20px] font-medium text-primary mb-lg tracking-tight">
              Filters
            </h2>
            
            {/* Pricing Toggle */}
            <div className="mb-xl">
              <h3 className="font-utility-label text-[11px] uppercase tracking-widest text-on-surface-variant mb-sm">
                RATE TYPE
              </h3>
              <div className="flex bg-surface-variant p-1 rounded-md">
                <button
                  onClick={() => setRateType("daily")}
                  className={cn(
                    "flex-1 py-1.5 font-utility-label text-[11px] uppercase rounded-sm transition-all",
                    rateType === "daily"
                      ? "bg-surface shadow-soft text-primary font-medium"
                      : "text-on-surface-variant hover:text-primary"
                  )}
                >
                  Daily
                </button>
                <button
                  onClick={() => setRateType("weekly")}
                  className={cn(
                    "flex-1 py-1.5 font-utility-label text-[11px] uppercase rounded-sm transition-all",
                    rateType === "weekly"
                      ? "bg-surface shadow-soft text-primary font-medium"
                      : "text-on-surface-variant hover:text-primary"
                  )}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setRateType("monthly")}
                  className={cn(
                    "flex-1 py-1.5 font-utility-label text-[11px] uppercase rounded-sm transition-all",
                    rateType === "monthly"
                      ? "bg-surface shadow-soft text-primary font-medium"
                      : "text-on-surface-variant hover:text-primary"
                  )}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Transmission */}
            <div className="mb-xl">
              <h3 className="font-utility-label text-[11px] uppercase tracking-widest text-on-surface-variant mb-sm">
                TRANSMISSION
              </h3>
              <div className="flex flex-col gap-sm">
                <label className="flex items-center gap-sm cursor-pointer group">
                  <input 
                    checked={transmissions.includes("Automatic")}
                    onChange={() => handleTransmissionChange("Automatic")}
                    className="w-4 h-4 rounded border-outline text-primary focus:ring-primary" 
                    type="checkbox" 
                  />
                  <span className="font-body-md text-[14px] text-primary group-hover:text-primary/80 transition-colors">
                    Automatic
                  </span>
                </label>
                <label className="flex items-center gap-sm cursor-pointer group">
                  <input 
                    checked={transmissions.includes("Manual")}
                    onChange={() => handleTransmissionChange("Manual")}
                    className="w-4 h-4 rounded border-outline text-primary focus:ring-primary" 
                    type="checkbox" 
                  />
                  <span className="font-body-md text-[14px] text-primary group-hover:text-primary/80 transition-colors">
                    Manual
                  </span>
                </label>
              </div>
            </div>

            {/* Fuel Type */}
            <div className="mb-xl">
              <h3 className="font-utility-label text-[11px] uppercase tracking-widest text-on-surface-variant mb-sm">
                POWERTRAIN
              </h3>
              <div className="flex flex-col gap-sm">
                <label className="flex items-center gap-sm cursor-pointer group">
                  <input 
                    checked={powertrains.includes("Petrol")}
                    onChange={() => handlePowertrainChange("Petrol")}
                    className="w-4 h-4 rounded border-outline text-primary focus:ring-primary" 
                    type="checkbox" 
                  />
                  <span className="font-body-md text-[14px] text-primary group-hover:text-primary/80 transition-colors">
                    Petrol
                  </span>
                </label>
                <label className="flex items-center gap-sm cursor-pointer group">
                  <input 
                    checked={powertrains.includes("Hybrid")}
                    onChange={() => handlePowertrainChange("Hybrid")}
                    className="w-4 h-4 rounded border-outline text-primary focus:ring-primary" 
                    type="checkbox" 
                  />
                  <span className="font-body-md text-[14px] text-primary group-hover:text-primary/80 transition-colors">
                    Hybrid
                  </span>
                </label>
                <label className="flex items-center gap-sm cursor-pointer group">
                  <input 
                    checked={powertrains.includes("EV")}
                    onChange={() => handlePowertrainChange("EV")}
                    className="w-4 h-4 rounded border-outline text-primary focus:ring-primary" 
                    type="checkbox" 
                  />
                  <span className="font-body-md text-[14px] text-primary group-hover:text-primary/80 transition-colors">
                    EV
                  </span>
                </label>
              </div>
            </div>

            <button 
              onClick={resetFilters}
              className="w-full font-utility-label text-[12px] uppercase tracking-wider text-primary border border-outline rounded-md py-sm hover:bg-surface-variant transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Main Grid Area */}
        <section className="flex-1 p-margin-mobile md:p-margin-desktop bg-background">
          <div className="flex justify-between items-end mb-lg border-b border-outline pb-sm">
            <div>
              <h1 className="font-display-md text-[28px] md:text-[32px] font-medium text-primary tracking-tight">
                Available Units
              </h1>
              <p className="font-utility-label text-[11px] uppercase tracking-widest text-on-surface-variant mt-1">
                Showing {filteredCars.length} results matching criteria.
              </p>
            </div>
            <div className="hidden sm:flex bg-surface-variant p-1 rounded-md border border-outline">
              <button className="p-1.5 rounded-sm bg-surface shadow-soft text-primary">
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-sm text-on-surface-variant hover:text-primary transition-colors">
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {filteredCars.map((car) => {
              const isDynamicAvailable = !car.rentals?.some(r => r.status === "Active" && new Date(r.returnDateTime) > new Date());
              const isAvailable = car.status === "Available" && isDynamicAvailable;
              return (
                <article
                  key={car.id}
                  className={cn(
                    "bg-surface border border-outline shadow-soft rounded-xl flex flex-col hover:shadow-card transition-all duration-300 group relative overflow-hidden",
                    !isAvailable && "opacity-80 grayscale-[30%]"
                  )}
                >
                  <div className="absolute top-md left-md z-10 bg-surface/90 backdrop-blur text-primary font-utility-label text-[10px] px-2 py-1 uppercase rounded-[4px] shadow-soft">
                    {car.type}
                  </div>
                  
                  <div className="h-48 relative overflow-hidden bg-surface-variant">
                    {car.images ? (
                      <img
                        src={car.images.split(",")[0]}
                        alt={car.name}
                        className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-variant" />
                    )}
                  </div>
                  
                  <div className="p-md flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-sm">
                      <h2 className="font-display-sm text-[20px] font-medium text-primary tracking-tight truncate pr-2">
                        {car.name}
                      </h2>
                      <div className="text-right shrink-0">
                        <span className="font-utility-data text-[18px] font-medium text-primary block">
                          {formatPrice(getPrice(car), currency)}
                        </span>
                        <span className="font-utility-label text-[10px] uppercase text-on-surface-variant tracking-widest">
                          {getRateLabel()}
                        </span>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="mb-md border-b border-outline pb-md">
                      {isAvailable ? (
                        <div className="inline-flex items-center gap-1.5 bg-[#ECFDF5] text-[#059669] px-2.5 py-1 rounded-full font-utility-label text-[10px] uppercase tracking-widest font-medium">
                          <CheckCircle2 className="w-3 h-3" />
                          AVAILABLE NOW
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 bg-[#FFFBEB] text-[#D97706] px-2.5 py-1 rounded-full font-utility-label text-[10px] uppercase tracking-widest font-medium">
                          <Clock className="w-3 h-3" />
                          RENTED
                        </div>
                      )}
                    </div>
                    
                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-x-sm gap-y-xs mb-md flex-1">
                      <div className="flex items-center gap-2 font-body-md text-[13px] text-primary truncate">
                        <Settings className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
                        <span className="truncate">{car.transmission}</span>
                      </div>
                      <div className="flex items-center gap-2 font-body-md text-[13px] text-primary truncate">
                        <Fuel className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
                        <span className="truncate">{car.fuelType}</span>
                      </div>
                      <div className="flex items-center gap-2 font-body-md text-[13px] text-primary truncate">
                        <Users className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
                        <span className="truncate">{car.seatingCapacity} Seats</span>
                      </div>
                      <div className="flex items-center gap-2 font-body-md text-[13px] text-primary truncate">
                        <Zap className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
                        <span className="truncate">{car.fuelEfficiency}</span>
                      </div>
                    </div>
                  </div>
                  
                  {isAvailable ? (
                    <Link
                      href={`/car/${car.id}`}
                      className="w-full bg-primary text-on-primary font-utility-label text-[12px] uppercase tracking-wider font-medium py-sm hover:bg-primary/90 transition-colors text-center block rounded-b-xl"
                    >
                      View Details
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-surface-variant text-on-surface-variant font-utility-label text-[12px] uppercase tracking-wider font-medium py-sm cursor-not-allowed text-center rounded-b-xl"
                    >
                      Unavailable
                    </button>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
