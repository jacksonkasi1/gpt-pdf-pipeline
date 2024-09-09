import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";

import { Bindings } from "@/config/bindings";
import { initDb } from "./db";
import { tbl_users } from "./db/schema";

const app = new Hono<{ Bindings: Bindings }>({ strict: false });

/**
 * Middlewares
 */
app.use("*", logger());
app.use("*", cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

/**
 * Ping Pong
 */
app.get("/ping", (c) => c.json({ ping: "pong" }, 200));

/**
 * Return NODE_ENV from environment variables
 */
app.get("/env", (c) => {
  const nodeEnv = c.env.NODE_ENV || "NODE_ENV is not set";
  return c.json({ environment: nodeEnv }, 200);
});

/**
 * Example API that uses the db instance dynamically from the context
 */
app.get("/users", async (c) => {
  try {
    // Get the DATABASE_URL from the environment bindings
    const databaseUrl = c.env.DATABASE_URL;

    // Initialize the db instance using the environment-specific URL
    const db = initDb(databaseUrl);

    // Fetch data from your database using the db instance
    const users = await db.select().from(tbl_users); // Example query
    return c.json(users);
  } catch (error) {
    return c.json({ error: "Failed to fetch users" }, 500);
  }
});

export default app;
