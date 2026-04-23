import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// Example using gold-api (XAU spot) + your own city adjustments
router.get("/india-gold", async (req, res) => {
  try {
    const { city = "Delhi" } = req.query;

    // 🔹 REAL GOLD (XAU) per ounce
    const r = await fetch("https://api.gold-api.com/price/XAU");
    const d = await r.json();

    const usd = d?.price; // per ounce
    if (!usd) {
      return res.status(500).json({ status: false, message: "No price" });
    }

    // 🔹 Convert to INR/gram
    const usdToInr = 83; // keep dynamic if you want (forex API)
    const perGram24 = (usd * usdToInr) / 31.1;

    // 🔹 City multipliers (approx local variance)
    const cityFactor =
      {
        Delhi: 1.0,
        Lucknow: 1.005,
        Mumbai: 0.995,
        Kolkata: 1.01,
      }[city] || 1;

    const prices = {
      city,
      perGram: {
        "24K": +(perGram24 * cityFactor).toFixed(2),
        "22K": +(perGram24 * 0.916 * cityFactor).toFixed(2),
        "18K": +(perGram24 * 0.75 * cityFactor).toFixed(2),
      },
      per10g: {
        "24K": +(perGram24 * 10 * cityFactor).toFixed(0),
        "22K": +(perGram24 * 10 * 0.916 * cityFactor).toFixed(0),
        "18K": +(perGram24 * 10 * 0.75 * cityFactor).toFixed(0),
      },
      source: "XAU spot (converted to INR)",
      updatedAt: new Date().toISOString(),
    };

    res.json({ status: true, data: prices });
  } catch (e) {
    res.status(500).json({ status: false, message: e.message });
  }
});

export default router;
