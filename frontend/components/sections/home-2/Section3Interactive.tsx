"use client";

import { useEffect, useRef, useState } from "react";

import ArticleCard7 from "@/components/cards/ArticleCard7";
import SwiperDynamic from "@/components/shared/SwiperDynamic";
import { useTabs } from "@/util/useTabs";

import setting from "@/setting.json";

const tabList = [
  { id: "tab1", label: "Entertainment", slug: "Entertainment" },
  { id: "tab2", label: "Environment", slug: "Environment" },
  { id: "tab3", label: "World News", slug: "World" },
  { id: "tab4", label: "Education", slug: "Education" },
  { id: "tab5", label: "Lifestyle", slug: "Lifestyle" },
  { id: "tab6", label: "Beauty", slug: "Beauty" },
  { id: "tab7", label: "Business", slug: "Business" },
];

type CardType = {
  linkPost: string;
  img: string;
  title: string;
  readTime: string;
  classBadge1: string;
  classBadge2: string;
  badge1: string;
  badge2: string;
  linkVideo: string;
  layoutVideo: string;
  description: string;
  linkBadge: string;
};

export default function Section3Interactive() {
  const { activeTab, switchTab } = useTabs(
    "tab3",
    tabList.map((t) => t.id),
  );

  const [allNews, setAllNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const boxSwiperPaddingRef = useRef<HTMLDivElement>(null);

  // ✅ FETCH NEWS
  useEffect(() => {
    setLoading(true);

    fetch(setting.api + "/api/news/getAllNews")
      .then((res) => res.json())
      .then((u) => {
        if (u.status !== false) {
          setAllNews(u.data || []);
        } else {
          setAllNews([]);
        }
      })
      .catch((err) => {
        console.log("API Error:", err);

        setAllNews([]);
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ SWIPER SETTINGS
  const swiperParams = {
    slidesPerView: 2,
    spaceBetween: 20,
    slidesPerGroup: 1,
    centeredSlides: false,
    loop: true,

    autoplay: {
      delay: 5000,
      reverseDirection: true,
    },

    breakpoints: {
      1200: { slidesPerView: 3 },
      992: { slidesPerView: 2 },
      768: { slidesPerView: 2 },
      576: { slidesPerView: 1 },
      0: { slidesPerView: 1 },
    },

    navigation: {
      nextEl: ".swiper-btn-next",
      prevEl: ".swiper-btn-prev",
    },
  };

  // ✅ ACTIVE CATEGORY
  const activeCategory =
    tabList.find((tab) => tab.id === activeTab)?.slug || "";

  // ✅ FILTER CATEGORY NEWS
  const currentTabData: CardType[] = allNews

    .filter((item: any) =>
      item.categories?.some((cat: any) =>
        cat.name?.toLowerCase().includes(activeCategory.toLowerCase()),
      ),
    )

    .slice(0, 10)

    .map((item: any, idx: number) => ({
      linkPost: `/single-2?slug=${item.slug}`,

      img: item.thumbnail
        ? `${setting.api}/uploads/images/${item.thumbnail}`
        : "/assets/imgs/page/img-1.png",

      title: item.title || "No Title",

      readTime: "5 mins read",

      classBadge1: `bg-${(idx % 5) + 1}`,

      classBadge2: "bg-dark",

      badge1: item.categories?.[0]?.name || "News",

      badge2: "Trending",

      linkVideo: item.youtubeUrl || "",

      layoutVideo: item.youtubeUrl ? "d-flex" : "d-none",

      description: item.subtitle || "No Description",

      linkBadge: "#",
    }));

  return (
    <div className="row">
      {/* ✅ LEFT TABS */}
      <div className="col-lg-3">
        <ul className="nav nav-tabs d-flex flex-lg-column flex-row flex-wrap ps-0 ps-lg-5">
          {tabList.map((tab) => (
            <li className="nav-item" key={tab.id}>
              <a
                href="#"
                className={`nav-link${activeTab === tab.id ? " active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  switchTab(tab.id);
                }}
                role="tab"
                aria-selected={activeTab === tab.id}
                tabIndex={activeTab === tab.id ? 0 : -1}
              >
                {tab.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ RIGHT CONTENT */}
      <div className="col-lg-9">
        <div className="box-swiper-padding" ref={boxSwiperPaddingRef}>
          {loading ? (
            <div className="text-center py-5">Loading...</div>
          ) : currentTabData.length > 0 ? (
            <SwiperDynamic className="swiper slider-3" {...swiperParams}>
              {currentTabData.map((card, idx) => (
                <div key={idx}>
                  <ArticleCard7 card={card} idx={idx} />
                </div>
              ))}
            </SwiperDynamic>
          ) : (
            <div className="text-center py-5">No Posts Found</div>
          )}
        </div>
      </div>
    </div>
  );
}
