"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

async function checkAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized");
  }
}

export async function getAdminCars() {
  await checkAuth();
  return prisma.car.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function updateCarStatus(carId: string, status: string) {
  await checkAuth();
  await prisma.car.update({
    where: { id: carId },
    data: { status },
  });

  if (status === "Available") {
    // Also cancel/complete any active rentals so the dynamic calculation allows it to be available
    await prisma.rental.updateMany({
      where: { carId, status: "Active" },
      data: { status: "Completed" },
    });
  }
}

import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function deleteCar(carId: string) {
  await checkAuth();
  
  // Find all rentals associated with this car
  const rentals = await prisma.rental.findMany({ where: { carId } });
  const rentalIds = rentals.map(r => r.id);
  
  // Delete wallet transactions for those rentals
  await prisma.walletTransaction.deleteMany({ where: { rentalId: { in: rentalIds } } });
  
  // Delete rentals
  await prisma.rental.deleteMany({ where: { carId } });
  
  // Finally, delete the car
  await prisma.car.delete({ where: { id: carId } });
}

async function saveFilesLocally(files: File[]): Promise<string[]> {
  const imageUrls: string[] = [];
  const uploadDir = path.join(process.cwd(), 'public/uploads');
  await mkdir(uploadDir, { recursive: true });

  for (const file of files) {
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      await writeFile(path.join(uploadDir, filename), buffer);
      imageUrls.push(`/uploads/${filename}`);
    }
  }
  return imageUrls;
}

export async function createCar(formData: FormData) {
  await checkAuth();

  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const transmission = formData.get("transmission") as string;
  const fuelType = formData.get("fuelType") as string;
  const seatingCapacity = parseInt(formData.get("seatingCapacity") as string, 10);
  const baggageCapacity = parseInt(formData.get("baggageCapacity") as string, 10);
  const fuelEfficiency = formData.get("fuelEfficiency") as string;
  const licensePlate = formData.get("licensePlate") as string;
  const pricePerDay = parseFloat(formData.get("pricePerDay") as string);
  const pricePerWeek = parseFloat(formData.get("pricePerWeek") as string);
  const pricePerMonth = parseFloat(formData.get("pricePerMonth") as string);
  const description = formData.get("description") as string;

  const inclusions = (formData.get("inclusions") as string).split(",").map(s => s.trim()).filter(Boolean);
  const exclusions = (formData.get("exclusions") as string).split(",").map(s => s.trim()).filter(Boolean);

  const imageFiles = formData.getAll("images") as File[];
  const imageUrls = await saveFilesLocally(imageFiles);

  if (imageUrls.length === 0) {
    throw new Error("Images are strictly required for a new vehicle.");
  }

  const newCar = await prisma.car.create({
    data: {
      name, type, transmission, fuelType, seatingCapacity, baggageCapacity, fuelEfficiency, licensePlate,
      pricePerDay, pricePerWeek, pricePerMonth, description,
      inclusions: inclusions.join(","),
      exclusions: exclusions.join(","),
      images: imageUrls.join(","),
      status: "Available",
    },
  });

  return newCar;
}

export async function updateCar(id: string, formData: FormData) {
  await checkAuth();

  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const transmission = formData.get("transmission") as string;
  const fuelType = formData.get("fuelType") as string;
  const seatingCapacity = parseInt(formData.get("seatingCapacity") as string, 10);
  const baggageCapacity = parseInt(formData.get("baggageCapacity") as string, 10);
  const fuelEfficiency = formData.get("fuelEfficiency") as string;
  const licensePlate = formData.get("licensePlate") as string;
  const pricePerDay = parseFloat(formData.get("pricePerDay") as string);
  const pricePerWeek = parseFloat(formData.get("pricePerWeek") as string);
  const pricePerMonth = parseFloat(formData.get("pricePerMonth") as string);
  const description = formData.get("description") as string;

  const inclusions = (formData.get("inclusions") as string).split(",").map(s => s.trim()).filter(Boolean);
  const exclusions = (formData.get("exclusions") as string).split(",").map(s => s.trim()).filter(Boolean);

  const imageFiles = formData.getAll("images") as File[];
  const imageUrls = await saveFilesLocally(imageFiles);

  const updateData: any = {
    name, type, transmission, fuelType, seatingCapacity, baggageCapacity, fuelEfficiency, licensePlate,
    pricePerDay, pricePerWeek, pricePerMonth, description,
    inclusions: inclusions.join(","),
    exclusions: exclusions.join(","),
  };

  if (imageUrls.length > 0) {
    updateData.images = imageUrls.join(",");
  }

  const updatedCar = await prisma.car.update({
    where: { id },
    data: updateData,
  });

  return updatedCar;
}
