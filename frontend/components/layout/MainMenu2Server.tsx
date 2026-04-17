"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  _id: string;
  name: string;
  slug?: string;
};

export default function MainMenu2Server() {
  const [categories, setCategories] = useState<Category[]>([]);

  // ✅ Fetch Categories
  useEffect(() => {
    fetch("https://api.iotaclasses.in/api/categories/getAllCategory")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCategories(data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <nav className="main-menu">
      <ul style={{ display: "flex", gap: "20px", listStyle: "none" }}>
        
        {/* Home */}
        <li>
          <Link href="/">Home</Link>
        </li>

        {/* Dynamic Category (Replacing Trending) */}
        <li>
          <Link
            href={
              categories.length > 0
                ? `/archieve-2?category=${categories[0]._id}`
                : "#"
            }
          >
            <span className="title">
              {categories.length > 0
                ? categories[0]?.name
                : "Loading..."}
            </span>
          </Link>
        </li>

        {/* Optional: Show All Categories */}
        {categories.map((cat) => (
          <li key={cat._id}>
            <Link href={`/archieve-2?category=${cat._id}`}>
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}