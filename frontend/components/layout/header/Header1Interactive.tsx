"use client";

import SwiperDynamic from "@/components/shared/SwiperDynamic";
import useSidebarMenu from "@/util/useSidebarMenu";
import { useScrollState } from "@/util/useScrollState";
import PopupSearch from "@/components/layout/cardPopupSearchServer";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import setting from "../../../setting.json";

interface TrendingNews {
  _id: string;
  title: string;
  slug: string;
}

export default function Header1Interactive({
  initialTrending,
}: {
  initialTrending: TrendingNews[];
}) {
  const scroll = useScrollState();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);

  interface TrendingNews {
    _id: string;
    title: string;
    slug: string;
    reverseDirection?: boolean;
  }

  const [trendingNews] = useState<TrendingNews[]>(initialTrending);

  const tickerItems = [...trendingNews, ...trendingNews];

  const { toggleSidebar } = useSidebarMenu();
  const searchBtnRef = useRef<Element | null>(null);
  const navbarTogglerRef = useRef<Element | null>(null);
  const navbarRef = useRef<Element | null>(null);
  const initialNavbarStylesRef = useRef<{
    transition: string;
    transform: string;
  } | null>(null);

  // Handle search button click
  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    searchBtnRef.current = document.querySelector(".search-btn");
    const searchBtn = searchBtnRef.current;

    const handleSearchClick = (e: Event) => {
      e.preventDefault();
      setIsSearchOpen(true);
    };

    if (searchBtn) {
      searchBtn.addEventListener("click", handleSearchClick);
    }

    return () => {
      if (searchBtn) {
        searchBtn.removeEventListener("click", handleSearchClick);
      }
    };
  }, []);

  // Handle sidebar toggle
  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    navbarTogglerRef.current = document.querySelector(".navbar-toggler");
    const navbarToggler = navbarTogglerRef.current;

    const handleNavbarToggle = (e: Event) => {
      e.preventDefault();
      toggleSidebar(true);
    };

    if (navbarToggler) {
      navbarToggler.addEventListener("click", handleNavbarToggle);
    }

    return () => {
      if (navbarToggler) {
        navbarToggler.removeEventListener("click", handleNavbarToggle);
      }
    };
  }, [toggleSidebar]);

  useEffect(() => {
    const stickyClasses = ["navbar-stick", "top-0", "position-fixed", "w-100"];

    if (!navbarRef.current) {
      // eslint-disable-next-line no-restricted-globals
      navbarRef.current = document.querySelector("header .navbar");
    }

    const navbar = navbarRef.current as HTMLElement | null;

    if (!navbar) {
      return;
    }

    stickyClasses.forEach((className) => {
      if (scroll) {
        navbar.classList.add(className);
      } else {
        navbar.classList.remove(className);
      }
    });
  }, [scroll]);

  useEffect(() => {
    if (!navbarRef.current) {
      // eslint-disable-next-line no-restricted-globals
      navbarRef.current = document.querySelector("header .navbar");
    }

    const navbar = navbarRef.current as HTMLElement | null;

    if (!navbar) {
      return;
    }

    if (!initialNavbarStylesRef.current) {
      initialNavbarStylesRef.current = {
        transition: navbar.style.transition,
        transform: navbar.style.transform,
      };
    }

    if (!navbar.style.transition) {
      navbar.style.transition = "transform 0.3s ease";
    }

    return () => {
      if (!initialNavbarStylesRef.current) {
        return;
      }

      navbar.style.transition = initialNavbarStylesRef.current.transition;
      navbar.style.transform = initialNavbarStylesRef.current.transform;
    };
  }, []);

  useEffect(() => {
    if (!navbarRef.current) {
      // eslint-disable-next-line no-restricted-globals
      navbarRef.current = document.querySelector("header .navbar");
    }

    const navbar = navbarRef.current as HTMLElement | null;

    if (!navbar) {
      return;
    }

    const defaultTransform = initialNavbarStylesRef.current?.transform ?? "";

    navbar.style.transform = isNavbarHidden
      ? "translateY(-100%)"
      : defaultTransform || "translateY(0)";
  }, [isNavbarHidden]);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    if (typeof window === "undefined") {
      return;
    }

    // eslint-disable-next-line no-restricted-globals
    let lastScrollY = window.scrollY;

    const handleScrollDirection = () => {
      // eslint-disable-next-line no-restricted-globals
      if (typeof window === "undefined") {
        return;
      }

      // eslint-disable-next-line no-restricted-globals
      const currentScrollY = window.scrollY;

      setIsNavbarHidden((prevHidden) => {
        if (currentScrollY <= 100) {
          return false;
        }

        if (currentScrollY > lastScrollY) {
          return true;
        }

        if (currentScrollY < lastScrollY) {
          return false;
        }

        return prevHidden;
      });

      lastScrollY = currentScrollY;
    };

    // eslint-disable-next-line no-restricted-globals
    window.addEventListener("scroll", handleScrollDirection, { passive: true });

    return () => {
      // eslint-disable-next-line no-restricted-globals
      if (typeof window !== "undefined") {
        // eslint-disable-next-line no-restricted-globals
        window.removeEventListener("scroll", handleScrollDirection);
      }
    };
  }, []);

  return (
    <>
      <div className="ticker">
        {trendingNews.length === 0 ? (
          <span className="ticker-item">🔴 Loading Breaking News...</span>
        ) : (
          <div className="ticker-track">
            {tickerItems.map((item, index) => (
              <Link
                key={`${item._id}-${index}`}
                href={`/news?slug=${item.slug}`}
                className="ticker-item"
              >
                🔴 {item.title}
              </Link>
            ))}
          </div>
        )}
      </div>

      <PopupSearch open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <style jsx>{`
        .ticker {
          width: 100%;
          height: 28px;
          overflow: hidden;
          display: flex;
          align-items: center;
          position: relative;
        }

        .ticker-track {
          display: flex;
          flex-wrap: nowrap;
          white-space: nowrap;
          width: max-content;
          will-change: transform;
          animation: ticker 100s linear infinite;
        }

        .ticker:hover .ticker-track {
          animation-play-state: paused;
        }

        .ticker-item {
          flex-shrink: 0;
          margin-right: 80px;
          white-space: nowrap;
          text-decoration: none;
          color: #000;
          font-size: 15px;
          font-weight: 600;
          display: flex;
          align-items: center;
        }

        .ticker-item:hover {
          color: #e30613;
        }

        :global(.dark) .ticker-item {
          color: #fff;
        }

        @keyframes ticker {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </>
  );
}
