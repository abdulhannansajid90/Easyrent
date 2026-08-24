/* eslint-disable react/no-unescaped-entities */
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow max-w-4xl mx-auto w-full px-margin-mobile md:px-margin-desktop py-xl">
        <h1 className="font-display-md text-display-md font-extrabold text-primary uppercase border-b-4 border-primary pb-sm mb-lg">
          Contact Us
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
          <div className="flex flex-col gap-md">
            <h2 className="font-headline-sm text-headline-sm text-primary uppercase">Get in Touch</h2>
            <p className="font-body-md text-on-surface-variant">
              Have a question or need assistance? We're here to help. Reach out to our team using the contact details below.
            </p>
            
            <div className="flex items-center gap-sm mt-sm">
              <PhoneIcon className="w-6 h-6 text-primary" />
              <div>
                <p className="font-utility-label text-utility-label text-on-surface-variant uppercase text-xs">Phone</p>
                <a href="tel:+18001234567" className="font-body-md text-primary font-medium hover:underline">+1 (800) 123-4567</a>
              </div>
            </div>

            <div className="flex items-center gap-sm mt-sm">
              <EnvelopeIcon className="w-6 h-6 text-primary" />
              <div>
                <p className="font-utility-label text-utility-label text-on-surface-variant uppercase text-xs">Email</p>
                <a href="mailto:support@easyrent.com" className="font-body-md text-primary font-medium hover:underline">support@easyrent.com</a>
              </div>
            </div>

            <div className="flex items-center gap-sm mt-sm">
              <MapPinIcon className="w-6 h-6 text-primary" />
              <div>
                <p className="font-utility-label text-utility-label text-on-surface-variant uppercase text-xs">Office</p>
                <p className="font-body-md text-primary font-medium">123 Mobility Way, Metropolis Center</p>
              </div>
            </div>
          </div>

          <div className="bg-surface border-2 border-primary p-md brutal-shadow-sm">
            <form className="flex flex-col gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-utility-label text-[11px] uppercase tracking-wider text-on-surface-variant">Name</label>
                <input type="text" className="border-2 border-primary p-sm font-body-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Your Name" required />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-utility-label text-[11px] uppercase tracking-wider text-on-surface-variant">Email</label>
                <input type="email" className="border-2 border-primary p-sm font-body-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="your@email.com" required />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-utility-label text-[11px] uppercase tracking-wider text-on-surface-variant">Message</label>
                <textarea rows={4} className="border-2 border-primary p-sm font-body-md focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className="bg-primary text-on-primary font-utility-label text-utility-label p-sm uppercase hover:bg-primary/90 transition-colors mt-sm brutal-shadow-sm active:translate-y-1 active:shadow-none">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
