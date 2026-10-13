"use client";

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
  position?: string;
  priority?: number;
  width?: number;
  height?: number;
  totalViews?: number;
  totalClicks?: number;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export default function ArticleCardAd() {
  const [ad, setAd] = useState<Advertisement | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(
          `${setting.api}/api/advertisements?position=sidebar`,
        );

        if (!res.ok) return;

        const data = await res.json();

        if (data.success && data.data?.length > 0) {
          setAd(data.data[0]);
        }
      } catch (error) {
        console.error("Article ad error:", error);
      }
    };

    fetchAd();
  }, []);

  if (!ad) return null;

  const content = (
    <>
      {ad.type === "image" && ad.image && (
        <img
          src={`${setting.api}/uploads/images/${ad.image}`}
          alt={ad.title || "Advertisement"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      )}

      {ad.type === "video" && ad.video && (
        <video
          autoPlay
          muted
          loop
          playsInline
          controls
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        >
          <source
            src={`${setting.api}/uploads/images/${ad.video}`}
            type="video/mp4"
          />
          Your browser does not support video playback.
        </video>
      )}

      {ad.type === "html" && ad.htmlCode && (
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
          dangerouslySetInnerHTML={{ __html: ad.htmlCode }}
        />
      )}
    </>
  );

  return (
    <div
      className="article-card-ad"
      style={{
        width: "300px",
        maxWidth: "100%",
        height: "250px",
        margin: "16px auto",
        overflow: "hidden",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {ad.redirectUrl ? (
        <a
          href={ad.redirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit advertiser: ${ad.title}`}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
        >
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
