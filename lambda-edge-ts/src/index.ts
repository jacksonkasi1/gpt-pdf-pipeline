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

app.use("/", async (c) =>
  c.text(`Hello World & version = ${process.env.VERSION} `),
);

/**
 * Ping Pong
 */
app.get("/ping", (c) => c.json({ ping: "pong" }, 200));


const port = process.env.PORT || 5000;

console.log(`Starting server on port http://127.0.0.1:${port} 🚀`);

export const handler = handle(app);
