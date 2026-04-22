"use client";
import { useEffect, useState } from "react";

const GoldPrice = () => {
  const [gold, setGold] = useState(null);

  useEffect(() => {
    const fetchGold = async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=tether-gold&vs_currencies=usd",
        );

        const data = await res.json();
        const usd = data["tether-gold"]?.usd;

        if (!usd) return;

        const usdToInr = 83;
        const perGram = (usd * usdToInr) / 31.1;

        setGold({
          k24: (perGram * 10).toFixed(0),
          k22: (perGram * 10 * 0.916).toFixed(0),
          k18: (perGram * 10 * 0.75).toFixed(0),
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchGold();
  }, []);

  return (
    <div className="gold-bar d-flex justify-content-between align-items-center px-3 py-2">
      {/* LEFT TITLE */}
      <div className="d-flex align-items-center gap-2">
        <span className="gold-dot"></span>
        <span className="gold-title">Gold Price (India)</span>
      </div>

      {/* RIGHT VALUES */}
      {gold ? (
        <div className="gold-values d-flex gap-4">
          <div className="gold-item">
            <span className="label">24K</span>
            <span className="price">₹{gold.k24}</span>
          </div>

          <div className="gold-item">
            <span className="label">22K</span>
            <span className="price">₹{gold.k22}</span>
          </div>

          <div className="gold-item">
            <span className="label">18K</span>
            <span className="price">₹{gold.k18}</span>
          </div>
        </div>
      ) : (
        <span className="loading">Loading...</span>
      )}

      {/* CSS */}
      <style jsx>{`
        .gold-bar {
          background: #f8f9fa;
          border-radius: 10px;
        }

        .gold-title {
          font-size: 16px;
          font-weight: 600;
        }

        .gold-dot {
          width: 12px;
          height: 12px;
          background: linear-gradient(135deg, #ffd700, #ffb700);
          border-radius: 50%;
        }

        .gold-values {
          align-items: center;
        }

        .gold-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .label {
          font-size: 12px;
          color: #777;
        }

        .price {
          font-size: 18px; /* 🔥 BIG FONT */
          font-weight: 700;
          color: #111;
        }

        .loading {
          font-size: 14px;
          color: #999;
        }

        @media (max-width: 768px) {
          .gold-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
          }

          .price {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default GoldPrice;
