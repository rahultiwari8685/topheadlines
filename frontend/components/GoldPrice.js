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

        // ❌ if no data → stop
        if (!usd) return;

        const usdToInr = 83;

        const perGram24K = (usd * usdToInr) / 31.1;

        setGold({
          "24K": (perGram24K * 10).toFixed(2),
          "22K": (perGram24K * 10 * 0.916).toFixed(2),
          "18K": (perGram24K * 10 * 0.75).toFixed(2),
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchGold();
  }, []);

  return (
    <div>
      {gold ? (
        <>
          <p>24K: ₹{gold["24K"]} / 10g</p>
          <p>22K: ₹{gold["22K"]} / 10g</p>
          <p>18K: ₹{gold["18K"]} / 10g</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GoldPrice;
