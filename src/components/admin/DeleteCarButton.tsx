"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCar } from "@/app/admin/fleet/actions";
import { TrashIcon } from "@heroicons/react/24/outline";

export default function DeleteCarButton({ carId }: { carId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this vehicle? This action cannot be undone.")) return;

    setLoading(true);
    try {
      await deleteCar(carId);
      router.refresh();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to delete car.");
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950 transition-colors disabled:opacity-50"
      title="Delete Vehicle"
    >
      <TrashIcon className="w-4 h-4" />
    </button>
  );
}
