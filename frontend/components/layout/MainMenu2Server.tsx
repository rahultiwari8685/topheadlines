"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Category = {
  _id: string;
  name: string;
  slug?: string;
  showInMenu?: number;
};

export default function MainMenu2Server() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("https://api.iotaclasses.in/api/categories/getAllCategory")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // ✅ FILTER: only showInMenu = 1
          const filtered = data.data.filter(
            (cat: Category) => cat.showInMenu === 1
          );

          setCategories(filtered);
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

        {/* First Category (replace Trending) */}
        {categories.length > 0 && (
          <li>
            <Link href={`/archieve-2?category=${categories[0]._id}`}>
              <span className="title">{categories[0].name}</span>
            </Link>
          </li>
        )}

        {/* All Menu Categories */}
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