"use client";

import { useCurrency } from "@/components/CurrencyProvider";
import { formatPrice } from "@/lib/currency";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Car, Rental } from "@prisma/client";

type CarWithRentals = Car & { rentals?: Rental[] };

export default function FeaturedFleet({ cars }: { cars: CarWithRentals[] }) {
  const { currency } = useCurrency();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
      {cars.map((car) => {
        const isDynamicAvailable = !car.rentals?.some(r => r.status === "Active" && new Date(r.returnDateTime) > new Date());
        const isAvailable = car.status === "Available" && isDynamicAvailable;

        return (
          <div key={car.id} className="bg-surface rounded-xl border border-outline shadow-soft hover:shadow-card transition-shadow duration-300 group flex flex-col overflow-hidden">
            <div className="h-56 relative bg-surface-variant overflow-hidden">
              {car.images ? (
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out mix-blend-multiply dark:mix-blend-normal"
                  src={car.images.split(",")[0]}
                  alt={car.name}
                />
              ) : (
                <div className="w-full h-full bg-surface-variant" />
              )}
              <div className="absolute top-md left-md bg-surface/90 backdrop-blur text-primary font-utility-label text-[11px] px-2 py-1 rounded-md shadow-soft">
                {car.type}
              </div>
            </div>
            <div className="p-lg flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-md">
                <h3 className="font-headline-sm text-headline-sm text-primary tracking-tight truncate">
                  {car.name}
                </h3>
              </div>
              <div className="flex gap-sm mb-auto">
                <span className="bg-surface-variant text-on-surface-variant px-2 py-1 rounded font-utility-label text-[11px]">
                  {car.transmission}
                </span>
                <span className="bg-surface-variant text-on-surface-variant px-2 py-1 rounded font-utility-label text-[11px]">
                  {car.fuelType}
                </span>
              </div>
            </div>
            
            {isAvailable ? (
              <Link
                href={`/car/${car.id}`}
                className="group/action relative flex items-center justify-between p-lg border-t border-outline overflow-hidden transition-colors hover:bg-secondary"
              >
                <div className="flex items-center gap-sm relative z-10 transition-colors group-hover/action:text-on-secondary">
                  <div className="w-2 h-2 rounded-full bg-[#34D399] shadow-[0_0_8px_rgba(52,211,153,0.6)]"></div>
                  <span className="font-utility-label text-[11px] text-on-surface-variant group-hover/action:text-on-secondary/80 tracking-widest uppercase">
                    Available
                  </span>
                </div>
                <div className="font-utility-data text-utility-data text-primary relative z-10 group-hover/action:text-on-secondary flex items-center gap-xs">
                  {formatPrice(car.pricePerDay, currency)}
                  <span className="font-utility-label text-[11px] text-on-surface-variant group-hover/action:text-on-secondary/80">
                    /d
                  </span>
                  <ArrowRight className="text-[18px] opacity-0 -translate-x-2 group-hover/action:opacity-100 group-hover/action:translate-x-0 transition-all duration-300 w-5 h-5" />
                </div>
                <div className="absolute inset-0 bg-secondary translate-y-full group-hover/action:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
              </Link>
            ) : (
              <div className="flex items-center justify-between p-lg border-t border-outline bg-surface-variant/50">
                <div className="flex items-center gap-sm">
                  <div className="w-2 h-2 rounded-full bg-[#FBBF24]"></div>
                  <span className="font-utility-label text-[11px] text-[#92400E] dark:text-[#FBBF24] tracking-widest uppercase">
                    Rented
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
