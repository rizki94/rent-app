import { config } from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, "../../.env") });

import bcrypt from "bcryptjs";

async function main() {
  console.log("Seeding database...");

  // Dynamically import db/index and schema after dotenv config runs
  const { db, users, cars, webConfig, testimonials } = await import("./index");

  // 1. Seed Admin User
  const adminPassword = await bcrypt.hash("admin89", 10);
  const existingUsers = await db.select().from(users);
  if (existingUsers.length === 0) {
    await db.insert(users).values({
      name: "Admin Adhitama89",
      username: "admin",
      password: adminPassword,
      role: "admin",
    });
    console.log("Admin user seeded.");
  } else {
    console.log("Admin user already exists.");
  }

  // 2. Seed Web Config
  const existingConfig = await db.select().from(webConfig);
  if (existingConfig.length === 0) {
    await db.insert(webConfig).values({
      phone: "6281234567890",
      address: "Jl. Soekarno-Hatta No. 89, Bandung",
      tiktokAccount: "@adhitama89",
      instagramAccount: "@adhitama89",
      mapPinPoint: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.558806684784!2d107.6622432!3d-6.943187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e7c1b2c4554b%3A0xe54e6fa3a992a9f2!2sBandung%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1718058216822!5m2!1sen!2sid",
    });
    console.log("Web config seeded.");
  } else {
    console.log("Web config already exists.");
  }

  // 3. Seed Cars
  const existingCars = await db.select().from(cars);
  if (existingCars.length === 0) {
    await db.insert(cars).values([
      {
        name: "Toyota Alphard",
        price: "1.200.000",
        qty: 5,
        pricePer: "day",
        image: "/car_sedan.png",
      },
      {
        name: "Toyota Fortuner",
        price: "950.000",
        qty: 4,
        pricePer: "day",
        image: "/car_suv.png",
      },
      {
        name: "Toyota Innova Zenix",
        price: "250.000 - 375.000",
        qty: 8,
        pricePer: "day",
        image: "/car_mpv.png",
      },
    ]);
    console.log("Cars seeded.");
  } else {
    console.log("Cars already exist.");
  }

  // 4. Seed Testimonials
  const existingTestimonials = await db.select().from(testimonials);
  if (existingTestimonials.length === 0) {
    await db.insert(testimonials).values([
      {
        name: "Andi",
        stars: 5,
        comment: "Pelayanannya cepat dan responsif. Mobil yang datang bersih, nyaman, dan sesuai dengan foto. Proses booking juga mudah. Recommended!",
      },
      {
        name: "Rina",
        stars: 5,
        comment: "Sewa Avanza untuk perjalanan keluarga ke Garut. Kondisi mobil sangat baik dan tidak ada kendala selama perjalanan. Pasti akan menggunakan jasa rental ini lagi.",
      },
      {
        name: "Dedi",
        stars: 5,
        comment: "Sudah beberapa kali rental di sini dan selalu puas. Harga sesuai, unit bersih, dan admin cepat merespon.",
      },
      {
        name: "Sari",
        stars: 5,
        comment: "Sangat puas dengan pelayanan Adhitama89! Mobil tepat waktu, kondisi prima, dan harga sangat terjangkau. Sudah rekomendasikan ke teman-teman.",
      },
      {
        name: "Budi",
        stars: 5,
        comment: "Booking lewat WA sangat mudah. Armada bersih terawat. Pas banget untuk perjalanan bisnis ke luar kota. Terima kasih Adhitama89!",
      },
    ]);
    console.log("Testimonials seeded.");
  } else {
    console.log("Testimonials already exist.");
  }

  console.log("Seeding completed successfully!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
