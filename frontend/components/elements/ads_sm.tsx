"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import setting from "../../setting.json";

interface Advertisement {
  _id: string;
  title: string;
  type: "image" | "video" | "html";
  image: string;
  video: string;
  htmlCode: string;
  redirectUrl: string;
  position: string;
  priority: number;
  width: number;
  height: number;
  totalViews: number;
  totalClicks: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Ads_sm() {
  const [ad, setAd] = useState<Advertisement | null>(null);

  useEffect(() => {
    const fetchAdvertisement = async () => {
      try {
        const res = await fetch(
          `${setting.api}/api/advertisements?position=homepage_top`,
        );
        const data = await res.json();

        if (data.success && data.data.length > 0) {
          setAd(data.data[0]);
        }
      } catch (err) {
        console.error("Advertisement Error:", err);
      }
    };

    fetchAdvertisement();
  }, []);

  if (!ad) return null;

  return (
    <div className="banner-ads">
      <a href={ad.redirectUrl} target="_blank" rel="noopener noreferrer">
        {ad.type === "image" && (
          <img
            src={`${setting.api}/uploads/images/${ad.image}`}
            alt={ad.title}
            width={1200}
            height={300}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
            }}
          />
        )}

        {ad.type === "video" && (
          <video
            controls
            autoPlay
            muted
            loop
            style={{
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <source
              src={`${setting.api}/uploads/images/${ad.video}`}
              type="video/mp4"
            />
          </video>
        )}

        {ad.type === "html" && (
          <div
            dangerouslySetInnerHTML={{
              __html: ad.htmlCode,
            }}
          />
        )}
      </a>
    </div>
  );
}
