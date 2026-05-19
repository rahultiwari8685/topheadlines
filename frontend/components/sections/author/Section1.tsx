import ArticleCard12 from "@/components/cards/ArticleCard12";
import setting from "@/setting.json";

type Props = {
  authorId: string;

  searchParams?: {
    page?: string;
  };
};

// Fetch Author News
async function getAuthorNews(authorId: string, page: number) {
  try {
    const res = await fetch(
      `${setting.api}/api/news/getAllNewsByAuthorId/${authorId}?page=${page}&limit=6`,
      {
        cache: "no-store",
      },
    );

    return res.json();
  } catch (error) {
    console.error(error);

    return {
      status: false,
      data: [],
      totalPages: 1,
    };
  }
}

export default async function Section1(props: Props) {
  const { authorId, searchParams } = props;

  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;

  // Fetch News
  const response = await getAuthorNews(authorId, currentPage);

  const newsList = response?.data || [];

  const formattedArticles = newsList.map((item: any, idx: number) => ({
    // Article Link
    linkPost: `/single-2?slug=${item.slug}`,

    // Author Link
    linkAuthor: `/page-author/${item.author?._id}`,

    // Badge Link
    linkBadge: "#",

    // Comment Link
    linkComment: "#",

    // Thumbnail
    img: item.thumbnail
      ? item.thumbnail.startsWith("http")
        ? item.thumbnail
        : `${setting.api}/uploads/images/${item.thumbnail}`
      : "/assets/imgs/page/img-66.png",

    // Category
    badge: item.categories?.[0]?.name || "News",

    bgBadge: `bg-${(idx % 5) + 1}`,

    // Title
    title: item.title || "No Title",

    // Subtitle
    description: item.subtitle || "No Description",

    // Author Image
    imgAuthor: item.author?.profileImage
      ? item.author.profileImage.startsWith("http")
        ? item.author.profileImage
        : `${setting.api}/uploads/images/${item.author.profileImage}`
      : "/assets/imgs/template/author/author-1.png",

    // Author Name
    author: item.author?.name || "Admin",

    // Date
    date: new Date(item.createdAt).toDateString(),

    // Extra
    comment: "0",

    readNum: "0",
  }));

  return (
    <section className="sec-1-author overflow-hidden">
      <div className="container">
        <div className="row mt-4 g-4">
          {formattedArticles.length > 0 ? (
            formattedArticles.map((card: any, idx: number) => (
              <div className="col-12" key={idx}>
                <ArticleCard12 card={card} idx={idx} />
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <h4>No News Found</h4>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
