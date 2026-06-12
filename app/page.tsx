import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import HeroSection from "@/components/HeroSection";
import CarListSection from "@/components/CarListSection";
import FeaturesSection from "@/components/FeaturesSection";
import WhyUsSection from "@/components/WhyUsSection";
import FAQSection from "@/components/FAQSection";

import { db } from "@/lib/db";
import {
  cars as carsTable,
  testimonials as testimonialsTable,
  webConfig as webConfigTable,
} from "@/lib/db/schema";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Query db for landing page content
  const cars = await db.select().from(carsTable);
  const testimonials = await db.select().from(testimonialsTable);
  const configList = await db.select().from(webConfigTable);
  const config = configList[0] || null;

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "CarRental",
    name: "Adhitama89 Rental Mobil Bandung",
    image: "https://www.adhitama89rental.com/logo.svg",
    "@id": "https://www.adhitama89rental.com",
    url: "https://www.adhitama89rental.com",
    telephone: config?.phone || "628112111318",
    priceRange: "Rp 250.000 - Rp 1.200.000",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        config?.address ||
        "Jl. Turangga Barat Baru No.4, Lkr. Sel., Kec. Lengkong",
      addressLocality: "Bandung",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
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
