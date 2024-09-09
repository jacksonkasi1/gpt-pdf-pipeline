import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";

// ** import schema
import * as schema from "./schema";

// Create a function to initialize the db dynamically
export const initDb = (databaseUrl: string) => {
  const client = new Pool({ connectionString: databaseUrl });
  return drizzle(client, { schema, logger: true });
};
