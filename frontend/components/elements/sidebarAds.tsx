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
}

export default function SidebarAds() {
  const [adE, setAdE] = useState<Advertisement | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(
          `${setting.api}/api/advertisements?position=sidebar`,
        );

        if (!res.ok) return;

        const data = await res.json();

        if (data.success && data.data?.length > 0) {
          setAdE(data.data[0]);
        }
      } catch (error) {
        console.error("Article ad error:", error);
      }
    };

    fetchAd();
  }, []);

  if (!adE) return null;

  const content = (
    <>
      {adE.type === "image" && (
        <img
          src={`${setting.api}/uploads/images/${adE.image}`}
          alt={adE.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      )}

      {adE.type === "video" && (
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        >
          <source src={`${setting.api}/uploads/images/${adE.video}`} />
        </video>
      )}

      {adE.type === "html" && (
        <div
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
          dangerouslySetInnerHTML={{ __html: adE.htmlCode }}
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
      }}
    >
      {adE.redirectUrl ? (
        <a
          href={adE.redirectUrl}
          target="_blank"
          rel="noopener noreferrer"
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
