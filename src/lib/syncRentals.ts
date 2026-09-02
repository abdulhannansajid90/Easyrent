import { prisma } from "@/lib/prisma";

export async function syncExpiredRentals() {
  const now = new Date();
  
  const expiredRentals = await prisma.rental.findMany({
    where: {
      status: "Active",
      returnDateTime: { lt: now }
    }
  });

  if (expiredRentals.length > 0) {
    const expiredIds = expiredRentals.map(r => r.id);
    const carIds = expiredRentals.map(r => r.carId);

    await prisma.$transaction([
      prisma.rental.updateMany({
        where: { id: { in: expiredIds } },
        data: { status: "Completed" }
      }),
      prisma.car.updateMany({
        where: { id: { in: carIds } },
        data: { status: "Available", currentRentalId: null }
      })
    ]);
  }
}
