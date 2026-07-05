import setting from "@/setting.json";

export async function GET() {
  const robots = `User-agent: *

Allow: /

Sitemap: ${setting.site}/sitemap.xml`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
