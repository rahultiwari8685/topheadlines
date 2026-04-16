import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
// import reportRoutes from "./routes/reportRoutes.js";
import authRoutes from "./routes/auth.js";
// import planRoutes from "./routes/planRoutes.js";
// import customerRoutes from "./routes/customerRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import webhookRoutes from "./routes/webhookRoutes.js";

// import customerAuthRoutes from "./routes/customerAuth.js";
// import pollRoutes from "./routes/pollRoutes.js";
// import liveRoutes from "./routes/liveRoutes.js";
import rateLimit from "express-rate-limit";
// import orderRoutes from "./routes/orderRoutes.js";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per IP
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

app.use(limiter);

// app.use(
//   cors({
//     origin: [
//       "https://sanskritisutracreations.com",
//       "https://admin.sanskritisutracreations.com",
//     ],
//     credentials: true,
//   }),
// );

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
