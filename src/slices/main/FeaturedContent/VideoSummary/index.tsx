"use client";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import { clsx } from "clsx";
import { Mousewheel, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { Copy } from "@/components/modules/Copy";
import { Heading } from "@/components/ui/Heading";
import { NavArrows } from "@/components/ui/NavArrows";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";
type FeaturedPartnerProps = {
  slice: Content.MainFeaturedSliceVideoSummary;
  theme: SliceZoneContext["theme"];
};

const FeaturedPartner = async ({ slice, theme }: FeaturedPartnerProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";
  const client = createClient();

  return (
    <SliceLayout
      sliceTheme={themeFromSlice}
      theme={theme}
      className="overflow-hidden"
    >
      <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          className={clsx(
            "sm:col-span-1 z-10 relative after:w-[2000px] after:h-full after:absolute after:right-6 after:top-0 after:content-[''] after:block before:bg-gradient-to-l from-transparent before:w-12 before:h-full before:absolute before:-right-6 before:top-0 before:content-[''] before:block",
            {
              "after:bg-white to-white": theme === "light",
              "after:bg-gray-15 to-gray-15": theme === "dark"
            }
          )}
        >
          <div className="relative z-10 pr-12 sm:pb-20">
            {isFilled.richText(slice.primary.heading) && (
              <Heading field={slice.primary.heading} size="2xl" />
            )}
            {isFilled.richText(slice.primary.subheading) && (
              <Copy
                field={slice.primary.subheading}
                className="mt-6 max-w-[85%] sm:max-w-none"
                theme={theme}
                muted
              />
            )}
            <NavArrows
              className={`video-summary-swiper-nav mt-10 absolute bottom-0 right-0 sm:left-0 sm:right-auto`}
              theme={theme === "dark" ? "light" : "dark"}
            />
          </div>
        </div>
        <div className="sm:col-span-1 lg:col-span-2">
          <Swiper
            spaceBetween={24}
            slidesPerView="auto"
            breakpoints={{
              300: {
                slidesPerView: 1.1
              },
              1024: {
                slidesPerView: 2.1
              }
            }}
            mousewheel={{
              forceToAxis: true
            }}
            modules={[Navigation, Mousewheel]}
            className="video-summary-swiper h-full"
            navigation={{
              prevEl: `.video-summary-swiper-nav .prev`,
              nextEl: `.video-summary-swiper-nav .next`,
              disabledClass: "video-summary-swiper-nav-disabled"
            }}
          >
            {slice.items.map((item) => {
              const videoUrl = new URL(item.youtube_link.embed_url);
              const videoId = videoUrl.searchParams.get("v");

              if (!videoId) {
                return null;
              }

              return (
                <SwiperSlide
                  key={item.youtube_link.embed_url}
                  className="flex h-full"
                  style={{ height: "auto" }}
                >
                  <article
                    className={clsx(
                      "rounded-xl overflow-hidden border-2 w-full",
                      {
                        "bg-gray-1F border-gray-30": theme === "dark",
                        "bg-white border-gray-EE": theme === "light"
                      }
                    )}
                  >
                    <YouTubeEmbed videoId={videoId} />
                    <div className="p-6">
                      <Copy field={item.video_summary} muted theme={theme} />
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </SliceLayout>
  );
};

export default FeaturedPartner;
