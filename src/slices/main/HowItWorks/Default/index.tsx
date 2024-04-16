"use client";

import "swiper/css";
import "swiper/css/navigation";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { Copy } from "@/components/modules/Copy";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { BorderWrap } from "@/components/ui/BorderWrap";
import { NavArrows } from "@/components/ui/NavArrows";
import { asText, Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type HowItWorksSliceDefaultProps = {
  slice: Content.MainHowItWorksSliceDefault;
  theme: SliceZoneContext["theme"];
};

const PaginationBullet = ({
  index,
  item,
  activeSlide,
  theme
}: {
  index: number;
  item: Content.MainHowItWorksSliceDefaultItem;
  activeSlide: number;
  theme: SliceZoneContext["theme"];
}) => (
  <button className="relative mr-4 md:mr-8 pb-8 lg:pb-16 h-full flex">
    <h3
      className={clsx(
        "font-headings tracking-tight text-xl-tight sm:text-3xl-tight lg:text-4xl 2xl:text-5xl font-medium max-w-[240px] sm:max-w-[600px] lg:max-w-none text-left",
        {
          "text-gray-15": index === activeSlide && theme === "light",
          "text-white": index === activeSlide && theme === "dark",
          "text-gray-A4": index !== activeSlide && theme === "light",
          "text-gray-50": index !== activeSlide && theme === "dark"
        }
      )}
    >
      {asText(item.heading)}
    </h3>
    {index === activeSlide && (
      <motion.div
        className="pointer-events-none rounded-full w-full absolute -bottom-px -mb-px h-[3px] bg-primary-green"
        layoutId="box"
        transition={{ type: "spring", stiffness: 70, duration: 1000 }}
      />
    )}
  </button>
);

const HowItWorksSliceDefault = ({
  slice,
  theme
}: HowItWorksSliceDefaultProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sliderId = useId();

  const playVideoAfterOneSecond = (index: number) => {
    const currentSlideElement = document.querySelector(`.video-slide-${index}`);
    const videoElement = currentSlideElement?.querySelector("video");
    if (videoElement) {
      setTimeout(() => {
        videoElement.play();
      }, 1000);
    }
  };

  const stopAllVideos = () => {
    const allVideoElements = document.querySelectorAll("video");
    allVideoElements.forEach((videoElement) => {
      videoElement.pause();
      videoElement.currentTime = 0;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            videoRef.current?.play();
          }, 1000);
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoRef]);

  return (
    <SliceLayout theme={theme} sliceTheme={themeFromSlice}>
      <div className="relative z-10 grow pointer-events-none">
        <div
          className={clsx(
            "absolute inset-0 -right-6 lg:-right-8 bg-gradient-to-r to-transparent",
            {
              "from-gray-15": theme === "dark",
              "from-white": theme === "light"
            }
          )}
        />
      </div>
      <div className="container">
        <SliceHeader heading={slice.primary.heading} theme={theme} />
        <div className="border-b border-gray-50">
          <Swiper
            slidesPerGroup={1}
            slideToClickedSlide={true}
            watchSlidesProgress={true}
            slidesPerView="auto"
            allowTouchMove={false}
            onSwiper={setThumbsSwiper}
            style={{ overflow: "visible" }}
            className="mt-8 w-[50px] md:mt-16 tab-thumb-swiper"
          >
            {slice.items.map((item, index) => (
              <SwiperSlide
                key={index}
                style={{
                  height: "auto"
                }}
              >
                <PaginationBullet
                  index={index}
                  item={item}
                  activeSlide={activeSlide}
                  theme={theme}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <Swiper
          slidesPerView={1}
          modules={[Navigation, Thumbs]}
          thumbs={{ swiper: thumbsSwiper }}
          className={`tab-swiper mt-8 2xl:mt-14 first:mt-0`}
          navigation={{
            prevEl: `[id="${sliderId}"] .prev`,
            nextEl: `[id="${sliderId}"] .next`,
            disabledClass: "tab-swiper-nav-disabled"
          }}
          onSlideChange={(swiper) => {
            setActiveSlide(swiper.activeIndex);
            stopAllVideos();
            playVideoAfterOneSecond(swiper.activeIndex);
          }}
        >
          {slice.items.map((item, index) => (
            <SwiperSlide key={index} className={`video-slide-${index}`}>
              <div className="grid grid-cols-12 gap-6 w-full items-start">
                <BorderWrap
                  className="col-span-12 md:col-span-8"
                  theme={theme}
                  muted
                >
                  {isFilled.linkToMedia(item.video_mp4) ? (
                    <video
                      ref={index === 0 ? videoRef : undefined}
                      loop
                      muted
                      playsInline
                      className="w-full h-auto object-cover"
                      poster={isFilled.image(item.image) ? item.image.url : ""}
                    >
                      <source src={item.video_mp4.url} type="video/mp4" />
                      {isFilled.linkToMedia(item.video_webm) && (
                        <source src={item.video_webm.url} type="video/webm" />
                      )}
                    </video>
                  ) : (
                    isFilled.image(item.image) && (
                      <PrismicNextImage
                        field={item.image}
                        className="aspect-[206/105] object-cover"
                        fallbackAlt=""
                      />
                    )
                  )}
                </BorderWrap>
                <Copy
                  field={item.subheading}
                  muted
                  theme={theme}
                  className="col-span-12 md:col-span-4 md:pb-16"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mt-6 md:grid md:grid-cols-12 md:gap-6">
          <NavArrows
            id={sliderId}
            theme={theme === "light" ? "dark" : "light"}
            className={`md:col-span-4 md:col-start-9 md:-mt-16 relative z-10`}
          />
        </div>
      </div>
      <div className="relative z-10 grow pointer-events-none">
        <div
          className={clsx(
            "absolute inset-0 -left-6 lg:-left-8 bg-gradient-to-l to-transparent",
            {
              "from-gray-15": theme === "dark",
              "from-white": theme === "light"
            }
          )}
        />
      </div>
    </SliceLayout>
  );
};

export default HowItWorksSliceDefault;
