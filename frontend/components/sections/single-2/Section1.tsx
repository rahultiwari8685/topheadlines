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
              <span>{news.author || "Admin"}</span>

              {/* WhatsApp Share Button */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `${news.title} ${
                    typeof window !== "undefined" ? window.location.href : ""
                  }`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="h-5 w-5 fill-white"
                >
                  <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.82.736 5.57 2.134 7.99L0 32l7.83-2.052a15.94 15.94 0 0 0 8.17 2.244c8.836 0 16-7.164 16-16S24.836.396 16 .396zm0 29.01a13.01 13.01 0 0 1-6.63-1.814l-.474-.282-4.646 1.218 1.24-4.53-.31-.466A12.96 12.96 0 0 1 3.01 16.4C3.01 9.237 8.837 3.41 16 3.41S28.99 9.237 28.99 16.4 23.163 29.406 16 29.406zm7.15-9.74c-.392-.196-2.318-1.144-2.678-1.274-.36-.13-.622-.196-.884.196-.262.392-1.014 1.274-1.244 1.536-.23.262-.458.294-.85.098-.392-.196-1.654-.61-3.15-1.944-1.163-1.037-1.948-2.318-2.178-2.71-.23-.392-.024-.604.172-.8.176-.175.392-.458.588-.686.196-.228.262-.392.392-.654.13-.262.065-.49-.033-.686-.098-.196-.884-2.122-1.21-2.906-.318-.764-.642-.66-.884-.672-.228-.01-.49-.012-.752-.012-.262 0-.686.098-1.046.49-.36.392-1.374 1.342-1.374 3.272 0 1.93 1.406 3.794 1.602 4.056.196.262 2.77 4.23 6.712 5.93.938.404 1.67.646 2.24.826.942.3 1.8.258 2.478.156.756-.112 2.318-.946 2.646-1.86.328-.914.328-1.698.23-1.86-.098-.164-.36-.262-.752-.458z" />
                </svg>
                Share
              </a>
            </div>
          </div>

          <div className="col-lg-6">
            {news.thumbnail ? (
              <img
                src={
                  news.thumbnail?.startsWith("http")
                    ? news.thumbnail
                    : `${setting.api}/uploads/images/${news.thumbnail}`
                }
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
          <div>
            {(() => {
              try {
                const parsedContent =
                  typeof news.content === "string"
                    ? JSON.parse(news.content)
                    : news.content;

                // ✅ EditorJS Content
                if (parsedContent?.blocks) {
                  return parsedContent.blocks.map((block: any, idx: number) => {
                    switch (block.type) {
                      case "paragraph":
                        return (
                          <p
                            key={idx}
                            dangerouslySetInnerHTML={{
                              __html: block.data.text,
                            }}
                          />
                        );

                      case "header":
                        return (
                          <h2
                            key={idx}
                            dangerouslySetInnerHTML={{
                              __html: block.data.text,
                            }}
                          />
                        );

                      case "image":
                        return (
                          <img
                            key={idx}
                            src={block.data.file.url}
                            className="img-fluid rounded mb-3"
                            alt=""
                          />
                        );

                      default:
                        return null;
                    }
                  });
                }

                // ✅ Old HTML Content
                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: news.content || "",
                    }}
                  />
                );
              } catch (err) {
                // ✅ fallback old html
                return (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: news.content || "",
                    }}
                  />
                );
              }
            })()}
          </div>
        </div>
      </div>
    </section>
  );
}
