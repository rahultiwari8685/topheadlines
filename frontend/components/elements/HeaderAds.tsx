// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import setting from "../../setting.json";

// interface Advertisement {
//   _id: string;
//   title: string;
//   type: "image" | "video" | "html";
//   image: string;
//   video: string;
//   htmlCode: string;
//   redirectUrl: string;
// }

// export default function HeaderAds() {
//   const [ad, setAd] = useState<Advertisement | null>(null);

//   useEffect(() => {
//     const fetchAd = async () => {
//       try {
//         const res = await fetch(
//           `${setting.api}/api/advertisements?position=homepage_top`,
//         );

//         const data = await res.json();

//         if (data.success && data.data.length > 0) {
//           setAd(data.data[0]);
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchAd();
//   }, []);

//   if (!ad) return null;

//   return (
//     <a
//       href={ad.redirectUrl}
//       target="_blank"
//       rel="noopener noreferrer"
//       style={{ display: "block" }}
//     >
//       {ad.type === "image" && (
//         <img
//           src={`${setting.api}/uploads/images/${ad.image}`}
//           alt={ad.title}
//           width={728}
//           height={90}
//           style={{
//             objectFit: "cover",
//             borderRadius: 10,
//           }}
//         />
//       )}

//       {ad.type === "video" && (
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           style={{
//             width: "100%",
//             height: "120px",
//             objectFit: "cover",
//             borderRadius: 10,
//           }}
//         >
//           <source src={`${setting.api}/uploads/images/${ad.video}`} />
//         </video>
//       )}

//       {ad.type === "html" && (
//         <div dangerouslySetInnerHTML={{ __html: ad.htmlCode }} />
//       )}
//     </a>
//   );
// }

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

export default function HeaderAds() {
  const [ad, setAd] = useState<Advertisement | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(
          `${setting.api}/api/advertisements?position=homepage_top`,
        );

        if (!res.ok) {
          throw new Error(`Advertisement request failed: ${res.status}`);
        }

        const data = await res.json();

        if (data.success && data.data?.length > 0) {
          setAd(data.data[0]);
        }
      } catch (err) {
        console.error("Advertisement error:", err);
      }
    };

    fetchAd();
  }, []);

  if (!ad) return null;

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        overflow: "hidden",
        margin: "0 auto",
        borderRadius: "10px",
      }}
    >
      {ad.type === "image" && (
        <a
          href={ad.redirectUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            width: "100%",
            lineHeight: 0,
          }}
        >
          <img
            src={`${setting.api}/uploads/images/${ad.image}`}
            alt={ad.title}
            style={{
              display: "block",
              width: "100%",
              maxWidth: "100%",
              height: "auto",
              objectFit: "contain",
              borderRadius: "10px",
            }}
          />
        </a>
      )}

      {ad.type === "video" && (
        <a
          href={ad.redirectUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            width: "100%",
            lineHeight: 0,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              aspectRatio: "728 / 90",
              objectFit: "contain",
              borderRadius: "10px",
            }}
          >
            <source src={`${setting.api}/uploads/images/${ad.video}`} />
          </video>
        </a>
      )}

      {ad.type === "html" && (
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            overflow: "hidden",
          }}
          dangerouslySetInnerHTML={{ __html: ad.htmlCode }}
        />
      )}
    </div>
  );
}
