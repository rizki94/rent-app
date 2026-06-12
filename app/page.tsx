import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/components/HeroSection";
import CarListSection from "@/components/CarListSection";
import FeaturesSection from "@/components/FeaturesSection";
import WhyUsSection from "@/components/WhyUsSection";
import FAQSection from "@/components/FAQSection";

import { db } from "@/lib/db";
import { cars as carsTable, testimonials as testimonialsTable, webConfig as webConfigTable } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Query db for landing page content
  const cars = await db.select().from(carsTable);
  const testimonials = await db.select().from(testimonialsTable);
  const configList = await db.select().from(webConfigTable);
  const config = configList[0] || null;

  return (
    <>
      <Header phone={config?.phone} />
      <main>
        <HeroSection phone={config?.phone} />
        <CarListSection initialCars={cars} phone={config?.phone} />
        <FeaturesSection />
        <WhyUsSection initialTestimonials={testimonials} />
        <FAQSection />
      </main>
      <Footer config={config} />
      <WhatsAppButton phone={config?.phone} />
    </>
  );
}
