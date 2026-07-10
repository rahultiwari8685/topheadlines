import type { Metadata } from "next";
import SingleNewsClient from "./SingleNewsClient";
import setting from "@/setting.json";

type PageProps = {
  params: Promise<{
    category: string;
    slug: string;
  }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, slug } = await params;

  const res = await fetch(`${setting.api}/api/news/slug/${slug}`, {
    cache: "no-store",
  });

  const result = await res.json();
  const news = result.data;

  if (!news) {
    return {
      title: "News Not Found",
    };
  }

  const image = news.thumbnail
    ? news.thumbnail.startsWith("http")
      ? news.thumbnail
      : `${setting.api}/uploads/images/${news.thumbnail}`
    : `${setting.site}/assets/imgs/template/logo/TH_Logo.png`;

  const url = `${setting.site}/${category}/${slug}`;

  return {
    title: news.title,
    description: news.subtitle,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: news.title,
      description: news.subtitle,
      url,
      images: [image],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { category, slug } = await params;

  return <SingleNewsClient slug={slug} category={category} />;
}
