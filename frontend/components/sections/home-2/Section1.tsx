"use client";


import cardCollections from "@/public/data/cardHome-1.json";


import ArticleCard5 from "@/components/cards/ArticleCard5";
import ArticleCard11 from "@/components/cards/ArticleCard11";
import { useState, useEffect } from "react";
import setting from "../../../setting.json";

export default function Section1({ classList }: any) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const cardCollectionsDataCol1 = cardCollections.sec7Card5Col1;
  const cardCollectionsData11 = cardCollections.sec7Card11;
  const cardCollectionsDataCol2 = cardCollections.sec7Card5Col2;


  useEffect(() => {
  setLoading(true);

  fetch(setting.api + "/api/news/getAllNews")
    .then((res) => res.json())
    .then((u) => {
      if (u.status !== false) {

        const formattedData = u.data.map((item: any) => ({
          // 🔥 REQUIRED FIELDS FOR UI
   linkPost: `/single-2?slug=${item.slug}`,
          linkBadge: "#",
          linkAuthor: "#",
          linkComment: "#",

          img: item.thumbnail
            ? `${setting.api}/uploads/images/${item.thumbnail}`
            : "/assets/imgs/page/img-28.png",

          badge: "News", // static for now
          bgBadge: "bg-2",

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
      {/*Home 2 Section 1*/}
      <section className={`sec-1-home-2 sec-padding ${classList}`} data-background="/assets/imgs/page/bg-home1-sec1.png">
        <div className="container">
          <div className="row mt-2 g-4">
            {blogs.slice(0, 1).map((card, idx) => (
              <div className="col-lg-6" key={idx}>
                <ArticleCard11  card={card} idx={idx} />
              </div>
            ))}
            <div className="col-lg-3">
              <div className="row g-4">
                {blogs.map((card, idx) => (
                  <div className="col-lg-12 col-md-6" key={idx}>
                    <ArticleCard5 key={idx} card={card} idx={idx} />
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-3">
              <div className="row g-4">
                {blogs.map((card, idx) => (
                  <div className="col-lg-12 col-md-6" key={idx}>
                    <ArticleCard5 key={idx} card={card} idx={idx} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
