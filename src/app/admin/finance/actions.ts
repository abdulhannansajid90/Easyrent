"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const prisma = new PrismaClient();

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
}

export async function getAdminFinance() {
  await checkAuth();

  const allTransactions = await prisma.walletTransaction.aggregate({
    _sum: {
      amountCredited: true,
    },
  });

  const transactions = await prisma.walletTransaction.findMany({
    orderBy: { createdAt: "desc" },
    include: { rental: { include: { car: true } } },
  });

  // Calculate simple daily revenue for the chart (last 7 days)
  const chartData = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - i);
    
    const nextD = new Date(d);
    nextD.setDate(d.getDate() + 1);

    const dailySum = await prisma.walletTransaction.aggregate({
      where: {
        createdAt: {
          gte: d,
          lt: nextD,
        },
      },
      _sum: {
        amountCredited: true,
      },
    });

    chartData.push({
      date: d.toLocaleDateString("en-US", { weekday: "short" }),
      amount: dailySum._sum.amountCredited || 0,
    });
  }

  return {
    walletBalance: allTransactions._sum.amountCredited || 0,
    transactions,
    chartData,
  };
}
