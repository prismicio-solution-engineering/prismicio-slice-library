"use client";

import clsx from "clsx";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import BlogLogoWords from "@/assets/svg/blog-logo-words.svg";
import Logo from "@/assets/svg/logo.svg";
import { MenuToggle } from "@/components/ui/MenuToggle";
import { useNavigationEvent } from "@/lib/hooks/useNavigationEvent";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import { Content } from "@prismicio/client";

import { NavigationBlog } from "./NavigationBlog";
import { NavigationDefault } from "./NavigationDefault";

import type { GuideNavProps, SliceZoneContext } from "@/lib/types";

type HeaderProps = {
  layout: Content.LayoutDocument;
  nav?: "landing" | "shows" | "blog" | "hr";
  theme?: SliceZoneContext["theme"];
  guide?: GuideNavProps;
  children?: React.ReactNode;
};

export const Header = ({
  layout,
  nav,
  theme,
  guide,
  children
}: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenuItem, setOpenMenuItem] = useState<null | number>(null);
  const { width } = useWindowSize();
  const [mobileNavPositionTop, setMobileNavPositionTop] = useState(0);
  const siteHeader = useRef<HTMLHeadingElement>(null);
  const layoutTheme = theme ? theme : "light";

  useEffect(() => {
    const headerHeight = siteHeader.current?.clientHeight || 0;
    const bannerHeight =
      document.querySelector("#siteBanner")?.clientHeight || 0;
    const fullHeight = headerHeight + bannerHeight;

    setMobileNavPositionTop(headerHeight + bannerHeight);

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop >= fullHeight) {
        setMobileNavPositionTop(headerHeight);
      } else if (scrollTop < headerHeight) {
        setMobileNavPositionTop(fullHeight - scrollTop);
      } else if (scrollTop < fullHeight) {
        setMobileNavPositionTop(headerHeight);
      } else {
        setMobileNavPositionTop(fullHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [width]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (menuOpen) {
      document.querySelector("html")?.classList.add("overflow-hidden");
    } else {
      document.querySelector("html")?.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);

  const toggleSubMenu = (index: number) => {
    if (openMenuItem === index) {
      setOpenMenuItem(null);
    } else {
      setOpenMenuItem(index);
    }
  };

  const onRouteChangeStart = useCallback(() => {
    setMenuOpen(false);
    document.querySelector("html")?.classList.remove("overflow-hidden");
  }, []);

  useNavigationEvent(() => onRouteChangeStart);

  return (
    <>
      <header
        ref={siteHeader}
        className={clsx(
          "top-0 z-40 py-6 lg:py-0 bg-white dark:bg-gray-15 dark:text-white print:hidden",
          {
            sticky: nav !== "blog",
            relative: nav === "blog"
          }
        )}
      >
        <span className="z-20 border-b w-full absolute bottom-0 left-0 border-[#EEEEEE] dark:border-[#505050]" />
        <div className="container flex items-center justify-between">
          <div className="absolute left-0 top-0 bottom-0 bg-white dark:bg-gray-15 z-10 w-1/12 2xl:w-2/12" />
          <div className="absolute right-0 top-0 bottom-0 bg-white dark:bg-gray-15 z-10 w-1/12 2xl:w-2/12" />
          <div className="relative flex items-center z-10 bg-white self-stretch dark:bg-gray-15 lg:pr-8">
            <Link
              href={nav === "hr" ? "/hr/welcome-to-prismic" : "/"}
              className="rounded-md focus:outline-none lg:py-[34px]"
            >
              <Logo className="h-7 w-auto" title="Prismic Logotype" />
            </Link>
            {nav === "blog" && (
              <Link
                href="/blog"
                className="ml-2 text-2xl font-medium font-headings text-gray-50 block"
              >
                <BlogLogoWords title="Prismic Blog Logotype" />
              </Link>
            )}
          </div>
          <MenuToggle onClick={toggleMenu} isOpen={menuOpen} />
          <nav
            className={clsx(
              "fixed flex-grow overflow-auto bottom-0 max-lg:transition-all lg:transition-opacity duration-200 right-0 lg:w-auto lg:p-0 border-l lg:border-none flex flex-col lg:items-center lg:flex-row lg:static lg:space-x-8 bg-white dark:bg-gray-15 border-[#EEEEEE] dark:border-[#505050]",
              menuOpen
                ? "opacity-100 w-full mr-0"
                : "opacity-0 w-full pointer-events-none lg:opacity-100 lg:pointer-events-auto lg:w-auto lg:mr-0",
              {
                "lg:justify-end": nav === "landing" || nav === "shows"
              }
            )}
            style={{
              top: mobileNavPositionTop
            }}
          >
            {(!nav || nav === "blog") && (
              <NavigationDefault
                onSubMenuClose={() => setOpenMenuItem(null)}
                onSubMenuOpen={toggleSubMenu}
                theme={layoutTheme}
                layout={layout}
                openMenuItem={openMenuItem}
              />
            )}
            {children}
          </nav>
        </div>
      </header>
      {nav === "blog" && (
        <NavigationBlog
          navigation={layout.data.blog_navigation}
          guide={guide}
        />
      )}
    </>
  );
};
