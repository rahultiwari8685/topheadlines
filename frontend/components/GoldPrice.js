"use client";
import { useEffect, useState } from "react";

const GoldPriceINR = () => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchGold = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=tether-gold&vs_currencies=usd",
        );
        const data = await res.json();

        const usdPrice = data["tether-gold"]?.usd;

        // ✅ USD → INR conversion (approx)
        const usdToInr = 83;

        // 1 ounce = 31.1 grams
        const perGram = (usdPrice * usdToInr) / 31.1;
        const per10g = perGram * 10;

        setPrice({
          perGram: perGram.toFixed(2),
          per10g: per10g.toFixed(2),
        });
      } catch (err) {
        console.error("Gold Error:", err);
      }
    };

    fetchGold();
  }, []);

  return (
    <div className="gold-bar d-flex justify-content-between align-items-center px-3 py-2">
      {/* LEFT: DATA */}
      <div>
        {price ? (
          <>
            <h5 className="mb-0 text-warning">🟡 Gold ₹{price.per10g} / 10g</h5>
            <small>₹{price.perGram} per gram</small>
          </>
        ) : (
          <p className="mb-0">Loading...</p>
        )}
      </div>

      {/* RIGHT: BUTTON */}
      <button className="btn btn-warning btn-sm">Buy Gold</button>
    </div>
  );
};

export default GoldPriceINR;
