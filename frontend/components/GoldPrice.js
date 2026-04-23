"use client";
import { useEffect, useState } from "react";
import setting from "../setting.json";

const GoldPrice = () => {
  const [city, setCity] = useState("Delhi");
  const [gold, setGold] = useState(null);

  const load = async () => {
    try {
      const res = await fetch(`${setting.api}/api/india-gold?city=${city}`);
      const json = await res.json();
      if (json.status) setGold(json.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, [city]);

  return (
    <div className="gold-bar d-flex justify-content-between align-items-center px-3 py-2">
      <div className="d-flex align-items-center gap-2">
        <span className="dot"></span>
        <span className="title">Gold ({city})</span>
      </div>

      {gold ? (
        <div className="values d-flex gap-4">
          <div>
            <small>24K</small>
            <b>₹{gold.per10g["24K"]}</b>
          </div>
          <div>
            <small>22K</small>
            <b>₹{gold.per10g["22K"]}</b>
          </div>
          <div>
            <small>18K</small>
            <b>₹{gold.per10g["18K"]}</b>
          </div>
        </div>
      ) : (
        <span>Loading...</span>
      )}

      <select value={city} onChange={(e) => setCity(e.target.value)}>
        <option>Delhi</option>
        <option>Lucknow</option>
        <option>Mumbai</option>
        <option>Kolkata</option>
      </select>

      <style jsx>{`
        .gold-bar {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 12px;
        }
        .title {
          font-weight: 600;
        }
        .dot {
          width: 10px;
          height: 10px;
          background: #ffd700;
          border-radius: 50%;
        }
        .values b {
          font-size: 18px;
        }
      `}</style>
    </div>
  );
};

export default GoldPrice;
