import { prisma } from "@/lib/prisma";
import FleetClient from "./FleetClient";
import { syncExpiredRentals } from "@/lib/syncRentals";

export const dynamic = "force-dynamic";

export default async function FleetCatalog() {
  await syncExpiredRentals();
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
