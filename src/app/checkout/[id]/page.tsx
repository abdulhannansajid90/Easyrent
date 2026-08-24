import { prisma } from "@/lib/prisma";
import CheckoutClient from "./CheckoutClient";
import { notFound } from "next/navigation";

export default async function CheckoutFlow({ 
  params,
  searchParams 
}: { 
  params: { id: string },
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const car = await prisma.car.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!car) {
    notFound();
  }

  const pickup = typeof searchParams.pickup === 'string' ? searchParams.pickup : "";
  const dropoff = typeof searchParams.dropoff === 'string' ? searchParams.dropoff : "";

  return <CheckoutClient car={car} pickup={pickup} dropoff={dropoff} />;
}
