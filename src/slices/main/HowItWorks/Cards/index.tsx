"use client";

import "swiper/css";
import "swiper/css/navigation";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { Copy } from "@/components/modules/Copy";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { Heading } from "@/components/ui/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type HowItWorksSliceCardsProps = {
  slice: Content.MainHowItWorksSliceCards;
  theme: SliceZoneContext["theme"];
};

const SlideContent = ({
  index,
  item,
  theme,
  cardColor,
  activeSlide,
  onActivate
}: {
  index: number;
  item: Content.MainHowItWorksSliceCardsItem;
  theme: SliceZoneContext["theme"];
  cardColor: string;
  activeSlide: number;
  onActivate: () => void;
}) => {
  const active = activeSlide === index;

  return (
    <div
      onClick={() => {
        onActivate();
      }}
      className={clsx(
        "rounded-2xl h-full transition-colors flex flex-col justify-between overflow-hidden",
        {
          "bg-gray-F7": theme === "light" && !active,
          "bg-gray-1F": theme === "dark" && !active,
          "bg-quaternary-blue dark-copy": active && cardColor === "blue",
          "bg-quaternary-purple dark-copy": active && cardColor === "purple",
          "cursor-pointer": !active
        }
      )}
    >
      <div
        className={clsx("flex flex-col p-6 2xl:p-10", {
          "opacity-50": !active
        })}
      >
        <header className="flex justify-between ">
          <span
            className={clsx(
              "w-12 h-12 rounded-xl text-center leading-6 text-xl font-bold flex items-center justify-center",
              {
                "bg-gray-15 text-white": theme === "light" || active,
                "bg-white text-gray-15": theme === "dark" && !active
              }
            )}
          >
            {index + 1}
          </span>
        </header>
        <Heading field={item.heading} size="md" className="mt-6" />
        <Copy field={item.subheading} className="mt-4" muted />
      </div>
      <PrismicNextImage
        field={item.image}
        className={clsx(
          "mt-10 transition-opacity",
          active ? "opacity-100" : "opacity-0"
        )}
        fallbackAlt=""
      />
    </div>
  );
};

const HowItWorksSliceCards = ({ slice, theme }: HowItWorksSliceCardsProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";
  const [swiper, setSwiper] = useState<any>();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    swiper?.slideTo(activeSlide);
  }, [activeSlide]);

  return (
    <SliceLayout
      theme={theme}
      sliceTheme={themeFromSlice}
      className="overflow-hidden"
    >
      <div className="container">
        <SliceHeader
          heading={slice.primary.heading}
          subheading={slice.primary.subheading}
          eyebrow={slice.primary.eyebrow}
          eyebrowColor={theme === "light" ? "blue" : "purple"}
          theme={theme}
        />
        <Swiper
          spaceBetween={16}
          slidesPerView="auto"
          breakpoints={{
            300: {
              slidesPerView: 1.2
            },
            480: {
              slidesPerView: 1.2
            },
            640: {
              spaceBetween: 16,
              slidesPerView: 2.2
            },
            768: {
              spaceBetween: 16,
              slidesPerView: 2.8
            },
            1024: {
              spaceBetween: 16,
              slidesPerView: 3.5
            },
            1441: {
              spaceBetween: 24,
              slidesPerView: 3.5
            }
          }}
          onSwiper={(swiper) => {
            setSwiper(swiper);
          }}
          watchSlidesProgress={true}
          resistanceRatio={0}
          modules={[Navigation]}
          className="step-swiper mt-8 2xl:mt-14 first:mt-0"
          preventClicks={false}
          preventClicksPropagation={false}
          onActiveIndexChange={(swiper) => {
            if (swiper.clickedIndex === undefined) {
              setActiveSlide(swiper.activeIndex);
            }
          }}
        >
          {slice.items.map((item, index) => (
            <SwiperSlide
              key={index}
              style={{ height: "auto" }}
              className="rounded-2xl"
            >
              <SlideContent
                index={index}
                item={item}
                theme={theme}
                cardColor={theme === "light" ? "blue" : "purple"}
                activeSlide={activeSlide}
                onActivate={() => setActiveSlide(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </SliceLayout>
  );
};

export default HowItWorksSliceCards;
