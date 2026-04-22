"use client";
import { useEffect, useState } from "react";

const MarketWidget = () => {
  const [market, setMarket] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const res = await fetch(
          "https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/%5ENSEI",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "0773162b35msh805d10f205ed4c9p11a7d8jsn05c33205eda1", // 🔥 replace this
              "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
            },
          },
        );

        const data = await res.json();

        // ✅ FIX: correct response path
        const result = data?.body?.[0] || null;

        setMarket(result);
      } catch (err) {
        console.error("Market API Error:", err);
        setMarket(null);
      }
    };

    fetchMarket();
  }, []);

  return (
    <div className="market-bar">
      {market ? (
        <div className="ticker">
          📈 Nifty 50: {market?.regularMarketPrice}{" "}
          <span
            style={{
              color: market?.regularMarketChange > 0 ? "green" : "red",
              marginLeft: "8px",
            }}
          >
            {market?.regularMarketChange} ({market?.regularMarketChangePercent}
            %)
          </span>
        </div>
      ) : (
        <p className="mb-0">Loading...</p>
      )}

      {/* ✅ SCROLL CSS */}
      <style jsx>{`
        .market-bar {
          background: #000;
          color: #fff;
          overflow: hidden;
          white-space: nowrap;
          padding: 8px 0;
        }

        .ticker {
          display: inline-block;
          white-space: nowrap;
          animation: scroll 15s linear infinite;
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

export default MarketWidget;
