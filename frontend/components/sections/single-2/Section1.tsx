"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import setting from "../../../setting.json";

export default function Section1() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getYouTubeId = (url: string) => {
    const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/;
    const match = url?.match(regExp);
    return match ? match[1] : "";
  };

  useEffect(() => {
    if (!slug) return;

    setLoading(true);

    fetch(`${setting.api}/api/news/slug/${slug}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          setNews(res.data);
        } else {
          setNews(null);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setNews(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!news) {
    return <div className="text-center mt-5">News not found</div>;
  }

  const videoId = getYouTubeId(news.youtubeUrl);

  return (
    <section className="sec-1-single-2 pb-70 overflow-hidden">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 pe-lg-5">
            <nav>
              <ul className="breadcrumb d-flex gap-2">
                <li>
                  <Link href="/">Home</Link>
                </li>
              </ul>
            </nav>

            <h2>{news.title}</h2>

            <p>{new Date(news.createdAt).toDateString()}</p>

            <div className="d-flex align-items-center gap-2">
              <img
                src="/assets/imgs/template/author/author-1.png"
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
                alt="author"
              />
              <span>Admin</span>
            </div>
          </div>

          <div className="col-lg-6">
            {news.thumbnail ? (
              // ✅ Thumbnail Image
              // <img
              //   src={`${setting.api}/uploads/images/${news.thumbnail}`}
              //   className="img-fluid"
              //   alt="news"
              //   style={{ width: "100%", borderRadius: "10px" }}
              // />
              <img
                src={news.thumbnail}
                className="img-fluid"
                alt="news"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                }}
              />
            ) : videoId ? (
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: "10px",
                  }}
                ></iframe>
              </div>
            ) : (
              <img
                src="/assets/imgs/page/img-28.png"
                className="img-fluid"
                alt="default"
                style={{ width: "100%", borderRadius: "10px" }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="col-lg-9 offset-lg-1">
          <div
            dangerouslySetInnerHTML={{
              __html: news.content || "",
            }}
          />
        </div>
      </div>

      {/* <div className="container mt-4">
        <div className="col-lg-9 offset-lg-1">
          {news.content?.blocks?.map((block: any, idx: number) => {
            if (block.type === "paragraph") {
              return (
                <p
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: block.data.text }}
                />
              );
            }
            return null;
          })}
        </div>
      </div> */}
    </section>
  );
}
