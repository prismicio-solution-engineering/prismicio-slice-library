"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import CloseIcon from "@/assets/svg/close.svg";
import { asText, Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicLink } from "@prismicio/react";

import type { SliceZoneContext } from "@/lib/types";
type BannerProps = {
  banners: Content.BannerDocument[];
  page: string;
  theme: SliceZoneContext["theme"];
};

export const Banners = ({ banners, page, theme }: BannerProps) => {
  // Keep track of which banners a user has closed
  const [closedBanners, setClosedBanners] = useState<string[]>([]);
  // Keep track of whether the component has loaded
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Load the closed banners from users local storage
    const storedBanners = localStorage.getItem("closedBanners");

    // If there are closed banners, set them in state
    if (storedBanners) {
      setClosedBanners(JSON.parse(storedBanners));
    }

    // Set the component as loaded
    setLoaded(true);
  }, []);

  // If the component hasn't loaded, return null
  if (!loaded) return null;

  // When a user closes a banner, add it to the closedBanners array together with the previous closed banners and save it to local storage
  const handleClose = (id: string) => {
    const newClosedBanners = [...closedBanners, id];
    setClosedBanners(newClosedBanners);
    localStorage.setItem("closedBanners", JSON.stringify(newClosedBanners));
  };

  // Map through the and create an array of objects with the banner id, if its contextual, and the pages it should be shown or hidden on
  const bannerInfo = banners.flatMap((banner) => {
    const pageIds = banner.data.pages.flatMap((page) => {
      const linkedPage = page.page as any as Content.AllDocumentTypes;
      const hasPages =
        isFilled.group(banner.data.pages) &&
        isFilled.contentRelationship(page.page);

      return hasPages ? linkedPage.id : [];
    });

    return {
      id: banner.id,
      include: banner.data.contextual,
      pages: pageIds
    };
  });

  // Filter the banners based on the pages they should be shown on and if they have been closed
  const filteredBanners = bannerInfo.filter(
    (banner) =>
      !closedBanners.includes(banner.id) &&
      (banner.include
        ? banner.pages.includes(page!)
        : !banner.pages.includes(page!))
  );

  return (
    <div className="px-3 flex flex-col">
      <AnimatePresence initial={false}>
        {filteredBanners.map((banner) => {
          const bannerContent = banners.find((b) => b.id === banner.id);

          return (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              key={bannerContent!.id}
              className="group"
            >
              <div
                className={clsx(
                  "flex items-center justify-center p-3 pr-12 border rounded-md gap-2 mt-1.5 group-first:mt-3 relative",
                  {
                    "bg-gray-F7 border-gray-EE": theme === "light",
                    "bg-gray-1F border-gray-30": theme === "dark"
                  }
                )}
              >
                <div>
                  {isFilled.image(bannerContent!.data.avatar) && (
                    <PrismicNextImage
                      field={bannerContent!.data.avatar}
                      className="rounded-full w-8 h-8 inline-block mr-2"
                    />
                  )}
                  {isFilled.keyText(bannerContent!.data.tag) && (
                    <span
                      className={clsx(
                        "text-xs mr-2 -translate-y-0.5 inline-block font-headings py-0.5 px-2.5 rounded-full text-white whitespace-nowrap",
                        {
                          "bg-primary-purple":
                            bannerContent!.data.tag_color === "purple",
                          "bg-primary-blue":
                            bannerContent!.data.tag_color === "blue",
                          "bg-primary-green":
                            bannerContent!.data.tag_color === "green",
                          "bg-primary-orange":
                            bannerContent!.data.tag_color === "orange",
                          "bg-primary-pink":
                            bannerContent!.data.tag_color === "pink"
                        }
                      )}
                    >
                      {bannerContent!.data.tag}
                    </span>
                  )}
                  <span
                    className={clsx({
                      "text-gray-50": theme === "light",
                      "text-gray-A4": theme === "dark"
                    })}
                  >
                    {asText(bannerContent!.data.message)}
                  </span>
                  {isFilled.link(bannerContent!.data.link) && (
                    <PrismicLink
                      field={bannerContent!.data.link}
                      className="ml-2 underline underline-offset-8 focus:ring-4 hover:underline-offset-4"
                    >
                      {bannerContent!.data.link_label}
                    </PrismicLink>
                  )}
                </div>

                <button
                  onClick={() => handleClose(bannerContent!.id)}
                  className="w-12 h-12 p-3 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  <CloseIcon className="w-6 h-6 pointer-events-none" />
                  <span className="sr-only">Close</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
