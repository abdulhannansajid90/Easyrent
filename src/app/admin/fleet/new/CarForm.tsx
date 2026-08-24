"use client";

import { useState } from "react";
import { createCar, updateCar } from "@/app/admin/fleet/actions";
import { useRouter } from "next/navigation";
import { Car } from "@prisma/client";

export default function CarForm({ initialData }: { initialData?: Car }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.delete("images");
    
    files.forEach(file => {
      formData.append("images", file);
    });

    try {
      if (initialData) {
        await updateCar(initialData.id, formData);
      } else {
        await createCar(formData);
      }
      router.push("/admin/fleet");
      router.refresh();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert((err as Error).message || "Failed to save car.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        {/* Basic Info */}
        <div className="flex flex-col gap-md">
          <h3 className="font-utility-label text-[11px] text-primary uppercase tracking-widest border-b border-outline pb-2">Basic Info</h3>
          
          <div className="flex flex-col gap-xs">
            <label className="font-utility-label text-[11px] text-on-surface-variant uppercase">Car Name</label>
            <input required type="text" name="name" defaultValue={initialData?.name} className="border border-outline focus:border-primary rounded-md p-sm bg-surface font-body-md text-primary w-full" placeholder="e.g. Toyota Fortuner" />
          </div>

          <div className="grid grid-cols-2 gap-sm">
            <div className="flex flex-col gap-xs">
              <label className="font-utility-label text-[11px] text-on-surface-variant uppercase">Type</label>
              <select required name="type" defaultValue={initialData?.type} className="border border-outline focus:border-primary rounded-md p-sm bg-surface font-body-md text-primary w-full">
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Van">Van</option>
              </select>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-utility-label text-[11px] text-on-surface-variant uppercase">Transmission</label>
              <select required name="transmission" defaultValue={initialData?.transmission} className="border border-outline focus:border-primary rounded-md p-sm bg-surface font-body-md text-primary w-full">
                <option value="Auto">Auto</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-sm">
            <div className="flex flex-col gap-xs">
              <label className="font-utility-label text-[11px] text-on-surface-variant uppercase">Fuel Type</label>
              <select required name="fuelType" defaultValue={initialData?.fuelType} className="border border-outline focus:border-primary rounded-md p-sm bg-surface font-body-md text-primary w-full">
                <option value="Petrol">Petrol</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Diesel">Diesel</option>
                <option value="EV">EV</option>
              </select>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-utility-label text-[11px] text-on-surface-variant uppercase">License Plate</label>
              <input required type="text" name="licensePlate" defaultValue={initialData?.licensePlate} className="border border-outline focus:border-primary rounded-md p-sm bg-surface font-body-md text-primary w-full" placeholder="LHR-2023" />
            </div>
          </div>
        </div>

        {/* Specs & Pricing */}
        <div className="flex flex-col gap-md">
          <h3 className="font-utility-label text-[11px] text-primary uppercase tracking-widest border-b border-outline pb-2">Specs & Pricing (PKR)</h3>
          
          <div className="grid grid-cols-3 gap-sm">
            <div className="flex flex-col gap-xs">
              <label className="font-utility-label text-[11px] text-on-surface-variant uppercase">Seats</label>
              <input required type="number" name="seatingCapacity" defaultValue={initialData?.seatingCapacity || 4} className="border border-outline focus:border-primary rounded-md p-sm bg-surface font-body-md text-primary w-full" />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-utility-label text-[11px] text-on-surface-variant uppercase">Bags</label>
              <input required type="number" name="baggageCapacity" defaultValue={initialData?.baggageCapacity || 2} className="border border-outline focus:border-primary rounded-md p-sm bg-surface font-body-md text-primary w-full" />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-utility-label text-[11px] text-on-surface-variant uppercase">Mileage</label>
              <input required type="text" name="fuelEfficiency" defaultValue={initialData?.fuelEfficiency} className="border border-outline focus:border-primary rounded-md p-sm bg-surface font-body-md text-primary w-full" placeholder="12 km/l" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-sm mt-2">
            <div className="flex flex-col gap-xs">
              <label className="font-utility-label text-[11px] text-on-surface-variant uppercase">Price / Day</label>
              <input required type="number" name="pricePerDay" defaultValue={initialData?.pricePerDay} className="border border-outline focus:border-primary rounded-md p-sm bg-surface font-utility-data text-primary w-full" placeholder="12500" />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-utility-label text-[11px] text-on-surface-variant uppercase">Price / Week</label>
              <input required type="number" name="pricePerWeek" defaultValue={initialData?.pricePerWeek} className="border border-outline focus:border-primary rounded-md p-sm bg-surface font-utility-data text-primary w-full" placeholder="85000" />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-utility-label text-[11px] text-on-surface-variant uppercase">Price / Month</label>
              <input required type="number" name="pricePerMonth" defaultValue={initialData?.pricePerMonth} className="border border-outline focus:border-primary rounded-md p-sm bg-surface font-utility-data text-primary w-full" placeholder="320000" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-md">
        <h3 className="font-utility-label text-[11px] text-primary uppercase tracking-widest border-b border-outline pb-2">Description & Details</h3>
        
        <div className="flex flex-col gap-xs">
          <label className="font-utility-label text-[11px] text-on-surface-variant uppercase">Description</label>
          <textarea required name="description" defaultValue={initialData?.description} rows={3} className="border border-outline focus:border-primary rounded-md p-sm bg-surface font-body-md text-primary w-full" placeholder="Brief description of the car..."></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
          <div className="flex flex-col gap-xs">
            <label className="font-utility-label text-[11px] text-on-surface-variant uppercase">Inclusions (Comma separated)</label>
            <input required type="text" name="inclusions" defaultValue={initialData?.inclusions || "Insurance, Free Cancelation"} className="border border-outline focus:border-primary rounded-md p-sm bg-surface font-body-md text-primary w-full" placeholder="Free Cancelation, Unlimited Mileage" />
          </div>
          <div className="flex flex-col gap-xs">
            <label className="font-utility-label text-[11px] text-on-surface-variant uppercase">Exclusions (Comma separated)</label>
            <input required type="text" name="exclusions" defaultValue={initialData?.exclusions || "Fuel, Tolls"} className="border border-outline focus:border-primary rounded-md p-sm bg-surface font-body-md text-primary w-full" placeholder="Tolls, Fuel" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-md">
        <h3 className="font-utility-label text-[11px] text-primary uppercase tracking-widest border-b border-outline pb-2">Photos</h3>
        <div className="flex flex-col gap-xs">
          <label className="font-utility-label text-[11px] text-on-surface-variant uppercase">Upload Images (2-3 required)</label>
          <input 
            required={!initialData}
            type="file" 
            multiple 
            accept="image/*" 
            onChange={handleFileChange}
            className="border border-outline focus:border-primary rounded-md p-sm bg-surface font-body-md text-primary w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-surface-variant file:text-primary hover:file:bg-outline/20" 
          />
          {files.length > 0 && (
            <div className="flex gap-sm mt-sm flex-wrap">
              {files.map((f, i) => (
                <div key={i} className="text-[11px] font-utility-label bg-surface-variant px-2 py-1 rounded-md text-on-surface-variant">
                  {f.name}
                </div>
              ))}
            </div>
          )}
          {initialData && files.length === 0 && (
            <div className="text-[11px] text-on-surface-variant mt-2">Leave blank to keep existing images.</div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-md border-t border-outline">
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-on-primary rounded-md py-sm px-xl font-utility-label text-[14px] font-medium shadow-soft hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          {loading ? "Saving Vehicle..." : "Save Vehicle"}
        </button>
      </div>
    </form>
  );
}
