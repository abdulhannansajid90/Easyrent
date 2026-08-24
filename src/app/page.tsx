import Link from "next/link";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PrismaClient } from "@prisma/client";
import FeaturedFleet from "@/components/FeaturedFleet";

const prisma = new PrismaClient();

export default async function Home() {
  const featuredCars = await prisma.car.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
    include: { rentals: true }
  });

  return (
    <>
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section with Search Widget */}
        <section className="relative px-margin-mobile md:px-margin-desktop py-2xl lg:py-[120px] overflow-hidden bg-surface flex items-center min-h-[80vh]">
          <div
            className="absolute inset-0 z-0 opacity-40 dark:opacity-20"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAeBmL5iettTlaY7Rhnn0P8Fyh0fqf2isQNwKROuXUP_DIxRerRPEBhAoG7GFYhBxhQ5RoRBfXJta-Dgi14NjFYNkY6DC076Q7q2Lbz6VlzSenwM2WEw6Zw1GhO01eUHIdWDfCPrb9YxL1V0iJVK155ZdaEqDCcMU7FZsOqbe7W1uCkIGhCNb4conDtwYSueRMU7bFFcHN1VBNOPZWjNq9qkpsSXv7I3aSXF2q-mMxJjHBgP9knUCG3')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/40 z-10"></div>
          
          <div className="relative z-20 max-w-7xl mx-auto flex flex-col lg:flex-row gap-2xl items-center w-full">
            <div className="w-full lg:w-1/2 flex flex-col gap-lg">
              <h1 className="font-display-lg-mobile md:font-display-lg text-primary tracking-tight">
                Rent the Road.
              </h1>
              <p className="font-body-lg text-on-surface-variant max-w-lg">
                Utilitarian vehicles for the uncompromising journey. Book instantly, drive immediately.
              </p>
              
              <div className="bg-surface/90 backdrop-blur-xl p-lg rounded-xl shadow-card border border-outline mt-md">
                <form action="/fleet" className="flex flex-col gap-md">
                  {/* Toggles */}
                  <div className="grid grid-cols-2 gap-md">
                    <div className="flex bg-surface-variant p-1 rounded-md">
                      <label className="flex-1 cursor-pointer">
                        <input defaultChecked className="peer sr-only" name="tripType" type="radio" value="intra" />
                        <div className="text-center py-1.5 font-utility-label text-utility-label rounded peer-checked:bg-surface peer-checked:text-primary peer-checked:shadow-soft text-on-surface-variant transition-all">
                          Intra-city
                        </div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input className="peer sr-only" name="tripType" type="radio" value="inter" />
                        <div className="text-center py-1.5 font-utility-label text-utility-label rounded peer-checked:bg-surface peer-checked:text-primary peer-checked:shadow-soft text-on-surface-variant transition-all">
                          Inter-city
                        </div>
                      </label>
                    </div>
                    <div className="flex bg-surface-variant p-1 rounded-md">
                      <label className="flex-1 cursor-pointer">
                        <input defaultChecked className="peer sr-only" name="serviceType" type="radio" value="self" />
                        <div className="text-center py-1.5 font-utility-label text-utility-label rounded peer-checked:bg-surface peer-checked:text-primary peer-checked:shadow-soft text-on-surface-variant transition-all">
                          Self-Drive
                        </div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input className="peer sr-only" name="serviceType" type="radio" value="driver" />
                        <div className="text-center py-1.5 font-utility-label text-utility-label rounded peer-checked:bg-surface peer-checked:text-primary peer-checked:shadow-soft text-on-surface-variant transition-all">
                          With Driver
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Inputs */}
                  <div className="flex flex-col gap-xs">
                    <label className="font-utility-label text-[11px] uppercase tracking-wider text-on-surface-variant">
                      Pickup City
                    </label>
                    <div className="relative">
                      <select
                        name="city"
                        className="w-full border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-md py-sm font-body-md appearance-none bg-surface"
                      >
                        <option value="">Select City...</option>
                        <option value="metropolis">Metropolis Center</option>
                        <option value="industrial">Industrial District</option>
                        <option value="airport">Airport Terminal</option>
                      </select>
                      <ChevronDown className="absolute right-md top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none w-5 h-5" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-md">
                    <div className="flex flex-col gap-xs">
                      <label className="font-utility-label text-[11px] uppercase tracking-wider text-on-surface-variant">
                        Pickup Date
                      </label>
                      <input
                        name="pickup"
                        className="w-full border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-md py-sm font-body-md bg-surface text-primary"
                        type="datetime-local"
                      />
                    </div>
                    <div className="flex flex-col gap-xs">
                      <label className="font-utility-label text-[11px] uppercase tracking-wider text-on-surface-variant">
                        Return Date
                      </label>
                      <input
                        name="return"
                        className="w-full border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-md py-sm font-body-md bg-surface text-primary"
                        type="datetime-local"
                      />
                    </div>
                  </div>

                  <button
                    className="w-full bg-primary text-on-primary rounded-md p-md font-utility-label text-utility-label hover:bg-primary/90 transition-all shadow-soft mt-sm flex items-center justify-center gap-sm"
                    type="submit"
                  >
                    Search Fleet
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Fleet Grid */}
        <section className="px-margin-mobile md:px-margin-desktop py-3xl bg-background">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display-md text-display-md text-primary tracking-tight mb-2xl">
              Featured Fleet
            </h2>
            <FeaturedFleet cars={featuredCars} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
