"use client";

import { useState, useMemo } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { differenceInDays, parseISO } from "date-fns";
import { useCurrency } from "@/components/CurrencyProvider";
import { formatPrice } from "@/lib/currency";
import { 
  ChevronRight, 
  Settings, 
  Fuel, 
  Gauge, 
  Users, 
  Briefcase, 
  CarFront, 
  CheckCircle, 
  Check, 
  XCircle, 
  X, 
  Calendar, 
  Car as CarIcon, 
  MessageCircle 
} from "lucide-react";
import { Car, Rental } from "@prisma/client";
import { useRouter } from "next/navigation";

type CarWithRentals = Car & { rentals?: Rental[] };

export default function CarDetailClient({ car }: { car: CarWithRentals }) {
  const { currency } = useCurrency();
  const router = useRouter();
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const calculatedDays = useMemo(() => {
    if (!pickupDate || !returnDate) return 0;
    try {
      const days = differenceInDays(parseISO(returnDate), parseISO(pickupDate));
      return days > 0 ? days : 0;
    } catch {
      return 0;
    }
  }, [pickupDate, returnDate]);

  const total = calculatedDays * car.pricePerDay;
  const now = new Date();
  const isDynamicAvailable = !car.rentals?.some(r => r.status === "Active" && new Date(r.returnDateTime) > now);
  const isAvailable = car.status === "Available" && isDynamicAvailable;

  const getWhatsAppLink = () => {
    const text = `Hi Easy Rent, I would like to book the ${car.name} from ${pickupDate} to ${returnDate}. Please confirm availability.`;
    return `https://wa.me/1234567890?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow px-margin-mobile md:px-margin-desktop py-xl max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-xl">
        {/* Left Column: Gallery & Details */}
        <div className="lg:col-span-8 flex flex-col gap-xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-sm font-utility-label text-[11px] uppercase tracking-widest text-on-surface-variant">
            <a className="hover:text-primary transition-colors" href="/fleet">
              Fleet
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="hover:text-primary transition-colors">{car.type}</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-primary font-bold">{car.name}</span>
          </div>

          {/* Header & Tags */}
          <div>
            <h1 className="font-display-lg text-[32px] md:text-[40px] text-primary tracking-tight mb-sm">
              {car.name}
            </h1>
            <div className="flex gap-sm">
              <span className="bg-primary text-on-primary font-utility-label text-[10px] px-2 py-1 rounded-[4px] uppercase tracking-wider">
                {car.type}
              </span>
              <span className="bg-surface-variant text-on-surface-variant font-utility-label text-[10px] px-2 py-1 rounded-[4px] uppercase tracking-wider">
                {car.fuelType}
              </span>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-sm rounded-xl overflow-hidden border border-outline">
            <div className="md:col-span-2 h-[400px] relative">
              {car.images ? (
                <img
                  className="w-full h-full object-cover"
                  src={car.images.split(",")[0]}
                  alt={car.name}
                />
              ) : (
                <div className="w-full h-full bg-surface-variant" />
              )}
            </div>
            <div className="h-[250px] relative">
              {car.images.split(",")[1] ? (
                <img
                  className="w-full h-full object-cover"
                  src={car.images.split(",")[1]}
                  alt={car.name + " Front"}
                />
              ) : (
                <div className="w-full h-full bg-surface-variant" />
              )}
            </div>
            <div className="h-[250px] relative">
              {car.images.split(",")[2] ? (
                <img
                  className="w-full h-full object-cover"
                  src={car.images.split(",")[2]}
                  alt={car.name + " Interior"}
                />
              ) : (
                <div className="w-full h-full bg-surface-variant" />
              )}
            </div>
          </div>

          {/* Specifications */}
          <section className="bg-surface border border-outline rounded-xl p-md md:p-lg flex flex-col gap-md shadow-soft">
            <h2 className="font-display-sm text-[20px] text-primary tracking-tight border-b border-outline pb-sm">
              Specifications
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-md">
              <div className="flex flex-col gap-xs">
                <span className="font-utility-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                  Transmission
                </span>
                <div className="flex items-center gap-xs text-primary font-body-md">
                  <Settings className="w-4 h-4 text-on-surface-variant" />
                  {car.transmission}
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <span className="font-utility-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                  Fuel
                </span>
                <div className="flex items-center gap-xs text-primary font-body-md">
                  <Fuel className="w-4 h-4 text-on-surface-variant" />
                  {car.fuelType}
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <span className="font-utility-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                  Mileage
                </span>
                <div className="flex items-center gap-xs text-primary font-body-md">
                  <Gauge className="w-4 h-4 text-on-surface-variant" />
                  {car.fuelEfficiency}
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <span className="font-utility-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                  Seats
                </span>
                <div className="flex items-center gap-xs text-primary font-body-md">
                  <Users className="w-4 h-4 text-on-surface-variant" />
                  {car.seatingCapacity}
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <span className="font-utility-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                  Baggage
                </span>
                <div className="flex items-center gap-xs text-primary font-body-md">
                  <Briefcase className="w-4 h-4 text-on-surface-variant" />
                  {car.baggageCapacity}
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <span className="font-utility-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                  Drive
                </span>
                <div className="flex items-center gap-xs text-primary font-body-md">
                  <CarFront className="w-4 h-4 text-on-surface-variant" />
                  {car.type}
                </div>
              </div>
            </div>
          </section>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            {/* Inclusions */}
            <div className="bg-surface border border-outline rounded-xl shadow-soft p-md flex flex-col gap-sm">
              <h3 className="font-utility-label text-[12px] text-primary uppercase tracking-widest border-b border-outline pb-sm flex items-center gap-xs">
                <CheckCircle className="w-4 h-4 text-[#34D399]" />
                Inclusions
              </h3>
              <ul className="font-body-md text-on-surface flex flex-col gap-sm mt-sm">
                {car.inclusions.split(",").map((item, i) => (
                  <li key={i} className="flex items-start gap-xs text-[14px]">
                    <Check className="w-4 h-4 text-[#34D399] shrink-0 mt-[2px]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Exclusions */}
            <div className="bg-surface border border-outline rounded-xl shadow-soft p-md flex flex-col gap-sm">
              <h3 className="font-utility-label text-[12px] text-primary uppercase tracking-widest border-b border-outline pb-sm flex items-center gap-xs">
                <XCircle className="w-4 h-4 text-[#F87171]" />
                Exclusions
              </h3>
              <ul className="font-body-md text-on-surface flex flex-col gap-sm mt-sm">
                {car.exclusions.split(",").map((item, i) => (
                  <li key={i} className="flex items-start gap-xs text-[14px]">
                    <X className="w-4 h-4 text-[#F87171] shrink-0 mt-[2px]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Widget */}
        <div className="lg:col-span-4 flex flex-col gap-md">
          {/* Sticky Container for Widget */}
          <div className="sticky top-[100px]">
            <div className="bg-surface border border-outline shadow-card rounded-xl p-lg flex flex-col gap-md relative z-10">
              <div className="flex justify-between items-end border-b border-outline pb-sm">
                <div className="flex flex-col">
                  <span className="font-utility-label text-[11px] text-on-surface-variant uppercase tracking-widest">
                    Rate
                  </span>
                  <span className="font-display-md text-[28px] text-primary tracking-tight">
                    {formatPrice(car.pricePerDay, currency)}
                  </span>
                </div>
                <span className="font-utility-label text-[12px] text-on-surface-variant mb-xs lowercase">
                  / day
                </span>
              </div>
              
              {/* Status Badge */}
              <div className="flex justify-between items-center font-utility-label text-[11px] uppercase tracking-widest">
                <span className="text-on-surface-variant">Status</span>
                {isAvailable ? (
                  <span className="bg-[#ECFDF5] text-[#059669] px-2 py-1 rounded-full flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#059669]"></div>
                    Available Now
                  </span>
                ) : (
                  <span className="bg-[#FEF2F2] text-[#DC2626] px-2 py-1 rounded-full flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#DC2626]"></div>
                    Rented
                  </span>
                )}
              </div>

              {/* Booking Form */}
              <form className="flex flex-col gap-md mt-sm">
                <div className="flex flex-col gap-xs">
                  <label className="font-utility-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                    Pick-up Date
                  </label>
                  <div className="relative border border-outline focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded-md bg-surface flex items-center p-2 transition-all">
                    <Calendar className="w-4 h-4 text-on-surface-variant mr-2" />
                    <input
                      className="w-full bg-transparent border-none focus:ring-0 font-body-md p-0 text-primary"
                      type="datetime-local"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-utility-label text-[10px] text-on-surface-variant uppercase tracking-widest">
                    Drop-off Date
                  </label>
                  <div className="relative border border-outline focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded-md bg-surface flex items-center p-2 transition-all">
                    <Calendar className="w-4 h-4 text-on-surface-variant mr-2" />
                    <input
                      className="w-full bg-transparent border-none focus:ring-0 font-body-md p-0 text-primary"
                      type="datetime-local"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bg-surface-variant rounded-md p-md mt-sm border border-outline">
                  <div className="flex justify-between items-center font-utility-label text-[11px] text-on-surface-variant uppercase tracking-widest mb-xs">
                    <span>Days</span>
                    <span className="text-primary">{calculatedDays > 0 ? calculatedDays : "-"}</span>
                  </div>
                  <div className="flex justify-between items-center font-display-sm text-[16px] text-primary tracking-tight border-t border-outline/50 pt-2 mt-2">
                    <span className="uppercase">Total</span>
                    <span className="font-utility-data">{calculatedDays > 0 ? formatPrice(total, currency) : "-"}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-sm mt-sm">
                  <button
                    className="w-full bg-primary text-on-primary rounded-md py-sm font-utility-label text-[13px] uppercase tracking-wider font-medium shadow-soft hover:bg-primary/90 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
                    type="button"
                    disabled={!calculatedDays || !isAvailable}
                    onClick={() => {
                      if (calculatedDays && isAvailable) {
                        router.push(`/checkout/${car.id}?pickup=${encodeURIComponent(pickupDate)}&dropoff=${encodeURIComponent(returnDate)}`);
                      }
                    }}
                  >
                    <CarIcon className="w-4 h-4" />
                    Book This Car
                  </button>
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-surface text-primary border border-outline rounded-md py-sm font-utility-label text-[13px] uppercase tracking-wider hover:bg-surface-variant transition-colors flex justify-center items-center gap-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Book via WhatsApp
                  </a>
                </div>
              </form>
              <div className="text-center font-utility-label text-[10px] text-on-surface-variant mt-xs">
                No credit card required for reservation.
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
