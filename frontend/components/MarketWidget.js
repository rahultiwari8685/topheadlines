"use client";
import { useEffect, useState } from "react";

const MarketWidget = () => {
  const [market, setMarket] = useState < any > null;

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const res = await fetch(
          "https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/%5ENSEI",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key":
                "9623eb7bd7msh97100e55a468471p1711cjsn93b931fc7238", // ⚠️ replace later
              "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
            },
          },
        );

        const data = await res.json();

        // 🔥 IMPORTANT: correct data path
        const result = data?.body?.[0] || null;

        setMarket(result);
      } catch (err) {
        console.error("Market Error:", err);
      }
    };

    fetchMarket();
  }, []);

  return (
    <div className="market-bar">
      {market ? (
        <div className="ticker">
          📈 Nifty 50: {market.regularMarketPrice} |{" "}
          <span
            style={{
              color: market.regularMarketChange > 0 ? "green" : "red",
            }}
          >
            {market.regularMarketChange} ({market.regularMarketChangePercent}%)
          </span>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      {/* ✅ CSS */}
      <style jsx>{`
        .market-bar {
          background: #000;
          color: #fff;
          overflow: hidden;
          white-space: nowrap;
          padding: 8px;
        }

        .ticker {
          display: inline-block;
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
