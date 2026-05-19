import ArticleCard12 from "@/components/cards/ArticleCard12";
import Link from "next/link";
import setting from "../../../setting.json";

interface Section1Props {
  authorId: string;

  searchParams?: {
    page?: string;
  };
}

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
    console.error("Author News Fetch Error:", error);

    return {
      status: false,
      data: [],
      totalPages: 1,
    };
  }
}

export default async function Section1({
  authorId,
  searchParams,
}: Section1Props) {
  // FIXED
  const currentPage = searchParams?.page ? parseInt(searchParams.page) : 1;

  // Fetch Dynamic News
  const response = await getAuthorNews(authorId, currentPage);

  const newsList = response?.data || [];

  const totalPages = response?.totalPages || 1;

  // Format Data
  const formattedArticles = newsList.map((item: any, idx: number) => ({
    linkPost: `/single-2?slug=${item.slug}`,

    linkBadge: "#",

    linkAuthor: `/page-author/${item.author?._id}`,

    linkComment: "#",

    img: item.thumbnail
      ? item.thumbnail.startsWith("http")
        ? item.thumbnail
        : `${setting.api}/uploads/images/${item.thumbnail}`
      : "/assets/imgs/page/img-66.png",

    badge: item.categories?.[0]?.name || "News",

    bgBadge: `bg-${(idx % 5) + 1}`,

    title: item.title || "No Title",

    description: item.subtitle || "No Description",

    imgAuthor: item.author?.profileImage
      ? item.author.profileImage.startsWith("http")
        ? item.author.profileImage
        : `${setting.api}/uploads/images/${item.author.profileImage}`
      : "/assets/imgs/template/author/author-1.png",

    author: item.author?.name || "Admin",

    date: new Date(item.createdAt).toDateString(),

    comment: "0",

    readNum: "0",
  }));

  // Pagination
  const ServerPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? "active" : ""}`}
        >
          <Link
            href={`/page-author/${authorId}?page=${i}`}
            className="page-link icon-lg pagination_item rounded-circle icon-shape fs-18 fw-semi-bold"
          >
            {i}
          </Link>
        </li>,
      );
    }

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination">
          {/* Previous */}
          {currentPage > 1 && (
            <li className="page-item">
              <Link
                href={`/page-author/${authorId}?page=${currentPage - 1}`}
                className="page-link icon-lg pagination_item rounded-circle icon-shape"
              >
                Prev
              </Link>
            </li>
          )}

          {pages}

          {/* Next */}
          {currentPage < totalPages && (
            <li className="page-item">
              <Link
                href={`/page-author/${authorId}?page=${currentPage + 1}`}
                className="page-link icon-lg pagination_item rounded-circle icon-shape"
              >
                Next
              </Link>
            </li>
          )}
        </ul>
      </nav>
    );
  };

  return (
    <>
      {/* Author Section */}
      <section className="sec-1-author overflow-hidden">
        <div className="container">
          {/* News List */}
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

          {/* Pagination */}
          <div className="row sec-padding">
            <div className="col-12 d-flex justify-content-center align-items-center">
              <ServerPagination />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
