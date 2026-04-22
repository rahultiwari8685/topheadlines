"use client";
import { useEffect, useState } from "react";

const GoldPrice = () => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchGold = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=tether-gold&vs_currencies=usd",
        );
        const data = await res.json();

        // ✅ Correct path
        setPrice(data["tether-gold"]?.usd);
      } catch (err) {
        console.error("Gold API Error:", err);
      }
    };

    fetchGold();
  }, []);

  return (
    <div className="gold-bar d-flex justify-content-between align-items-center px-3 py-2">
      {/* LEFT: Gold Data */}
      <div>
        {price ? (
          <>
            <h5 className="mb-0 text-warning">🟡 Gold: ${price}</h5>
            <small>Live Market Price</small>
          </>
        ) : (
          <p className="mb-0">Loading...</p>
        )}
      </div>

      {/* RIGHT: Button */}
      <button className="btn btn-warning btn-sm">View Details</button>
    </div>
  );
};

export default GoldPrice;
