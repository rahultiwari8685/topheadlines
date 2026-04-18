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
                "9623eb7bd7msh97100e55a468471p1711cjsn93b931fc7238",
              "X-RapidAPI-Host": "yahoo-finance15.p.rapidapi.com",
            },
          },
        );

        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMarket();
  }, []);

  return (
    <div className="card p-3 shadow">
      <h5>📈 Nifty 50</h5>
      {market ? (
        <>
          <h3>{market.regularMarketPrice}</h3>
          <p
            style={{
              color: market.regularMarketChange > 0 ? "green" : "red",
            }}
          >
            {market.regularMarketChange} ({market.regularMarketChangePercent}%)
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MarketWidget;
