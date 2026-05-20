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

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    {/* Author */}
                    <div className="flex items-center gap-2">
                      <img
                        src="/assets/imgs/template/author/author-1.png"
                        alt="author"
                        className="h-10 w-10 rounded-full object-cover"
                      />

                      <span className="text-sm font-medium text-gray-700">
                        {news.author || "Admin"}
                      </span>
                    </div>

                    {/* Social Buttons */}
                    <div className="flex items-center gap-2">
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
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-green-500 hover:bg-green-500 hover:text-white transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.768.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.787-1.48-1.76-1.653-2.057-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.612-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.075-.792.372-.272.298-1.04 1.016-1.04 2.479s1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z" />
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
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-blue-600 hover:bg-blue-600 hover:text-white transition"
                      >
                        <span className="text-sm font-bold">f</span>
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
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-black hover:bg-black hover:text-white transition"
                      >
                        <span className="text-xs font-bold">X</span>
                      </a>

                      {/* Instagram */}
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-pink-500 hover:bg-pink-500 hover:text-white transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 2h8.5C18.322 4 20 5.678 20 7.75v8.5c0 2.072-1.678 3.75-3.75 3.75h-8.5C5.678 20 4 18.322 4 16.25v-8.5C4 5.678 5.678 4 7.75 4zm8.75 1a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5zM12 7a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6z" />
                        </svg>
                      </a>
                    </div>
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
