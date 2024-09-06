import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

// ** import middlewares
import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = new Hono({ strict: false });

/**
 * Middlewares
 * https://hono.dev/middleware/builtin/cors
 */
app.use("*", logger());
app.use("*", cors());

/**
 * Ping Pong
 */
app.use("/", async (c) => c.text(`Hello World ^ version = ${process.env.NODE_ENV} ` ));
app.get("/ping", (c) => c.json({ ping: "pong" }, 200));

const port = process.env.PORT || 3000;
console.log(`Starting server on port http://127.0.0.1:${port} 🚀`);

export const handler = handle(app);
