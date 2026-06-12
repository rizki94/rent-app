import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/rent_app";

declare global {
  var postgresClient: postgres.Sql | undefined;
}

let client: postgres.Sql;

if (process.env.NODE_ENV === "production") {
  client = postgres(connectionString);
} else {
  if (!global.postgresClient) {
    global.postgresClient = postgres(connectionString);
  }
  client = global.postgresClient;
}

export const db = drizzle(client, { schema });
export * from "./schema";
