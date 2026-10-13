"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import setting from "../../setting.json";

interface Advertisement {
  _id: string;
  title: string;
  type: "image" | "video" | "html";
  image: string;
  video: string;
  htmlCode: string;
  redirectUrl: string;
}

export default function HeaderAds() {
  const [ad, setAd] = useState<Advertisement | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(
          `${setting.api}/api/advertisements?position=homepage_top`,
        );

        const data = await res.json();

        if (data.success && data.data.length > 0) {
          setAd(data.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchAd();
  }, []);

  if (!ad) return null;

  return (
    <a
      href={ad.redirectUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "block" }}
    >
      {ad.type === "image" && (
        <img
          src={`${setting.api}/uploads/images/${ad.image}`}
          alt={ad.title}
          width={728}
          height={90}
          style={{
            objectFit: "cover",
            borderRadius: 10,
          }}
        />
      )}

      {ad.type === "video" && (
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "120px",
            objectFit: "cover",
            borderRadius: 10,
          }}
        >
          <source src={`${setting.api}/uploads/images/${ad.video}`} />
        </video>
      )}

      {ad.type === "html" && (
        <div dangerouslySetInnerHTML={{ __html: ad.htmlCode }} />
      )}
    </a>
  );
}
