import CarForm from "./CarForm";

export default function NewCarPage() {
  return (
    <div className="flex flex-col gap-lg max-w-4xl mx-auto">
      <div className="border-b border-outline pb-sm">
        <h2 className="font-display-md text-[24px] font-medium text-primary tracking-tight">
          Add New Vehicle
        </h2>
        <p className="font-utility-label text-[12px] text-on-surface-variant uppercase tracking-widest mt-1">
          Register a new car to the fleet
        </p>
      </div>

      <div className="bg-surface border border-outline shadow-card rounded-xl p-lg md:p-xl">
        <CarForm />
      </div>
    </div>
  );
}
