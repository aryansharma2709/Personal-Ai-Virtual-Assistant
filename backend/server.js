// server.js  (ESM)
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());

// allow your Vercel site (set CORS_ORIGIN on Render later)
const allowed = (process.env.CORS_ORIGIN || "*").split(",");
app.use(cors({ origin: allowed, credentials: true }));

app.get("/health", (_, res) => res.send("ok"));

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("API on", process.env.PORT || 3000);
});
