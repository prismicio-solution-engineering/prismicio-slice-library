"use client";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";
import { useEffect, useId, useRef, useState } from "react";
import {
  Controller,
  EffectFade,
  Navigation,
  Swiper as SwiperRef
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import QuoteIcon from "@/assets/svg/quote.svg";
import { Copy } from "@/components/modules/Copy";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { NavArrows } from "@/components/ui/NavArrows";
import { generateBackgroundClasses } from "@/lib/utils/generateBackgroundClasses";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type TestimonialsWebsiteSliderProps = {
  slice: Content.MainTestimonialsSliceWebsiteSlider;
  theme: SliceZoneContext["theme"];
};

const TestimonialsWebsiteSlider = ({
  slice,
  theme
}: TestimonialsWebsiteSliderProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";
  const sliderId = useId();
  const swiperWrapper = useRef<HTMLDivElement>(null);
  const [imageSwiper, setImageSwiper] = useState<SwiperRef>();
  const [textSwiper, setTextSwiper] = useState<SwiperRef>();

  const initTextSwiper = (swiper: SwiperRef) => {
    setTextSwiper(swiper);

    setTimeout(() => {
      swiperWrapper.current?.classList.remove("opacity-0");
    }, 500);
  };

  const copyTheme =
    slice.primary.background_color === "default" ||
    !slice.primary.background_color
      ? theme === "light"
        ? "light"
        : "dark"
      : "light";

  const lightSwipeNavCondition =
    theme === "dark" &&
    (slice.primary.background_color === "default" ||
      !slice.primary.background_color);

  const lightBorderCondition =
    theme !== "dark" &&
    (slice.primary.background_color === "default" ||
      !slice.primary.background_color);

  useEffect(() => {
    if (imageSwiper && textSwiper) {
      if (
        imageSwiper !== null &&
        typeof imageSwiper.controller !== "undefined"
      ) {
        imageSwiper.controller.control = textSwiper;
      }
      if (textSwiper !== null && typeof textSwiper.controller !== "undefined") {
        textSwiper.controller.control = imageSwiper;
      }
    }
  }, [imageSwiper, textSwiper]);

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container">
        <SliceHeader
          heading={slice.primary.heading}
          subheading={slice.primary.subheading}
          theme={theme}
        />
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 2xl:gap-6 mt-8 2xl:mt-14 first:mt-0 transition-opacity opacity-0"
          ref={swiperWrapper}
        >
          <div>
            <Swiper
              onSwiper={setImageSwiper}
              slidesPerView={1}
              modules={[EffectFade, Controller, Navigation]}
              effect="fade"
              className="h-full"
            >
              {slice.items.map((item, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={clsx(
                      "border-2 rounded-xl flex flex-col overflow-hidden",
                      {
                        "border-gray-15 bg-gray-EE": theme === "light",
                        "border-gray-50 bg-gray-30": theme === "dark"
                      }
                    )}
                  >
                    <div
                      className={clsx("flex p-3 md:p-6 gap-2 border-b-2", {
                        "border-gray-15": theme === "light",
                        "border-gray-50": theme === "dark"
                      })}
                    >
                      <span className="h-4 w-4 bg-primary-pink block rounded-full" />
                      <span className="h-4 w-4 bg-primary-orange block rounded-full" />
                      <span className="h-4 w-4 bg-primary-green block rounded-full" />
                    </div>
                    <div
                      className={clsx("p-2 md:p-4 h-full", {
                        "bg-gray-F7": theme === "light",
                        "bg-gray-50": theme === "dark"
                      })}
                    >
                      <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden relative">
                        <PrismicNextImage
                          field={item.website}
                          className="object-cover object-top"
                          sizes="(max-width: 1023px) 80vw, (max-width: 1300px) 50vw, 33vw"
                          fill
                          priority={index === 0}
                          fallbackAlt=""
                        />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div
            className={clsx(
              "rounded-xl overflow-hidden relative p-12",
              generateBackgroundClasses(slice.primary.background_color, theme, [
                "bg-gray-F7 text-gray-15",
                "bg-gray-1F text-white"
              ])
            )}
          >
            <Swiper
              onSwiper={(swiper) => {
                initTextSwiper(swiper);
              }}
              spaceBetween={64}
              slidesPerView={1}
              modules={[Navigation, Controller]}
              centerInsufficientSlides={true}
              className="testimonial-swiper w-full"
              navigation={{
                prevEl: `[id="${sliderId}"] .prev`,
                nextEl: `[id="${sliderId}"] .next`,
                disabledClass: "testimonial-swiper-nav-disabled"
              }}
            >
              {slice.items.map((item, index) => (
                <SwiperSlide
                  key={index}
                  className="opacity-40 transition-opacity"
                >
                  <div className="flex flex-row gap-6">
                    <QuoteIcon className="w-6 h-6 mb-4 shrink-0" />
                    <Copy
                      field={item.quote}
                      size="lg"
                      theme={copyTheme}
                      muted
                      className="italic text-lg xl:text-2xl 3xl:text-3xl"
                    />
                  </div>
                  <footer
                    className={clsx(
                      "border-t pt-8 mt-8 flex items-center gap-6",
                      {
                        "border-gray-50": !lightBorderCondition,
                        "border-gray-AC": lightBorderCondition
                      }
                    )}
                  >
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
                      <Copy
                        size="lg"
                        className="text-base lg:text-md 2xl:text-xl"
                        theme={copyTheme}
                      >
                        {item.author}
                      </Copy>
                      {item.author_detail && (
                        <Copy muted theme={copyTheme}>
                          {item.author_detail}
                        </Copy>
                      )}
                    </div>
                  </footer>
                </SwiperSlide>
              ))}
            </Swiper>
            <NavArrows
              id={sliderId}
              theme={lightSwipeNavCondition ? "light" : "dark"}
              className={`sm:absolute sm:bottom-12 sm:right-12 sm:z-10 mt-12 sm:mt-0`}
            />
          </div>
        </div>
      </div>
    </SliceLayout>
  );
};

export default TestimonialsWebsiteSlider;
