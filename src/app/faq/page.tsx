import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto w-full px-margin-mobile md:px-margin-desktop py-xl">
        <h1 className="font-display-md text-display-md font-extrabold text-primary uppercase border-b-4 border-primary pb-sm mb-lg">
          Frequently Asked Questions
        </h1>
        <div className="flex flex-col gap-lg">
          <div className="bg-surface border-2 border-primary p-md brutal-shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-primary uppercase mb-sm">What do I need to rent a car?</h2>
            <p className="font-body-md text-on-surface-variant">
              You must be at least 21 years old and provide a valid Driver's License and a CNIC or equivalent ID.
            </p>
          </div>
          <div className="bg-surface border-2 border-primary p-md brutal-shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-primary uppercase mb-sm">Do I need a credit card?</h2>
            <p className="font-body-md text-on-surface-variant">
              No credit card is required to reserve. You can pay via multiple methods upon pickup.
            </p>
          </div>
          <div className="bg-surface border-2 border-primary p-md brutal-shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-primary uppercase mb-sm">What happens if I'm late?</h2>
            <p className="font-body-md text-on-surface-variant">
              A grace period of 1 hour is given. After that, a late fee is applied per hour until 4 hours, after which an extra day is charged.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
