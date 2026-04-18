import { useEffect, useState } from "react";

const MarketWidget = () => {
  const [market, setMarket] = useState(null);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const res = await fetch(
          "https://query1.finance.yahoo.com/v7/finance/quote?symbols=%5ENSEI",
        );
        const data = await res.json();
        setMarket(data.quoteResponse.result[0]);
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
