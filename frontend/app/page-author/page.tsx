"use client";

import SectionTitle from "@/components/elements/TitleWhite";
import { useState, useEffect } from "react";
import setting from "@/setting.json";

import ArticleCard12 from "@/components/cards/ArticleCard12";

export default function Section5() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatestNews();
  }, []);

  const getLatestNews = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${setting.api}/api/news/getAllNews`);

      const result = await response.json();

      if (result.status && result.data) {
        // ONLY TEXT NEWS
        const textNews = result.data.filter((item: any) => !item.youtubeUrl);

        const formattedNews = textNews.map((item: any, idx: number) => ({
          _id: item._id,

          linkPost: `/single-2?slug=${item.slug}`,

          linkBadge: "#",

          linkAuthor: "#",

          linkComment: "#",

          img: item.thumbnail
            ? item.thumbnail.startsWith("http")
              ? item.thumbnail
              : `${setting.api}/uploads/images/${item.thumbnail}`
            : "/assets/imgs/page/img-66.png",

          badge: item.categories?.[0]?.name || "News",

          bgBadge: `bg-${(idx % 5) + 1}`,

          title: item.title || "No Title",

          description: item.subtitle || "No Description",

          imgAuthor: "/assets/imgs/template/author/author-1.png",

          author: item.author?.name || "Admin",

          date: new Date(item.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),

          comment: "0",

          readNum: "0",
        }));

        setBlogs(formattedNews);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.log("News Fetch Error:", error);

      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="sec-5-home-2 sec-padding overflow-hidden">
        <div className="container">
          <div className="text-center py-5">Loading latest news...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="sec-5-home-2 sec-padding overflow-hidden">
      <div className="container">
        {/* SECTION TITLE */}
        <div className="row">
          <div className="col-12">
            <SectionTitle
              title="Latest News"
              description="Fresh Stories. Fast Updates."
            />
          </div>
        </div>

        {/* DYNAMIC NEWS */}
        <div className="row mt-2 g-4">
          {blogs.length > 0 ? (
            blogs.slice(0, 6).map((card, idx) => (
              <div className="col-12" key={card._id}>
                <ArticleCard12 card={card} idx={idx} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center py-5">No News Found</div>
          )}
        </div>
      </div>
    </section>
  );
}
