import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("admin").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const cars = pgTable("cars", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: text("price").notNull(), // Rental price range or value, e.g., "250000 - 375000"
  qty: integer("qty").notNull(), // Stock / available quantity
  pricePer: text("price_per").default("day").notNull(), // day, month, year
  image: text("image").notNull(), // URL from vercel blob
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const webConfig = pgTable("web_config", {
  id: serial("id").primaryKey(),
  address: text("address"),
  phone: text("phone"),
  tiktokAccount: text("tiktok_account"),
  instagramAccount: text("instagram_account"),
  mapPinPoint: text("map_pin_point"),
  theme: text("theme").default("navy_gold"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  stars: integer("stars").notNull(), // 1 to 5 stars
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
