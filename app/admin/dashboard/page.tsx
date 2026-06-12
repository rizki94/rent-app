import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { cars as carsTable, testimonials as testimonialsTable, webConfig as webConfigTable } from "@/lib/db/schema";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch all dashboard data from DB
  const cars = await db.select().from(carsTable);
  const testimonials = await db.select().from(testimonialsTable);
  const configList = await db.select().from(webConfigTable);
  const config = configList[0] || null;

  return (
    <DashboardClient
      session={session}
      initialCars={cars}
      initialTestimonials={testimonials}
      initialConfig={config}
    />
  );
}
