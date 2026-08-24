"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Currency } from "@/lib/currency";

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({
  children,
  storageKey = "easy-rent-currency",
}: {
  children: React.ReactNode;
  storageKey?: string;
}) {
  const [currency, setCurrencyState] = useState<Currency>("PKR");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(storageKey) as Currency;
    if (stored === "PKR" || stored === "USD") {
      setCurrencyState(stored);
    }
  }, [storageKey]);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem(storageKey, newCurrency);
  };

  // Prevent hydration mismatch by returning null until mounted, or just return children.
  // Since we might render formatted prices on the server, we should ideally not hide children.
  // We'll let it hydrate as PKR, then swap to USD if needed. (This might cause a slight flash, 
  // but it's safe for hydration. A more robust way is what next-themes does).
  // We'll return children and suppress hydration warning in layout.

  return (
    <CurrencyContext.Provider value={{ currency: mounted ? currency : "PKR", setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
