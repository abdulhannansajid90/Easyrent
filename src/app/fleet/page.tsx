import { prisma } from "@/lib/prisma";
import FleetClient from "./FleetClient";

export const dynamic = "force-dynamic";

export default async function FleetCatalog() {
  const cars = await prisma.car.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      rentals: {
        where: {
          status: "Active"
        }
      }
    }
  });

  return <FleetClient initialCars={cars} />;
}
