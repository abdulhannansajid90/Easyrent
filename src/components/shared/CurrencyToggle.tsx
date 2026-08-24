"use client";

import { useCurrency } from "@/components/CurrencyProvider";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-[84px] h-8 bg-surface-variant rounded-md"></div>
    );
  }

  return (
    <div className="flex items-center bg-surface-variant p-1 rounded-md">
      <button
        onClick={() => setCurrency("PKR")}
        className={cn(
          "px-2 py-1 font-utility-label text-[11px] rounded transition-all",
          currency === "PKR"
            ? "bg-surface text-primary shadow-soft"
            : "text-on-surface-variant hover:text-primary"
        )}
      >
        PKR
      </button>
      <button
        onClick={() => setCurrency("USD")}
        className={cn(
          "px-2 py-1 font-utility-label text-[11px] rounded transition-all",
          currency === "USD"
            ? "bg-surface text-primary shadow-soft"
            : "text-on-surface-variant hover:text-primary"
        )}
      >
        USD
      </button>
    </div>
  );
}
