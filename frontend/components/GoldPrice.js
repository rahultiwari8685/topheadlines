"use client";
import { useEffect, useState } from "react";
import setting from "../../setting.json";

const GoldPrice = () => {
  const [city, setCity] = useState("Lucknow"); // ✅ default
  const [carat, setCarat] = useState("24K");
  const [gold, setGold] = useState(null);

  const fetchGold = async () => {
    try {
      const res = await fetch(
        `${setting.api}/api/india-gold?city=${city}&carat=${carat}`,
      );
      const data = await res.json();

      if (data.status) {
        setGold(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGold();
  }, [city, carat]);

  return (
    <div className="gold-bar d-flex justify-content-between align-items-center px-3 py-2">
      {/* LEFT */}
      <div className="d-flex align-items-center gap-2">
        <span className="gold-dot"></span>
        <span className="gold-title">
          Gold ({city}) - {carat}
        </span>
      </div>

      {/* CENTER */}
      {gold ? (
        <div className="gold-values">₹{gold.per10g} / 10g</div>
      ) : (
        <span>Loading...</span>
      )}

      {/* RIGHT DROPDOWNS */}
      <div className="d-flex gap-2">
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="select"
        >
          <option>Lucknow</option>
          <option>Delhi</option>
          <option>Mumbai</option>
          <option>Kolkata</option>
        </select>

        <select
          value={carat}
          onChange={(e) => setCarat(e.target.value)}
          className="select"
        >
          <option>24K</option>
          <option>22K</option>
          <option>18K</option>
        </select>
      </div>

      {/* CSS */}
      <style jsx>{`
        .gold-bar {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 12px;
        }

        .gold-title {
          font-weight: 600;
        }

        .gold-dot {
          width: 10px;
          height: 10px;
          background: #ffd700;
          border-radius: 50%;
        }

        .gold-values {
          font-size: 18px;
          font-weight: 700;
        }

        .select {
          border: 1px solid #ddd;
          padding: 4px 6px;
          border-radius: 6px;
          font-size: 12px;
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
