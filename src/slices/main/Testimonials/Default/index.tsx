"use client";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";
import { useId, useState } from "react";
import SVG from "react-inlinesvg";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import QuoteIcon from "@/assets/svg/quote.svg";
import { Copy } from "@/components/modules/Copy";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { NavArrows } from "@/components/ui/NavArrows";
import { generateBackgroundClasses } from "@/lib/utils/generateBackgroundClasses";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type TestimonialsDefaultProps = {
  slice: Content.MainTestimonialsSliceDefault;
  theme: SliceZoneContext["theme"];
};

const TestimonialsDefault = ({ slice, theme }: TestimonialsDefaultProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";
  const sliderId = useId();
  const [swiper, setSwiper] = useState<any>(null);

  const copyTheme =
    slice.primary.background_color === "default" ||
    !slice.primary.background_color
      ? theme === "light"
        ? "light"
        : "dark"
      : "light";

  const lightBorderCondition =
    theme !== "dark" &&
    (slice.primary.background_color === "default" ||
      !slice.primary.background_color);

  const lightSwipeNavCondition =
    theme === "dark" &&
    (slice.primary.background_color === "default" ||
      !slice.primary.background_color);

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container">
        <SliceHeader
          heading={slice.primary.heading}
          subheading={slice.primary.subheading}
          theme={theme}
        />
        <div
          className={clsx(
            "rounded-xl py-8 md:py-12 px-6 md:px-16 overflow-hidden relative mt-8 xl:mt-14 first:mt-0",
            generateBackgroundClasses(slice.primary.background_color, theme, [
              "bg-gray-F7 text-gray-15",
              "bg-gray-1F text-white"
            ])
          )}
        >
          <Swiper
            onSwiper={setSwiper}
            spaceBetween={64}
            slidesPerView={1}
            modules={[Navigation]}
            centerInsufficientSlides={true}
            className={`testimonial-swiper testimonial-swiper`}
            navigation={{
              prevEl: `[id="${sliderId}"] .prev`,
              nextEl: `[id="${sliderId}"] .next`,
              disabledClass: "testimonial-swiper-nav-disabled"
            }}
          >
            <NavArrows
              id={sliderId}
              theme={lightSwipeNavCondition ? "light" : "dark"}
              className={`absolute top-0 right-0 z-10`}
            />
            {slice.items.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col gap-8">
                  <div className="flex items-center h-10">
                    {isFilled.image(item.logo) && (
                      <SVG
                        src={item.logo.url}
                        className="max-h-6 w-auto h-full max-w-[120px]"
                      />
                    )}
                  </div>
                  <div
                    className={clsx(
                      "flex flex-col sm:flex-row sm:gap-8 italic border-t border-b py-6",
                      {
                        "border-gray-50": !lightBorderCondition,
                        "border-gray-AC": lightBorderCondition
                      }
                    )}
                  >
                    <QuoteIcon className="w-6 h-6 mb-4 shrink-0" />
                    <Copy
                      field={item.quote}
                      muted
                      theme={copyTheme}
                      size="xl"
                      className="max-w-3xl 2xl:max-w-4xl"
                    />
                  </div>
                  <footer className="flex items-center gap-6">
                    <div className="rounded-full w-14 h-14 overflow-hidden relative">
                      <PrismicNextImage
                        field={item.image}
                        className="object-cover w-14 h-14"
                        width={56}
                        height={56}
                        fallbackAlt=""
                      />
                    </div>
                    <div>
                      <Copy size="lg" theme={copyTheme}>
                        {item.author}
                      </Copy>
                      {isFilled.richText(item.author_detail) && (
                        <Copy
                          muted
                          underlineLinks
                          theme={copyTheme}
                          field={item.author_detail}
                        />
                      )}
                    </div>
                  </footer>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </SliceLayout>
  );
};

export default TestimonialsDefault;
