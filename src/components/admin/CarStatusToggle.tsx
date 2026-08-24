"use client";

import { useState } from "react";
import { updateCarStatus } from "@/app/admin/fleet/actions";
import { useRouter } from "next/navigation";

export default function CarStatusToggle({ carId, currentStatus }: { carId: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleToggle = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    await updateCarStatus(carId, e.target.value);
    router.refresh();
    setLoading(false);
  };

  return (
    <select
      disabled={loading}
      value={currentStatus}
      onChange={handleToggle}
      className={`border text-[11px] font-utility-label uppercase tracking-widest px-2 py-1 rounded-md bg-transparent focus:ring-0 ${
        currentStatus === "Available" ? "border-[#34D399] text-[#059669]" :
        currentStatus === "Rented" ? "border-[#FBBF24] text-[#D97706]" :
        "border-[#F87171] text-[#DC2626]"
      }`}
    >
      <option value="Available">Available</option>
      <option value="Rented">Rented</option>
      <option value="Removed">Removed</option>
    </select>
  );
}
