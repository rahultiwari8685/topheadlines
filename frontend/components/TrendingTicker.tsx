"use client";

import Link from "next/link";

interface TrendingNews {
  _id: string;
  title: string;
  slug: string;
}

export default function TrendingTicker({ news }: { news: TrendingNews[] }) {
  if (!news || news.length === 0) return null;

  return (
    <div className="ticker-wrapper">
      <div className="ticker">
        {[...news, ...news].map((item, index) => (
          <Link
            key={`${item._id}-${index}`}
            href={`/news/${item.slug}`}
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
