import setting from "@/setting.json";

export async function GET() {
  try {
    // Fetch latest news from backend
    const response = await fetch(`${setting.api}/api/news/news-sitemap`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return new Response("Unable to fetch news.", {
        status: 500,
      });
    }

    const result = await response.json();
    const posts = result.data || [];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">

${posts
  .map(
    (post) => `
  <url>
    <loc>${setting.site}/news/${post.slug}</loc>

    <news:news>
      <news:publication>
        <news:name>${setting.Name}</news:name>
        <news:language>hi</news:language>
      </news:publication>

      <news:publication_date>${new Date(
        post.createdAt,
      ).toISOString()}</news:publication_date>

      <news:title><![CDATA[${post.title}]]></news:title>
    </news:news>
  </url>`,
  )
  .join("")}

</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=UTF-8",
      },
    });
  } catch (error) {
    console.error("News Sitemap Error:", error);

    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<error>
  <message>${error.message}</message>
</error>`,
      {
        status: 500,
        headers: {
          "Content-Type": "application/xml; charset=UTF-8",
        },
      },
    );
  }
}
