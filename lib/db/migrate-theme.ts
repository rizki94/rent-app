import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config({ path: join(__dirname, "../../.env") });

async function migrate() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("DATABASE_URL not found in .env");
    process.exit(1);
  }

  const sql = neon(connectionString);

  try {
    console.log("Adding 'theme' column to web_config table...");
    await sql`
      ALTER TABLE web_config
      ADD COLUMN IF NOT EXISTS theme text DEFAULT 'navy_gold'
    `;
    console.log("✅ Migration complete — 'theme' column added successfully.");
  } catch (err: any) {
    console.error("❌ Migration failed:", err.message);
    process.exit(1);
  }
}

migrate();
