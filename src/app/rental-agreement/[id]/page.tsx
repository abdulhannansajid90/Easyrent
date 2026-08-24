import { prisma } from "@/lib/prisma";
import RentalAgreementClient from "./RentalAgreementClient";
import { notFound } from "next/navigation";

export default async function RentalAgreement({ params }: { params: { id: string } }) {
  const rental = await prisma.rental.findUnique({
    where: {
      id: params.id,
    },
    include: {
      car: true,
    },
  });

  if (!rental) {
    notFound();
  }

  return <RentalAgreementClient rental={rental} />;
}
