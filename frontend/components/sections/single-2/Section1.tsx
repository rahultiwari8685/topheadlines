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
    <section className="sec-1-single-2 pb-70 overflow-hidden mt-12">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 pe-lg-5 mt-2 mt-lg-0">
            {/* <nav>
              <ul className="breadcrumb d-flex gap-2">
                <li>
                  <Link href="/">Home</Link>
                </li>
              </ul>
            </nav> */}

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

              <div className="mt-10 border-t border-gray-200 pt-6">
                <div className="flex flex-wrap items-center gap-5">
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <img
                      src="/assets/imgs/template/author/author-1.png"
                      alt="author"
                      className="h-10 w-10 rounded-full object-cover"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      {news.author || "Admin"}
                    </span>
                  </div>

                  {/* Social Share */}
                  <div className="flex items-center gap-3">
                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(
                        `${news.title} ${
                          typeof window !== "undefined"
                            ? window.location.href
                            : ""
                        }`,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-green-500 transition hover:bg-green-500 hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="h-5 w-5 fill-current"
                      >
                        <path d="M16 .4C7.2.4 0 7.6 0 16.4c0 2.8.7 5.5 2.1 7.9L0 32l7.8-2a16 16 0 0 0 8.2 2.2c8.8 0 16-7.2 16-16S24.8.4 16 .4z" />
                      </svg>
                    </a>

                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${
                        typeof window !== "undefined"
                          ? window.location.href
                          : ""
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 fill-current"
                      >
                        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9v-2.9h2.5V9.4c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5v1.9h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z" />
                      </svg>
                    </a>

                    {/* Twitter/X */}
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        news.title,
                      )}&url=${
                        typeof window !== "undefined"
                          ? window.location.href
                          : ""
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-black transition hover:bg-black hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 fill-current"
                      >
                        <path d="M18.9 2H22l-6.8 7.8L23 22h-6.9l-5.4-7-6.1 7H1.5l7.3-8.4L1 2h7l4.9 6.4L18.9 2z" />
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 text-pink-500 transition hover:bg-pink-500 hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-5 w-5 fill-current"
                      >
                        <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5zm5.8-3.3a1.3 1.3 0 1 0 1.3 1.3 1.3 1.3 0 0 0-1.3-1.3z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mt-2 mt-lg-0">
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
