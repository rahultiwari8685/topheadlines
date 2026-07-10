"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import setting from "../setting.json";

interface TrendingNews {
  _id: string;
  title: string;
  slug: string;
}

export default function TrendingTicker() {
  const [news, setNews] = useState<TrendingNews[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(`${setting.api}/api/news/trending?limit=10`);

        const data = await res.json();

        setNews(data.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrending();
  }, []);

  if (news.length === 0) return null;

  return (
    <div className="ticker-wrapper">
      <div className="ticker">
        {[...news, ...news].map((item, index) => (
          <Link
            key={`${item._id}-${index}`}
            href={`/news?slug=${item.slug}`}
            className="ticker-item"
            prefetch={false}
          >
            🔥 {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
