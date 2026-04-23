"use client";
import { useEffect, useState } from "react";

const GoldInline = () => {
  const [gold, setGold] = useState(null);
  const [city, setCity] = useState("Lucknow");
  const [carat, setCarat] = useState("24K");

  const fetchGold = async () => {
    try {
      const res = await fetch(`/api/india-gold?city=${city}&carat=${carat}`);
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
    <div className="gold-inline">
      {/* LEFT TEXT */}
      <div className="gold-info">
        <span className="dot"></span>

        <span className="price">₹{gold?.per10g || "--"}</span>

        <span className="meta">
          Gold ({city}) {carat}
        </span>
      </div>

      {/* RIGHT DROPDOWN */}
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
        .gold-inline {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: #fff;
        }

        .gold-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: #ffd700;
          border-radius: 50%;
        }

        .price {
          font-size: 22px;
          font-weight: 700;
        }

        .meta {
          font-size: 13px;
          color: #bbb;
        }

        .controls {
          display: flex;
          gap: 6px;
        }

        select {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          padding: 2px 6px;
          border-radius: 6px;
          font-size: 12px;
        }

        select option {
          color: #000;
        }

        @media (max-width: 768px) {
          .gold-inline {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default GoldInline;
