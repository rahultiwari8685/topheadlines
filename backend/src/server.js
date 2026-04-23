import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import authRoutes from "./routes/auth.js";

import rateLimit from "express-rate-limit";
import goldRoutes from "./routes/gold.js";

const app = express();

app.set("trust proxy", 1);

// ✅ RATE LIMIT
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

app.use(
  "/api/auth",
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 10,
  }),
);

// ✅ APPLY ONLY TO API (BEST PRACTICE)
app.use("/api", limiter);
app.use("/api", goldRoutes);

const allowedOrigins = [
  "https://iotaclasses.in",
  "https://admin.iotaclasses.in",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json({ limit: "1mb" }));

app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/news", newsRoutes);
// app.use("/api/reports", reportRoutes);
// app.use("/api/plans", planRoutes);
// app.use("/api/customers", customerRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/webhooks", webhookRoutes);

app.use("/api/auth", authRoutes);
// app.use("/api/customer-auth", customerAuthRoutes);

// app.use("/api/polls", pollRoutes);

// app.use("/api/live", liveRoutes);
// app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

console.log("MONGO_URI from env:", MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err.message));

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
