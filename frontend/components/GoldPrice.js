"use client";
import { useEffect, useState } from "react";

const GoldPrice = () => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchGold = async () => {
      try {
        const res = await fetch("https://api.metals.live/v1/spot/gold");
        const data = await res.json();

        // API format: [{ gold: 2300.45 }]
        setPrice(data[0]?.gold);
      } catch (err) {
        console.error("Gold API Error:", err);
      }
    };

    fetchGold();
  }, []);

  return (
    <div className="gold-bar">
      {price ? (
        <div className="ticker">🟡 Gold: ${price} / oz</div>
      ) : (
        <p>Loading gold price...</p>
      )}

      <style jsx>{`
        .gold-bar {
          background: #111;
          color: #ffd700;
          padding: 8px;
          overflow: hidden;
        }

        .ticker {
          display: inline-block;
          animation: scroll 12s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default GoldPrice;
