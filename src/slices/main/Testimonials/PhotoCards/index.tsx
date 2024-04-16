"use client";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";
import { Button } from "@/components/ui/Button";
import { useId, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import QuoteIcon from "@/assets/svg/quote.svg";
import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { NavArrows } from "@/components/ui/NavArrows";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type TestimonialsPhotoCardsrops = {
  slice: Content.MainTestimonialsSlicePhotoCards;
  theme: SliceZoneContext["theme"];
};

const TestimonialsPhotoCards = ({
  slice,
  theme
}: TestimonialsPhotoCardsrops) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";
  const sliderId = useId();
  const [swiper, setSwiper] = useState<any>(null);
  const { segmentCtaEvent } = usePrismicAnalytics();

  return (
    <SliceLayout
      sliceTheme={themeFromSlice}
      theme={theme}
      className="overflow-hidden"
    >
      <div className="container">
        <div className="md:flex md:justify-between md:items-end">
          <SliceHeader
            heading={slice.primary.heading}
            subheading={slice.primary.subheading}
            theme={theme}
          />
          <NavArrows
            id={sliderId}
            theme={theme === "light" ? "dark" : "light"}
            className={`md:shrink-0 mt-8 md:mt-0 has-[.swiper-button-lock]:mt-0`}
          />
        </div>
        <Swiper
          onSwiper={setSwiper}
          slidesPerView={1.1}
          spaceBetween={24}
          breakpoints={{
            640: {
              slidesPerView: 1.6,
              spaceBetween: 24
            },
            1024: {
              slidesPerView: 2.2,
              spaceBetween: 24
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 24
            }
          }}
          modules={[Navigation]}
          navigation={{
            prevEl: `[id="${sliderId}"] .prev`,
            nextEl: `[id="${sliderId}"] .next`,
            disabledClass: "testimonail-portraits-swiper-nav-disabled"
          }}
          className="mt-8 2xl:mt-14 testimonail-portraits-swiper"
        >
          {slice.items.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-xl relative overflow-hidden p-8 aspect-[5/6] flex flex-col justify-end">
                <div className="z-10 relative">
                  <QuoteIcon className="w-6 h-6 mb-4 shrink-0 text-white" />
                  <Copy field={item.quote} size="md" theme="dark" />
                </div>
                <div className="flex z-10 relative items-center text-white mt-4 md:mt-6">
                  <span>{item.author}</span>
                  <span className="mx-4">·</span>
                  <span
                    className={clsx({
                      "text-primary-orange":
                        item.author_detail_color === "orange",
                      "text-primary-blue": item.author_detail_color === "blue",
                      "text-primary-purple":
                        item.author_detail_color === "purple" ||
                        !item.author_detail_color
                    })}
                  >
                    {item.author_detail}
                  </span>
                </div>
                <Button
                  field={item.link}
                  className="mt-6 relative z-10 text-white"
                  style="tertiary"
                  theme="dark"
                  onClick={() => {
                    segmentCtaEvent("CTA Clicked", {
                      ctaType: "tertiary",
                      ctaPosition: "testimonials_photoCards",
                      ctaText: item.link_label || "",
                      ctaUrl: isFilled.link(item.link) ? item.link.url! : ""
                    });
                  }}
                >
                  {item.link_label}
                </Button>
                <PrismicNextImage
                  field={item.image}
                  className="absolute inset-0 object-cover w-full h-full border"
                  fallbackAlt=""
                />
                <div className="absolute inset-0 top-1/4 bg-gradient-to-b from-transparent to-black" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </SliceLayout>
  );
};

export default TestimonialsPhotoCards;
