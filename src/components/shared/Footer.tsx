import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background text-on-surface-variant py-2xl px-margin-mobile md:px-margin-desktop mt-auto border-t border-outline">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-xl">
        <div className="flex flex-col gap-md">
          <div className="font-display-md text-display-md text-primary tracking-tight">
            Easy Rent.
          </div>
          <p className="font-body-md opacity-80">
            Utilitarian vehicles for the uncompromising journey. Rent the road.
          </p>
        </div>
        <div className="flex flex-col gap-sm">
          <div className="font-utility-label text-utility-label tracking-widest uppercase mb-sm text-primary">
            Fleet
          </div>
          <Link href="/fleet?type=sedan" className="hover:text-primary transition-colors">Sedans</Link>
          <Link href="/fleet?type=suv" className="hover:text-primary transition-colors">SUVs</Link>
          <Link href="/fleet?type=hatchback" className="hover:text-primary transition-colors">Hatchbacks</Link>
          <Link href="/fleet?type=van" className="hover:text-primary transition-colors">Vans</Link>
        </div>
        <div className="flex flex-col gap-sm">
          <div className="font-utility-label text-utility-label tracking-widest uppercase mb-sm text-primary">
            Company
          </div>
          <Link href="/#about" className="hover:text-primary transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
          <Link href="/admin" className="hover:text-primary transition-colors">Admin Panel</Link>
        </div>
        <div className="flex flex-col gap-sm">
          <div className="font-utility-label text-utility-label tracking-widest uppercase mb-sm text-primary">
            Legal
          </div>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/rental-agreement" className="hover:text-primary transition-colors">Sample Agreement</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-xl pt-xl border-t border-outline text-center font-utility-label text-[12px] opacity-70">
        &copy; {new Date().getFullYear()} Easy Rent. All rights reserved.
      </div>
    </footer>
  );
}
