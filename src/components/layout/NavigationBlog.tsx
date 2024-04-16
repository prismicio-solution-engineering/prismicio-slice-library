"use client";

import algoliasearch from "algoliasearch/lite";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { InstantSearch } from "react-instantsearch-dom";

import SearchIcon from "@/assets/svg/search.svg";
import CustomConsent from "@/components/sections/CustomConsentModal";
import { GuideNav } from "@/components/sections/GuideNav";
import SearchBox from "@/components/ui/SearchBox";
import SearchHits from "@/components/ui/SearchHits";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { GuideNavProps } from "@/lib/types";
import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY!
);

type NavigationBlogProps = {
  navigation: Content.LayoutDocumentData["blog_navigation"];
  guide?: GuideNavProps;
};

export const NavigationBlog = ({ navigation, guide }: NavigationBlogProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [showHits, setShowHits] = useState(false);
  const [algoliaConsent, setAlgoliaConsent] = useState(false);
  const { consentData } = usePrismicAnalytics();
  const [consentLayerOpen, setConsentLayerOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  useEffect(() => {
    if (searchOpen) {
      document.querySelector<HTMLInputElement>(".blog-search")?.focus();
      setShowHits(true);
    }
  }, [searchOpen]);

  const pathname = usePathname();
  const savedPathNameRef = useRef(pathname);

  useEffect(() => {
    if (savedPathNameRef.current !== pathname) {
      setSearchOpen(false);
      setShowHits(false);

      savedPathNameRef.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    if (consentData) {
      setAlgoliaConsent(consentData.Algolia);
    }
  }, [consentData]);

  return (
    <div className="sticky z-30 top-0 w-full">
      <div className="py-6 border-b border-gray-EE bg-white relative z-20">
        <div
          className={clsx(
            "container flex items-center relative justify-between",
            {
              "gap-2": !searchOpen,
              "md:gap-2": searchOpen
            }
          )}
        >
          <div
            className={clsx("overflow-hidden relative transition-all", {
              "w-0 md:w-auto": searchOpen,
              "w-auto": !searchOpen
            })}
          >
            <div className="absolute top-0 bottom-0 right-0 w-10 h-10 bg-gradient-to-r from-transparent to-white z-10" />
            <div className="relative overflow-x-auto overflow-y-hidden py-2">
              <div className="flex z-30 gap-6 items-center bg-white border-gray-EE whitespace-nowrap">
                {navigation.map((navItem, index) => (
                  <PrismicNextLink
                    key={index}
                    field={navItem.link}
                    className="last:pr-10"
                  >
                    {navItem.label}
                  </PrismicNextLink>
                ))}
              </div>
            </div>
          </div>
          {algoliaConsent ? (
            <div
              className={clsx("flex justify-end transition-all", {
                "w-full lg:w-[576px]": searchOpen,
                "w-10": !searchOpen
              })}
            >
              <button className="relative z-10" onClick={toggleSearch}>
                <span className="sr-only">Search</span>
                <SearchIcon className="w-10 h-10 text-gray-A4" />
              </button>
              <InstantSearch
                searchClient={searchClient}
                indexName="prismic_blog"
              >
                <div
                  className={clsx(
                    "flex flex-col transition-all w-full -ml-10",
                    {
                      "opacity-0 pointer-events-none": !searchOpen
                    }
                  )}
                >
                  <SearchBox />
                  <AnimatePresence>
                    {showHits && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 0 }}
                      >
                        <SearchHits />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </InstantSearch>
            </div>
          ) : (
            <>
              <button
                className="relative z-10"
                onClick={() => setConsentLayerOpen(true)}
              >
                <span className="sr-only">Search</span>
                <SearchIcon className="w-10 h-10 text-gray-A4" />
              </button>
              <CustomConsent
                isOpen={consentLayerOpen}
                onClose={() => setConsentLayerOpen(false)}
                heading="We need your consent to load Algolia search service!"
                copy="We use a third party service to enable search functionality on our website that may collect data about your activity. Please review the details and accept the service to enable search functionality."
                service="tnfBi7gwe"
              />
            </>
          )}
        </div>
      </div>
      <GuideNav data={guide} />
    </div>
  );
};
