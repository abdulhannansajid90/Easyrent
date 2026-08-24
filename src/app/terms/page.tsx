import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto w-full px-margin-mobile md:px-margin-desktop py-xl">
        <h1 className="font-display-md text-display-md font-extrabold text-primary uppercase border-b-4 border-primary pb-sm mb-lg">
          Terms & Conditions
        </h1>
        <div className="flex flex-col gap-lg bg-surface border-2 border-primary p-md md:p-xl brutal-shadow">
          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary uppercase mb-xs">1. Usage</h2>
            <p className="font-body-md text-on-surface-variant">
              Vehicles must be driven within designated areas. Off-roading is prohibited unless specified.
            </p>
          </section>
          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary uppercase mb-xs">2. Fuel Policy</h2>
            <p className="font-body-md text-on-surface-variant">
              Vehicles must be returned with the same fuel level as at the time of pickup.
            </p>
          </section>
          <section>
            <h2 className="font-headline-sm text-headline-sm text-primary uppercase mb-xs">3. Fines & Tolls</h2>
            <p className="font-body-md text-on-surface-variant">
              The renter is fully responsible for all traffic fines, tolls, and penalties incurred during the rental period.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
