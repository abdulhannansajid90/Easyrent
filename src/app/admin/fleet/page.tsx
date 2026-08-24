import { getAdminCars } from "./actions";
import { formatPrice } from "@/lib/currency";
import Link from "next/link";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/outline";
import CarStatusToggle from "@/components/admin/CarStatusToggle";
import DeleteCarButton from "@/components/admin/DeleteCarButton";

export default async function AdminFleet() {
  const cars = await getAdminCars();

  return (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md border-b border-outline pb-sm">
        <div>
          <h2 className="font-display-md text-[24px] font-medium text-primary tracking-tight">
            Fleet Management
          </h2>
          <p className="font-utility-label text-[12px] text-on-surface-variant uppercase tracking-widest mt-1">
            Manage Vehicles & Status
          </p>
        </div>
        <Link
          href="/admin/fleet/new"
          className="bg-primary text-on-primary rounded-md py-sm px-md font-utility-label text-[13px] font-medium shadow-soft hover:bg-primary/90 transition-all flex items-center justify-center gap-sm shrink-0"
        >
          <PlusIcon className="w-4 h-4" />
          Add Vehicle
        </Link>
      </div>

      <div className="bg-surface border border-outline shadow-soft rounded-xl overflow-hidden">
        {cars.length === 0 ? (
          <div className="p-xl text-center text-on-surface-variant font-utility-label text-[13px]">
            No vehicles in the fleet. Click &quot;Add Vehicle&quot; to register one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-surface-variant text-on-surface-variant border-b border-outline">
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium w-16">Photo</th>
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Vehicle</th>
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">License Plate</th>
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Pricing</th>
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Status</th>
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline">
                {cars.map((car) => (
                  <tr key={car.id} className="hover:bg-surface-variant/50 transition-colors">
                    <td className="p-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={car.images[0]} alt={car.name} className="w-12 h-12 object-cover rounded-md bg-surface-variant border border-outline" />
                    </td>
                    <td className="p-md">
                      <div className="font-medium text-[14px] text-primary">{car.name}</div>
                      <div className="text-[12px] text-on-surface-variant">{car.type} • {car.transmission}</div>
                    </td>
                    <td className="p-md">
                      <div className="font-utility-data text-[13px] text-primary bg-surface-variant px-2 py-1 rounded-sm border border-outline inline-block">
                        {car.licensePlate}
                      </div>
                    </td>
                    <td className="p-md font-utility-data text-[13px] text-primary">
                      {formatPrice(car.pricePerDay, "PKR")}/day
                    </td>
                    <td className="p-md">
                      <CarStatusToggle carId={car.id} currentStatus={car.status} />
                    </td>
                    <td className="p-md flex items-center gap-2">
                      <Link 
                        href={`/admin/fleet/${car.id}/edit`}
                        className="text-primary hover:text-primary/80 p-1 rounded hover:bg-surface-variant transition-colors"
                        title="Edit Vehicle"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </Link>
                      <DeleteCarButton carId={car.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
