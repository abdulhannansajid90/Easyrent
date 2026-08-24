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

export async function getAdminRentals() {
  await checkAuth();
  return prisma.rental.findMany({
    orderBy: { createdAt: "desc" },
    include: { car: true },
  });
}
