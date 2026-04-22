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
    setLoading(true);

    fetch(setting.api + "/api/news/getAllNews")
      .then((res) => res.json())
      .then((u) => {
        if (u.status !== false) {
          const formattedData = u.data.map((item: any) => {
            const videoId = getYouTubeId(item.youtubeUrl);

            return {
              linkPost: `/single-2?slug=${item.slug}`,
              img: item.thumbnail
                ? `${setting.api}/uploads/${item.thumbnail}`
                : "/assets/imgs/default.jpg",

              videoUrl: videoId
                ? `https://www.youtube.com/embed/${videoId}`
                : "",

              hasVideo: !!videoId,
              youtubeUrl: item.youtubeUrl || "",

              // ✅ CATEGORY INFO
              categoryName: item.categories?.[0]?.name || "",
              categoryId: item.categories?.[0]?._id || "",

              badge: item.categories?.[0]?.name || "News",
              bgBadge: "bg-2",

              title: item.title || "No Title",
              description: item.subtitle || "No Description",

              date: new Date(item.createdAt).toDateString(),
            };
          });

          setBlogs(formattedData);
        } else {
          setBlogs([]);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setBlogs([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ FILTER
  const textNews = blogs.filter((item) => !item.youtubeUrl);
  const videoNews = blogs.filter((item) => item.youtubeUrl);

  // ✅ FIXED CATEGORY ORDER
  const fixedCategories = [
    "Uttar Pradesh",
    "Uttarakhand",
    "Maharashtra",
    "Jharkhand",
  ];

  // ✅ PICK 1 NEWS FROM EACH CATEGORY
  let categoryWiseNews = fixedCategories
    .map((cat) =>
      textNews.find(
        (item) =>
          item.categoryName?.toLowerCase() === cat.toLowerCase()
      )
    )
    .filter(Boolean);

  // ✅ FALLBACK (if less than 4)
  if (categoryWiseNews.length < 4) {
    const remaining = textNews.filter(
      (item) =>
        !categoryWiseNews.some((n) => n.linkPost === item.linkPost)
    );

    categoryWiseNews = [
      ...categoryWiseNews,
      ...remaining.slice(0, 4 - categoryWiseNews.length),
    ];
  }

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <section
      className={`sec-1-home-2 sec-padding ${classList}`}
      data-background="/assets/imgs/page/bg-home1-sec1.png"
    >
      <div className="container">
        <div className="row mt-2 g-4">

          {/* 🔥 1st Column (Video Featured) */}
          {videoNews.slice(0, 1).map((card, idx) => (
            <div className="col-lg-6" key={idx}>
              <ArticleCard11 card={card} idx={idx} />
            </div>
          ))}

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