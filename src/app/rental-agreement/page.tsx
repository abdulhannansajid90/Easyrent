import RentalAgreementClient from "./[id]/RentalAgreementClient";

export default function SampleAgreementPage() {
  const dummyRental: any = {
    id: "sample-agreement-id",
    companyId: "EASY-RENT-SAMPLE",
    createdAt: new Date(),
    pickupDateTime: new Date(new Date().setHours(10, 0, 0, 0)),
    returnDateTime: new Date(new Date().setHours(10, 0, 0, 0) + 3 * 24 * 60 * 60 * 1000), // 3 days later
    durationHours: 72,
    totalAmount: 15000,
    customerName: "John Doe",
    customerCNIC: "12345-6789012-3",
    customerAge: 35,
    customerPhone: "+1 (555) 0123-456",
    carId: "sample-car",
    car: {
      id: "sample-car",
      name: "Atlas Prime (Sample)",
      type: "SUV",
      licensePlate: "SAM-123",
      pricePerDay: 5000,
    },
  };

  return <RentalAgreementClient rental={dummyRental} />;
}
