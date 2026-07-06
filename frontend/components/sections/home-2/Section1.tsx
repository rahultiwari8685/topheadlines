"use client";

import { useState, useEffect } from "react";
import ArticleCard5 from "@/components/cards/ArticleCard5";
import ArticleCard11 from "@/components/cards/ArticleCard11";
import setting from "../../../setting.json";

export default function Section1({ classList }: any) {
  const [textNews, setTextNews] = useState<any[]>([]);
  const [videoNews, setVideoNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getYouTubeId = (url: string) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url?.match(regExp);
    return match ? match[1] : "";
  };

  const formatNews = (data: any[]) => {
    return data.map((item: any) => {
      const videoId = getYouTubeId(item.youtubeUrl);

      return {
        linkPost: `/news?slug=${item.slug}`,
        linkBadge: "#",
        linkAuthor: `/page-author/${item.author?._id}`,
        linkComment: "#",

        img: item.thumbnail?.startsWith("http")
          ? item.thumbnail
          : `${setting.api}/uploads/images/${item.thumbnail}`,

        videoUrl: videoId ? `https://www.youtube.com/embed/${videoId}` : "",

        hasVideo: !!videoId,
        youtubeUrl: item.youtubeUrl || "",

        badge: item.categories?.[0]?.name || "News",
        bgBadge: "bg-2",

        title: item.title || "No Title",
        description: item.subtitle || "No Description",

        imgAuthor: "/assets/imgs/template/author/author-1.png",
        author: item.author?.name || "Admin",

        date: new Date(item.createdAt).toDateString(),

        comment: "0",
        readNum: "0",
      };
    });
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        const [textRes, videoRes] = await Promise.all([
          fetch(`${setting.api}/api/news/getAllTextNews?limit=4`),
          fetch(`${setting.api}/api/news/getAllVideoNews?limit=1`),
        ]);

        const textData = await textRes.json();
        const videoData = await videoRes.json();

        setTextNews(
          textData.status !== false ? formatNews(textData.data || []) : [],
        );

        setVideoNews(
          videoData.status !== false ? formatNews(videoData.data || []) : [],
        );
      } catch (err) {
        console.error("API Error:", err);
        setTextNews([]);
        setVideoNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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
          {/* Video */}
          {videoNews.map((card, idx) => (
            <div className="col-lg-6" key={idx}>
              <ArticleCard11 card={card} idx={idx} />
            </div>
          ))}

          {/* Text Column 1 */}
          <div className="col-lg-3">
            <div className="row g-4">
              {textNews.slice(0, 2).map((card, idx) => (
                <div className="col-lg-12 col-md-6" key={idx}>
                  <ArticleCard5 card={card} idx={idx} />
                </div>
              ))}
            </div>
          </div>

          {/* Text Column 2 */}
          <div className="col-lg-3">
            <div className="row g-4">
              {textNews.slice(2, 4).map((card, idx) => (
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
