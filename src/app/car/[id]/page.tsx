import { prisma } from "@/lib/prisma";
import CarDetailClient from "./CarDetailClient";
import { notFound } from "next/navigation";

export default async function CarDetail({ params }: { params: { id: string } }) {
  const car = await prisma.car.findUnique({
    where: {
      id: params.id,
    },
    include: {
      rentals: {
        where: {
          status: "Active"
        }
      }
    }
  });

  if (!car) {
    notFound();
  }

  return <CarDetailClient car={car} />;
}
