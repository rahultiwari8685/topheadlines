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
    <div className="gold-wrapper d-flex align-items-center justify-content-end gap-3">
      {/* ICON + TITLE */}
      <div className="d-flex align-items-center gap-2">
        <span className="gold-dot"></span>
        <span className="fw-semibold">Gold Price (India)</span>
      </div>

      {/* VALUES */}
      {gold ? (
        <div className="gold-values d-flex gap-3">
          <span>24K: ₹{gold.k24}</span>
          <span>22K: ₹{gold.k22}</span>
          <span>18K: ₹{gold.k18}</span>
        </div>
      ) : (
        <span className="text-muted">Loading...</span>
      )}

      {/* CSS */}
      <style jsx>{`
        .gold-wrapper {
          font-size: 13px;
        }

        .gold-dot {
          width: 10px;
          height: 10px;
          background: linear-gradient(135deg, #ffd700, #ffb700);
          border-radius: 50%;
          display: inline-block;
        }

        .gold-values span {
          color: #111;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .gold-wrapper {
            flex-direction: column;
            align-items: flex-start;
            gap: 2px;
          }
        }
      `}</style>
    </div>
  );
};

export default GoldPrice;
