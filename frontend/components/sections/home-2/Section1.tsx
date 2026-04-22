"use client";

import ArticleCard5 from "@/components/cards/ArticleCard5";
import ArticleCard11 from "@/components/cards/ArticleCard11";
import { useState, useEffect } from "react";
import setting from "../../../setting.json";

export default function Section1({ classList }: any) {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getYouTubeId = (url: string) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url?.match(regExp);
    return match ? match[1] : "";
  };

  useEffect(() => {
    fetch(setting.api + "/api/news/getAllNews")
      .then((res) => res.json())
      .then((u) => {
        if (u.status) {
          const formattedData = (u.data || []).map((item: any) => {
            const videoId = getYouTubeId(item.youtubeUrl);

            return {
              linkPost: `/single-2?slug=${item.slug}`,
              img: item.thumbnail
                ? `${setting.api}/uploads/${item.thumbnail}`
                : "/assets/imgs/default.jpg",

              youtubeUrl: item.youtubeUrl || "",
              hasVideo: !!videoId,

              categoryName: item.categories?.[0]?.name || "",
              categoryId: item.categories?.[0]?._id || "",

              badge: item.categories?.[0]?.name || "News",

              title: item.title || "No Title",
              description: item.subtitle || "No Description",

              date: item.createdAt
                ? new Date(item.createdAt).toDateString()
                : "",
            };
          });

          setBlogs(formattedData);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ SAFE FILTER
  const textNews = blogs.filter((item) => !item.hasVideo);
  const videoNews = blogs.filter((item) => item.hasVideo);

  // ✅ FIXED CATEGORY ORDER
  const fixedCategories = [
    "Uttar Pradesh",
    "Uttarakhand",
    "Maharashtra",
    "Jharkhand",
  ];

  // ✅ STRICT CATEGORY MATCH
  let categoryWiseNews = fixedCategories
    .map((cat) =>
      textNews.find(
        (item) =>
          item.categoryName &&
          item.categoryName.toLowerCase() === cat.toLowerCase()
      )
    )
    .filter((item) => item !== undefined);

  // ❌ REMOVE RANDOM FALLBACK (IMPORTANT)
  // No random category allowed → avoid crash + wrong data

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <section className={`sec-1-home-2 sec-padding ${classList}`}>
      <div className="container">
        <div className="row mt-2 g-4">

          {/* 🔥 1st Column */}
          {videoNews.length > 0 && (
            <div className="col-lg-6">
              <ArticleCard11 card={videoNews[0]} idx={0} />
            </div>
          )}

          {/* 🔥 2nd Column */}
          <div className="col-lg-3">
            <div className="row g-4">
              {categoryWiseNews.slice(0, 2).map((card, idx) => (
                <div className="col-lg-12 col-md-6" key={idx}>
                  <ArticleCard5 card={card} idx={idx} />
                </div>
              ))}
            </div>
          </div>

          {/* 🔥 3rd Column */}
          <div className="col-lg-3">
            <div className="row g-4">
              {categoryWiseNews.slice(2, 4).map((card, idx) => (
                <div className="col-lg-12 col-md-6" key={idx}>
                  <ArticleCard5 card={card} idx={idx} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}