import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminUsername = 'admin';
  const adminPassword = 'EasyRent2026!';

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { username: adminUsername },
  });

  if (existingAdmin) {
    console.log(`Admin user "${adminUsername}" already exists. Skipping.`);
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.create({
    data: {
      username: adminUsername,
      passwordHash,
    },
  });

  console.log(`Admin user "${adminUsername}" created successfully.`);
  console.log(`Please change your password immediately after logging in.`);

  // Seed Cars
  await prisma.car.create({
    data: {
      name: "Atlas Prime",
      type: "SUV",
      transmission: "Auto",
      fuelType: "Petrol",
      seatingCapacity: 5,
      baggageCapacity: 3,
      fuelEfficiency: "14km/L",
      licensePlate: "ABC-1234",
      pricePerDay: 23800,
      pricePerWeek: 150000,
      pricePerMonth: 600000,
      images: "https://lh3.googleusercontent.com/aida-public/AB6AXuDiTRH3STRR42Gyu6tFMkda565rn5h2uZpKGWm2R-RgBKu0vFaHm_MLDL6paEtoEFTeuHmVecWOYKxa37zs35fFP4xOMMOugv5XFOpPRM9UIdeYBQWtTUnM-5kfSJCTvASXIKrupO1tinbpoYk0nJPv3tOuQ9RWYXfHe_Q8Dc8UjPyCc1tz0HRpifX7LP28XSE_PI68xbboYie2UcmCSnHcAgnwrIQtyaPXqGOOrG8uOAM_nI5jL2Cg",
      inclusions: "Full Comprehensive Insurance,24/7 Roadside Assistance,Unlimited Mileage",
      exclusions: "Fuel (Return as received),Toll Charges & Traffic Fines,Additional Driver Fee",
      description: "A premium SUV.",
      status: "Available"
    }
  });

  await prisma.car.create({
    data: {
      name: "Aero E-1",
      type: "Sedan",
      transmission: "Auto",
      fuelType: "EV",
      seatingCapacity: 5,
      baggageCapacity: 2,
      fuelEfficiency: "300mi",
      licensePlate: "EV-9999",
      pricePerDay: 16800,
      pricePerWeek: 100000,
      pricePerMonth: 400000,
      images: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkIKeigLEH5l1QOJNQc-otjXDj7aJyFcrO7Nyu6XrnB0vGbZ8Mz51VjaGWilWAkV_9so1L-In_ou2AaMWNdQAm-JmbVqPWhkhuS1XDwiwd_ctFDcCo3l8TJHszGQA65Qh4n2H_XgGG3kjg4AaO8SiDUFHImaMpOivZfPhePJhft7UY-O3WgrsHTW8PCIn6ptz48vF1fSX6vwUUQLqEG1fd7jpwEF0LmZqwl0DjDrgjfvBxMMx8rcg0",
      inclusions: "Full Comprehensive Insurance,24/7 Roadside Assistance,Unlimited Mileage",
      exclusions: "Fuel (Return as received),Toll Charges & Traffic Fines,Additional Driver Fee",
      description: "An electric sedan.",
      status: "Available"
    }
  });
  console.log("Seeded Cars");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
