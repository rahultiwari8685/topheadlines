import Image from "next/image";

export default function Section1() {
  return (
    <>
      {/* About section 1 */}
      <section className="sec-1-about sec-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="ds-2 mb-0">About Magzin</h2>
              <p className="fs-56 m-0">
                We are a dedicated team of creators, strategists, and specialists focused on <br className="d-none d-lg-block" />
                delivering thoughtful, high-quality work.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-12 py-5">
              <Image className="rounded-8 overflow-hidden cover-image" src="/assets/imgs/page/img-117.png" alt="magzin" width={1194} height={576} />
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-6 pe-lg-5">
              <h5 className="mb-4">What we do</h5>
              <ul className="list-unstyled m-0 p-0">
                <li className="d-flex gap-3">
                  <p className="fw-semi-bold mt-0 text-dark w-25">Curated Content</p>
                  <p className="w-75 mt-0">We deliver thoughtfully crafted articles—from trending topics to timeless advice—all written with care, creativity, and precision.</p>
                </li>
                <li className="d-flex gap-3">
                  <p className="fw-semi-bold mt-0 text-dark w-25">Expert Insights</p>
                  <p className="w-75 mt-0">Our team of writers and contributors includes experienced professionals who share actionable tips, proven strategies, and practical wisdom you can trust.</p>
                </li>
                <li className="d-flex gap-3">
                  <p className="fw-semi-bold mt-0 text-dark w-25">Community</p>
                  <p className="w-75 mt-0">We're more than a platform—we're a space for connection. We believe in the power of shared stories, ideas, and voices. Join us and be part of something meaningful.</p>
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <h5 className="mb-4">Our Values</h5>
              <ul className="list-unstyled m-0 p-0">
                <li className="d-flex gap-3">
                  <p className="fw-semi-bold mt-0 text-dark w-25">Inspiration</p>
                  <p className="w-75 mt-0">We aim to inspire and empower our readers—personally and professionally—by providing meaningful tools, resources, and insights that spark growth and purpose.</p>
                </li>
                <li className="d-flex gap-3">
                  <p className="fw-semi-bold mt-0 text-dark w-25">Authenticity</p>
                  <p className="w-75 mt-0">We believe in being real. Our content is honest, transparent, and grounded in genuine experiences that resonate with our audience.</p>
                </li>
                <li className="d-flex gap-3">
                  <p className="fw-semi-bold mt-0 text-dark w-25">Creativity</p>
                  <p className="w-75 mt-0">We thrive on fresh ideas and original thinking. Creativity is at the heart of everything we do—from storytelling to design.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
