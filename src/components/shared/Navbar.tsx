"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon, SunIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import CurrencyToggle from "./CurrencyToggle";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-surface/80 backdrop-blur-md text-primary border-b border-outline flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-md sticky top-0 z-50 transition-colors duration-300">
      <Link
        href="/"
        className="font-display-md text-display-md tracking-tight text-primary hover:opacity-80 transition-opacity"
      >
        Easy Rent.
      </Link>
      <div className="hidden md:flex gap-lg items-center font-utility-label text-utility-label">
        <Link
          href="/fleet"
          className="text-on-surface-variant hover:text-primary transition-colors"
        >
          Fleet
        </Link>
        <Link
          href="/#how-it-works"
          className="text-on-surface-variant hover:text-primary transition-colors"
        >
          How it Works
        </Link>
        <Link
          href="/faq"
          className="text-on-surface-variant hover:text-primary transition-colors"
        >
          FAQ
        </Link>
        <Link
          href="/contact"
          className="text-on-surface-variant hover:text-primary transition-colors"
        >
          Contact
        </Link>
      </div>
      <div className="flex gap-md items-center font-utility-label text-utility-label">
        <CurrencyToggle />
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-md text-on-surface-variant hover:bg-surface-variant hover:text-primary transition-all"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? (
              <SunIcon className="w-4 h-4" />
            ) : (
              <MoonIcon className="w-4 h-4" />
            )}
          </button>
        )}
        <a href="tel:+18001234567" className="hidden md:flex items-center gap-xs px-md py-sm rounded-md bg-primary text-on-primary hover:bg-primary/90 transition-all shadow-soft text-[13px] font-medium">
          <PhoneIcon className="w-4 h-4" /> Support
        </a>
      </div>
    </nav>
  );
}
