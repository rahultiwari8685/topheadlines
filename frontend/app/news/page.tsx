import type { Metadata } from "next";
import Layout from "@/components/layout/Layout";
import SingleNewsClient from "./SingleNewsClient";
import setting from "@/setting.json";

type PageProps = {
  searchParams: {
    slug?: string;
  };
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const slug = searchParams.slug;

  if (!slug) {
    return {
      title: "Top Headlines News",
      description: "Latest News",
    };
  }

  try {
    const res = await fetch(`${setting.api}/api/news/slug/${slug}`, {
      cache: "no-store",
    });

    const result = await res.json();
    const news = result.data;

    if (!news) {
      return {
        title: "News Not Found",
        description: "News not found",
      };
    }

    const image = news.thumbnail
      ? news.thumbnail.startsWith("http")
        ? news.thumbnail
        : `${setting.api}/uploads/images/${news.thumbnail}`
      : "https://topheadlinesnews.com/assets/imgs/template/logo/TH_Logo.png";

    // const url = `https://topheadlinesnews.com/news?slug=${slug}`;

    const url = `https://topheadlinesnews.com/${category}/${slug}`;

    return {
      title: news.title,
      description: news.subtitle,

      openGraph: {
        title: news.title,
        description: news.subtitle,
        url,
        siteName: "Top Headlines News",
        type: "article",
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: news.title,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: news.title,
        description: news.subtitle,
        images: [image],
      },
    };
  } catch (error) {
    return {
      title: "Top Headlines News",
      description: "Latest News",
    };
  }
}

export default function Page() {
  return <SingleNewsClient />;
}
