import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto w-full px-margin-mobile md:px-margin-desktop py-xl">
        <h1 className="font-display-md text-display-md font-extrabold text-primary uppercase border-b-4 border-primary pb-sm mb-lg">
          Privacy Policy
        </h1>
        <div className="flex flex-col gap-lg">
          <div className="bg-surface border-2 border-primary p-md brutal-shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-primary uppercase mb-sm">1. Information We Collect</h2>
            <p className="font-body-md text-on-surface-variant">
              We collect personal information that you provide directly to us when renting a vehicle, including your name, contact details, driver's license number, CNIC, and payment information. We also collect data regarding your usage of our website and services.
            </p>
          </div>
          <div className="bg-surface border-2 border-primary p-md brutal-shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-primary uppercase mb-sm">2. How We Use Your Information</h2>
            <p className="font-body-md text-on-surface-variant">
              The information we collect is used to process your rentals, verify your identity and driving eligibility, provide customer support, and communicate with you about your reservations and promotional offers.
            </p>
          </div>
          <div className="bg-surface border-2 border-primary p-md brutal-shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-primary uppercase mb-sm">3. Data Sharing and Security</h2>
            <p className="font-body-md text-on-surface-variant">
              We do not sell your personal data. We may share necessary information with our payment processors and insurance partners solely to facilitate your rental. We implement strict security measures to protect your information against unauthorized access.
            </p>
          </div>
          <div className="bg-surface border-2 border-primary p-md brutal-shadow-sm">
            <h2 className="font-headline-sm text-headline-sm text-primary uppercase mb-sm">4. Your Rights</h2>
            <p className="font-body-md text-on-surface-variant">
              You have the right to access, update, or request the deletion of your personal data at any time. For any privacy-related inquiries, please contact our support team.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
