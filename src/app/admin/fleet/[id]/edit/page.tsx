import { PrismaClient } from "@prisma/client";
import CarForm from "../../new/CarForm";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export default async function EditCarPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }

  const car = await prisma.car.findUnique({
    where: { id: params.id },
  });

  if (!car) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-lg max-w-4xl mx-auto">
      <div className="border-b border-outline pb-sm">
        <h2 className="font-display-md text-[24px] font-medium text-primary tracking-tight">
          Edit Vehicle
        </h2>
        <p className="font-utility-label text-[12px] text-on-surface-variant uppercase tracking-widest mt-1">
          Update details for {car.name}
        </p>
      </div>

      <div className="bg-surface border border-outline shadow-card rounded-xl p-lg md:p-xl">
        <CarForm initialData={car} />
      </div>
    </div>
  );
}
