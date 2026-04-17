import ArticleCard7 from "@/components/cards/ArticleCard7";
import Link from "next/link";

interface Section1Props {
  searchParams?: Promise<{ page?: string; category?: string }>;
}

// ✅ Define API News Type
type NewsItem = {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  thumbnail: string;
  categories?: { name: string }[];
};

// ✅ Define Card Type (ArticleCard7 compatible)
type CardType = {
  title: string;
  img: string;
  description: string;
  linkPost: string;
  badge1: string;
  readTime: string;
};

export default async function Section1({ searchParams }: Section1Props) {
  const resolvedSearchParams = await searchParams;

  const currentPage = resolvedSearchParams?.page
    ? parseInt(resolvedSearchParams.page)
    : 1;

  const categoryId = resolvedSearchParams?.category || "";
  const itemsPerPage = 6;

  // ✅ Fetch API
  let news: NewsItem[] = [];
  let totalPages = 1;

  try {
    const res = await fetch(
      `https://api.iotaclasses.in/api/news/category/${categoryId}?page=${currentPage}&limit=${itemsPerPage}`,
      { cache: "no-store" }
    );

    const data = await res.json();

    news = data.data || [];
    totalPages = data.totalPages || 1;
  } catch (error) {
    console.error("Fetch Error:", error);
  }

const cards = news.map((item: any) => ({
  title: item.title,
  img: item.thumbnail
    ? `https://api.iotaclasses.in/uploads/images/${item.thumbnail}`
    : "/assets/imgs/default.jpg",

  description: item.subtitle || "",
  linkPost: `/news/${item.slug}`,

  badge1: item.categories?.[0]?.name || "News",
  badge2: "",

  classBadge1: "bg-1",
  classBadge2: "bg-2",

  readTime: "5 min read",

  linkVideo: "#",
  layoutVideo: "d-none",

  linkBadge: `/archive-1?category=${item.categories?.[0]?._id || ""}`,
}));

  // ✅ Pagination Component
  const ServerPagination = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i} className={`page-item ${i === currentPage ? "active" : ""}`}>
          <Link
            href={`/archive-1?category=${categoryId}&page=${i}`}
            className="page-link icon-lg pagination_item rounded-circle icon-shape fs-18 fw-semi-bold"
          >
            {i}
          </Link>
        </li>
      );
    }

    return (
      <nav>
        <ul className="pagination">
          {currentPage > 1 && (
            <li className="page-item">
              <Link
                href={`/archive-1?category=${categoryId}&page=${currentPage - 1}`}
                className="page-link"
              >
                Prev
              </Link>
            </li>
          )}

          {pages}

          {currentPage < totalPages && (
            <li className="page-item">
              <Link
                href={`/archive-1?category=${categoryId}&page=${currentPage + 1}`}
                className="page-link"
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
    <section className="sec-1-archive-1">
      <div className="container">

        {/* ✅ News List */}
        <div className="row mt-4 g-4">
          {cards.length > 0 ? (
            cards.map((card, idx) => (
              <div className="col-lg-4" key={idx}>
                <ArticleCard7 card={card} idx={idx} />
              </div>
            ))
          ) : (
            <p>No News Found</p>
          )}
        </div>

        {/* ✅ Pagination */}
        <div className="row mt-5">
          <div className="col-12 d-flex justify-content-center">
            <ServerPagination />
          </div>
        </div>

      </div>
    </section>
  );
}