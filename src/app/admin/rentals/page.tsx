import { getAdminRentals } from "./actions";
import { formatPrice } from "@/lib/currency";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";

export default async function AdminRentals() {
  const rentals = await getAdminRentals();

  return (
    <div className="flex flex-col gap-lg">
      <div className="border-b border-outline pb-sm">
        <h2 className="font-display-md text-[24px] font-medium text-primary tracking-tight">
          Rental Agreements
        </h2>
        <p className="font-utility-label text-[12px] text-on-surface-variant uppercase tracking-widest mt-1">
          Active & Historical Bookings
        </p>
      </div>

      <div className="bg-surface border border-outline shadow-soft rounded-xl overflow-hidden">
        {rentals.length === 0 ? (
          <div className="p-xl text-center text-on-surface-variant font-utility-label text-[13px]">
            No rentals found in the system.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-surface-variant text-on-surface-variant border-b border-outline">
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Customer</th>
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Vehicle</th>
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Pickup & Return</th>
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Amount</th>
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium">Status</th>
                  <th className="p-md font-utility-label text-[11px] uppercase tracking-widest font-medium text-right">Agreement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline">
                {rentals.map((rental) => (
                  <tr key={rental.id} className="hover:bg-surface-variant/50 transition-colors">
                    <td className="p-md">
                      <div className="font-medium text-[14px] text-primary">{rental.customerName}</div>
                      <div className="text-[12px] text-on-surface-variant">CNIC: {rental.customerCNIC}</div>
                    </td>
                    <td className="p-md text-[14px] text-primary">
                      {rental.car.name}
                    </td>
                    <td className="p-md">
                      <div className="text-[13px] text-primary">
                        {new Date(rental.pickupDateTime).toLocaleDateString()} &rarr; {new Date(rental.returnDateTime).toLocaleDateString()}
                      </div>
                      <div className="text-[11px] text-on-surface-variant">
                        {rental.durationHours} hours
                      </div>
                    </td>
                    <td className="p-md font-utility-data text-[14px] text-primary">
                      {formatPrice(rental.totalAmount, "PKR")}
                    </td>
                    <td className="p-md">
                      <span className={`px-2 py-1 rounded font-utility-label text-[10px] uppercase ${
                        rental.status === "Completed" ? "bg-[#ECFDF5] text-[#065F46] dark:bg-[#022C22] dark:text-[#34D399]" :
                        rental.status === "Active" ? "bg-[#EFF6FF] text-[#1E40AF] dark:bg-[#1E3A8A] dark:text-[#60A5FA]" :
                        "bg-[#FEF2F2] text-[#991B1B] dark:bg-[#7F1D1D] dark:text-[#F87171]"
                      }`}>
                        {rental.status}
                      </span>
                    </td>
                    <td className="p-md text-right">
                      {rental.agreementPdfUrl ? (
                        <a
                          href={rental.agreementPdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center p-2 rounded-md border border-outline text-primary hover:bg-surface-variant transition-colors"
                          title="Download PDF"
                        >
                          <DocumentArrowDownIcon className="w-5 h-5" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-on-surface-variant italic">No PDF</span>
                      )}
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
