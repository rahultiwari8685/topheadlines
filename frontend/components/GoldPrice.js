"use client";
import { useEffect, useState } from "react";

const GoldPrice = () => {
  const [gold, setGold] = useState(null);

  useEffect(() => {
    const fetchGold = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=gold&vs_currencies=usd",
        );

        const data = await res.json();

        // fallback if "gold" not available → use tether-gold
        const usd = data.gold?.usd || data["tether-gold"]?.usd;

        const usdToInr = 83;

        // 1 ounce = 31.1 gram
        const perGram24K = (usd * usdToInr) / 31.1;

        const prices = {
          "24K": perGram24K,
          "22K": perGram24K * 0.916,
          "18K": perGram24K * 0.75,
        };

        setGold({
          perGram: {
            "24K": prices["24K"].toFixed(2),
            "22K": prices["22K"].toFixed(2),
            "18K": prices["18K"].toFixed(2),
          },
          per10g: {
            "24K": (prices["24K"] * 10).toFixed(2),
            "22K": (prices["22K"] * 10).toFixed(2),
            "18K": (prices["18K"] * 10).toFixed(2),
          },
        });
      } catch (err) {
        console.error("Gold Error:", err);
      }
    };

    fetchGold();
  }, []);

  return (
    <div className="gold-bar d-flex justify-content-between align-items-center px-3 py-2">
      {/* LEFT */}
      <div>
        {gold ? (
          <>
            <h6 className="text-warning mb-1">🟡 Gold Price (India)</h6>

            <small>24K: ₹{gold.per10g["24K"]} / 10g</small>
            <br />
            <small>22K: ₹{gold.per10g["22K"]} / 10g</small>
            <br />
            <small>18K: ₹{gold.per10g["18K"]} / 10g</small>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* RIGHT */}
      <button className="btn btn-warning btn-sm">Check Rate</button>
    </div>
  );
};

export default GoldPrice;
