"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
}

export async function getDashboardStats() {
  await checkAuth();

  const allCars = await prisma.car.findMany({
    include: { rentals: { where: { status: "Active" } } }
  });
  
  const totalCars = allCars.length;
  const now = new Date();
  
  let availableCars = 0;
  let rentedCars = 0;
  
  allCars.forEach(car => {
    const isRented = car.rentals.some(r => r.status === "Active" && new Date(r.returnDateTime) > now);
    if (isRented) {
      rentedCars++;
    } else {
      availableCars++;
    }
  });

  // Today's revenue
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todaysTransactions = await prisma.walletTransaction.aggregate({
    where: {
      createdAt: {
        gte: today,
      },
    },
    _sum: {
      amountCredited: true,
    },
  });

  // Total wallet balance
  const allTransactions = await prisma.walletTransaction.aggregate({
    _sum: {
      amountCredited: true,
    },
  });

  const recentBookings = await prisma.rental.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    include: { car: true },
  });

  return {
    totalCars,
    availableCars,
    rentedCars,
    todaysRevenue: todaysTransactions._sum.amountCredited || 0,
    walletBalance: allTransactions._sum.amountCredited || 0,
    recentBookings,
  };
}
