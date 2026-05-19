import Layout from "@/components/layout/Layout";
import Section1 from "@/app/page-author/[id]/page";
import Section2 from "@/components/sections/home-4/Section6";
import Ads from "@/components/elements/ads";
import Image from "next/image";

import setting from "@/setting.json";

interface Props {
  params: {
    id: string;
  };

  searchParams: {
    page?: string;
  };
}

// Fetch Author
async function getAuthor(id: string) {
  try {
    const res = await fetch(
      `${setting.api}/api/users/getUserDetailsById/${id}`,
      {
        cache: "no-store",
      },
    );

    return res.json();
  } catch (error) {
    console.error("Author Fetch Error:", error);

    return {
      success: false,
      data: null,
    };
  }
}

export default async function Page_Author({ params, searchParams }: Props) {
  const authorId = params.id;

  // Fetch Author
  const response = await getAuthor(authorId);

  const author = response?.data;

  return (
    <>
      <Layout headerStyle={2} footerStyle={2}>
        {/* Author Profile */}
        <div className="container pt-100">
          <div className="row">
            <div className="col-lg-6 col-md-8 mx-auto">
              <div className="card shadow border-0 rounded-4 p-4">
                {/* Author Image */}
                <div className="card-img mb-4 text-center">
                  <Image
                    className="rounded-circle avatar-154"
                    src={
                      author?.profileImage
                        ? author.profileImage.startsWith("http")
                          ? author.profileImage
                          : `${setting.api}/uploads/images/${author.profileImage}`
                        : "/assets/imgs/template/author/author-19.png"
                    }
                    alt={author?.name || "author"}
                    width={200}
                    height={200}
                  />
                </div>

                {/* Author Details */}
                <div className="card-body text-center">
                  {/* Name */}
                  <h3 className="mb-3">{author?.name || "Admin"}</h3>

                  {/* Bio */}
                  <p className="mb-0 fs-7">
                    {author?.bio || "Latest news updates and trending stories."}
                  </p>

                  {/* Extra Info */}
                  <div className="mt-4">
                    {author?.email && (
                      <p>
                        <strong>Email:</strong> {author.email}
                      </p>
                    )}

                    {author?.phone && (
                      <p>
                        <strong>Phone:</strong> {author.phone}
                      </p>
                    )}

                    {author?.role && (
                      <p>
                        <strong>Role:</strong> {author.role}
                      </p>
                    )}
                  </div>

                  {/* Social Links */}
                  <div
                    className="d-inline-flex group-social-icons bg-transparent mt-3"
                    id="toppagination"
                  >
                    {/* Facebook */}
                    {author?.facebook && (
                      <a
                        href={author.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-shape icon-46"
                      >
                        <i className="bi bi-facebook"></i>
                      </a>
                    )}

                    {/* Twitter */}
                    {author?.twitter && (
                      <a
                        href={author.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-shape icon-46"
                      >
                        <i className="bi bi-twitter-x"></i>
                      </a>
                    )}

                    {/* Linkedin */}
                    {author?.linkedin && (
                      <a
                        href={author.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="icon-shape icon-46"
                      >
                        <i className="bi bi-linkedin"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ads */}
        <Ads />

        {/* Author News Section */}
        <Section1 authorId={authorId} searchParams={searchParams} />

        {/* More Section */}
        <Section2 />
      </Layout>
    </>
  );
}
