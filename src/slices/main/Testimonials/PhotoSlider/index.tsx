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

export type TestimonialsPhotoSliderProps = {
  slice: Content.MainTestimonialsSlicePhotoSlider;
  theme: SliceZoneContext["theme"];
};

const TestimonialsPhotoSlider = ({
  slice,
  theme
}: TestimonialsPhotoSliderProps) => {
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
                  <div className="rounded-xl overflow-hidden relative pb-[70%] lg:h-full lg:pb-0">
                    {item.author && (
                      <Copy
                        theme="dark"
                        size="lg"
                        className="absolute top-0 left-0 right-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-gray-15 via-transparent to-transparent z-10 text-base lg:text-md 2xl:text-xl flex items-end"
                      >
                        {item.author}
                        {item.author_detail && <>, {item.author_detail}</>}
                      </Copy>
                    )}
                    <PrismicNextImage
                      field={item.image}
                      className="object-cover"
                      sizes="(max-width: 1023px) 80vw, (max-width: 1300px) 50vw, 33vw"
                      fill
                      fallbackAlt=""
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div
            className={clsx(
              "rounded-xl overflow-hidden relative py-8 md:py-20 px-6 md:px-16",
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
                  <div className="flex flex-col">
                    <QuoteIcon className="w-6 h-6 mb-4 shrink-0" />
                    <Copy
                      field={item.quote}
                      size="xl"
                      theme={copyTheme}
                      className="italic"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <NavArrows
              id={sliderId}
              theme={lightSwipeNavCondition ? "light" : "dark"}
              className={`testimonial-swiper-nav-${sliderId} mt-12`}
            />
          </div>
        </div>
      </div>
    </SliceLayout>
  );
};

export default TestimonialsPhotoSlider;
