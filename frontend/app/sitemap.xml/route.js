import setting from "@/setting.json";

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>

<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<sitemap>
<loc>${setting.site}/news-sitemap.xml</loc>
</sitemap>

<sitemap>
<loc>${setting.site}/post-sitemap.xml</loc>
</sitemap>

<sitemap>
<loc>${setting.site}/category-sitemap.xml</loc>
</sitemap>

</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
