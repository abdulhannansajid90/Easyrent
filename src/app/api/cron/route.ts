import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Example cron logic: Check for overdue rentals, update statuses
  console.log("Cron job executed: Updating rental statuses...");
  
  // prisma.rental.updateMany({ ... })

  return NextResponse.json({ success: true, message: "Cron job executed successfully" });
}
