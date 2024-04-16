"use client";

import clsx from "clsx";
import { useRef, useState } from "react";

import LiveIcon from "@/assets/svg/banner-live.svg";
import ReplayIcon from "@/assets/svg/banner-replay.svg";
import CloseIcon from "@/assets/svg/close.svg";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { getCookie, setCookie } from "@/lib/context/prismic";
import useIsomorphicLayoutEffect from "@/lib/hooks/useIsomorphicLayoutEffect";
import { asText, Content, isFilled, RichTextField } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

type BannerProps = {
  data: Content.LayoutDocumentData;
  theme: SliceZoneContext["theme"];
};

export const Banner = ({ data, theme }: BannerProps) => {
  const [banner, setBanner] = useState(true);
  const now = Date.now();
  const bannerDate = data.banner_updated ? data.banner_updated : "2023-01-01";
  const lastUpdate = new Date(bannerDate).getTime();
  const siteBanner = useRef<HTMLDivElement>(null);
  const { segmentCtaEvent } = usePrismicAnalytics();

  useIsomorphicLayoutEffect(() => {
    const bannerClosed = Number(getCookie("banner-closed"));

    if (bannerClosed > lastUpdate) {
      setBanner(false);
    }
  }, []);

  const onclose = () => {
    if (!siteBanner.current) return;
    const banner = siteBanner.current;

    const bannerHeight = banner.offsetHeight;
    siteBanner.current.style.height = `${bannerHeight}px`;

    setTimeout(() => {
      banner.style.height = "0px";
    }, 10);

    setTimeout(() => {
      setBanner(false);
      setCookie("banner-closed", now, 365);
    }, 510);
  };

  return (
    <div
      id="siteBanner"
      ref={siteBanner}
      className="container text-base relative z-50 print:hidden overflow-hidden transition-all duration-300 ease-out"
    >
      {banner && (
        <div
          className={clsx(
            " font-medium text-sm sm:text-base rounded-xl flex flex-col sm:flex-row overflow-hidden relative justify-between mt-4",
            {
              "bg-primary-purple text-white": data.banner_color === "purple",
              "bg-gray-EE text-gray-30":
                data.banner_color === "grey" && theme === "light",
              "bg-gray-30 text-gray-EE":
                data.banner_color === "grey" && theme === "dark"
            }
          )}
        >
          {data.banner_tag && (
            <div
              className={clsx(
                "font-bold py-3 px-4 sm:py-4 sm:px-6 text-center flex shrink-0 items-center",
                {
                  "bg-secondary-purple": data.banner_color === "purple",
                  "bg-gray-F7":
                    data.banner_color === "grey" && theme === "light",
                  "bg-gray-50": data.banner_color === "grey" && theme === "dark"
                }
              )}
            >
              {data.banner_icon && data.banner_icon === "live" && (
                <LiveIcon className="h-6 w-6 mr-2 text-primary-purple" />
              )}
              {data.banner_icon && data.banner_icon === "replay" && (
                <ReplayIcon className="h-6 w-6 mr-2 text-primary-purple" />
              )}
              <span>{data.banner_tag}</span>
            </div>
          )}
          <div className="py-3 px-4 sm:py-4 sm:px-6 flex flex-wrap gap-x-4 gap-y-2">
            <span>{asText(data.banner_content as RichTextField)}</span>
            {isFilled.link(data.banner_link) && (
              <PrismicNextLink
                field={data.banner_link}
                className="font-bold underline inline-block underline-offset-4 hover:underline-offset-2"
                onClick={() => {
                  segmentCtaEvent("CTA Clicked", {
                    ctaType: "tertiary link",
                    ctaPosition: "banner",
                    ctaText: isFilled.keyText(data.banner_link_label)
                      ? data.banner_link_label
                      : "",
                    ctaUrl: isFilled.link(data.banner_link)
                      ? data.banner_link.url
                      : ""
                  });
                }}
              >
                {data.banner_link_label}
              </PrismicNextLink>
            )}
          </div>
          <button
            className="absolute top-2 right-2 sm:relative sm:top-0 sm:right-0 sm:mr-4"
            type="button"
            aria-label="Close banner"
            onClick={() => {
              onclose();
            }}
          >
            <CloseIcon
              className={clsx("h-6 w-6", {
                "text-white": data.banner_color === "purple",
                "text-gray-30":
                  data.banner_color === "grey" && theme === "light",
                "text-gray-EE": data.banner_color === "grey" && theme === "dark"
              })}
            />
          </button>
        </div>
      )}
    </div>
  );
};
