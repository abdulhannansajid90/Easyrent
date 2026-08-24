"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createRentalAction(data: {
  carId: string;
  customerName: string;
  customerCNIC: string;
  customerAge: number;
  customerPhone: string;
  pickupDateTime: Date;
  returnDateTime: Date;
  durationHours: number;
  totalAmount: number;
}) {
  try {
    const rental = await prisma.rental.create({
      data: {
        carId: data.carId,
        customerName: data.customerName,
        customerCNIC: data.customerCNIC,
        customerAge: data.customerAge,
        customerPhone: data.customerPhone,
        pickupDateTime: data.pickupDateTime,
        returnDateTime: data.returnDateTime,
        durationHours: data.durationHours,
        totalAmount: data.totalAmount,
        pickupCity: "Metropolis", // Default for now
        tripType: "Intra-city", // Default
        service: "SelfDrive", // Default
        status: "Active",
        companyId: "ER-" + Math.floor(Math.random() * 10000),
      },
    });

    // Update car status
    await prisma.car.update({
      where: { id: data.carId },
      data: {
        status: "Rented",
        currentRentalId: rental.id,
      },
    });

    revalidatePath("/fleet");
    revalidatePath("/admin/rentals");

    return { success: true, rentalId: rental.id };
  } catch (error) {
    console.error("Failed to create rental:", error);
    return { success: false, error: "Failed to create rental" };
  }
}
