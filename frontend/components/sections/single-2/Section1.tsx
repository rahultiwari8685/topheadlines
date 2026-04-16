"use client";

import Image from "next/image";
import Link from "next/link";
import ContentSingle from "@/components/elements/ContentSingle";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import setting from "../../../setting.json";

export default function Section1() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

    console.log("Slug from URL:", slug); // Debugging line

  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetch(`${setting.api}/api/news/slug/${slug}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          setNews(res.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (!news) {
    return <div className="text-center mt-5">News not found</div>;
  }

  return (
    <section className="sec-1-single-2 pb-70 overflow-hidden">
      
      <div className="container">
        <div className="row">
          <div className="col-lg-6 pe-lg-5">

            {/* 🔥 Breadcrumb */}
            <nav>
              <ul className="breadcrumb d-flex gap-2">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>{news.title}</li>
              </ul>
            </nav>

            {/* 🔥 Title */}
            <h2>{news.title}</h2>

            {/* 🔥 Date */}
            <p>{new Date(news.createdAt).toDateString()}</p>

            {/* 🔥 Author */}
            <div className="d-flex align-items-center gap-2">
              <img
                src="/assets/imgs/template/author/author-1.png"
                width={40}
              />
              <span>Admin</span>
            </div>
          </div>

          {/* 🔥 Image */}
          <div className="col-lg-6">
            <img
              src={
                news.thumbnail
                  ? `${setting.api}/uploads/images/${news.thumbnail}`
                  : "/assets/imgs/page/img-28.png"
              }
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      {/* 🔥 Content */}
      <div className="container mt-4">
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
      </div>
    </section>
  );
}