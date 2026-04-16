"use client";

import SectionTitle from "@/components/elements/TitleWhite";


import { useState, useEffect } from "react";
import setting from "../../../setting.json";


import ArticleCard12 from "@/components/cards/ArticleCard12";
import cardHome2 from "@/public/data/cardHome-2.json";
export default function Section5() {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const articleCard12 = cardHome2.sec5Card12;


    useEffect(() => {
    setLoading(true);
  
    fetch(setting.api + "/api/news/getAllNews")
      .then((res) => res.json())
      .then((u) => {
        if (u.status !== false) {
  
       const formattedData = u.data.slice(0, 5).map((item: any, idx: number) => ({
  linkPost: `/news/${item.slug || "#"}`,
  linkBadge: "#",
  linkAuthor: "#",
  linkComment: "#",

  img: item.thumbnail
    ? `${setting.api}/uploads/images/${item.thumbnail}`
    : "/assets/imgs/page/img-66.png",

  badge: "News",
  bgBadge: `bg-${(idx % 5) + 1}`, // dynamic colors

  title: item.title || "No Title",
  description: item.subtitle || "No Description",

  imgAuthor: "/assets/imgs/template/author/author-1.png",
  author: "Admin",

  date: new Date(item.createdAt).toDateString(),

  comment: "0",
  readNum: "0",
}));
  
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
  return (
    <>
      {/*Home 2 Section 5*/}
      <section className="sec-5-home-2 sec-padding overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <SectionTitle title="Latest news" description="Fresh Stories. Fast Updates." />
            </div>
          </div>
          <div className="row mt-2 g-4">
            {blogs.map((card, idx) => (
              <div className="col-12" key={idx}>
                <ArticleCard12 card={card} idx={idx} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
