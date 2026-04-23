"use client";
import { useEffect, useState } from "react";
import setting from "../setting.json";

const GoldPrice = () => {
  const [gold, setGold] = useState(null);
  const [city, setCity] = useState("Lucknow");
  const [carat, setCarat] = useState("24K");
  const [dark, setDark] = useState(false);

  // ✅ Detect theme
  useEffect(() => {
    const isDark =
      document.documentElement.classList.contains("dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    setDark(isDark);
  }, []);

  const fetchGold = async () => {
    try {
      const res = await fetch(
        `${setting.api}/api/india-gold?city=${city}&carat=${carat}`,
      );
      const data = await res.json();
      if (data.status) setGold(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGold();
  }, [city, carat]);

  return (
    <div className={`gold-bar ${dark ? "dark" : "light"}`}>
      {/* LEFT */}
      <div className="left">
        <span className="dot"></span>
        <span className="title">
          Gold ({city}) - {carat}
        </span>
      </div>

      {/* CENTER */}
      {gold ? (
        <div className="value"> ₹{gold.per10g} / 10g</div>
      ) : (
        <span>Loading...</span>
      )}

      {/* RIGHT */}
      <div className="controls">
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option>Lucknow</option>
          <option>Delhi</option>
          <option>Mumbai</option>
          <option>Kolkata</option>
        </select>

        <select value={carat} onChange={(e) => setCarat(e.target.value)}>
          <option>24K</option>
          <option>22K</option>
          <option>18K</option>
        </select>
      </div>

      <style jsx>{`
        .gold-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 14px;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        /* ✅ LIGHT MODE */
        .gold-bar.light {
          background: #ffffff;
          border: 1px solid #eee;
          color: #111;
        }

        /* ✅ DARK MODE */
        .gold-bar.dark {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
        }

        .left {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }

        .dot {
          width: 10px;
          height: 10px;
          background: #ffd700;
          border-radius: 50%;
        }

        .value {
          font-size: 18px;
          font-weight: 700;
        }

        .controls {
          display: flex;
          gap: 6px;
        }

        select {
          border-radius: 6px;
          padding: 3px 6px;
          font-size: 12px;
          border: none;
          outline: none;
        }

        /* Dark select */
        .dark select {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        /* Light select */
        .light select {
          background: #f5f5f5;
          color: #111;
        }

        @media (max-width: 768px) {
          .gold-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
        }
      `}</style>
    </div>
  );
};

export default GoldPrice;
