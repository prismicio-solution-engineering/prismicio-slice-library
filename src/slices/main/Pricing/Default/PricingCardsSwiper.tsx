"use client";

import "swiper/css";
import "swiper/css/navigation";

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { Mousewheel, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Switch } from "@/components/ui/Switch";
import { usePrismicContext } from "@/lib/context/prismic";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import { Content } from "@prismicio/client";

import PricingCard from "./PricingCard";

import type { SliceZoneContext } from "@/lib/types";

export type PricingCardsProps = {
  theme: SliceZoneContext["theme"];
  plans: Content.PricingPlanDocument[];
};

export default function PricingCardsSwiper({
  theme,
  plans
}: PricingCardsProps) {
  const [cardWidth, setCardWidth] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [hoverScreenSize, setHoverScreenSize] = useState(false);
  const size = useWindowSize();
  const swiperRef = useRef<any>();
  const cards = useRef<any>();
  const { pricingMonthly, changePricingMonthly } = usePrismicContext();

  useEffect(() => {
    const card = document.querySelector(".pricing-card");

    if (size.width > 1200) {
      if (!hovered) {
        setHoverScreenSize(true);
        swiperRef.current.params.noSwiping = true;
        swiperRef.current.slideTo(0);
        swiperRef.current.disable();
      } else {
        setHoverScreenSize(false);
        swiperRef.current.params.noSwiping = false;
        swiperRef.current.slideTo(0);
        swiperRef.current.enable();
      }
    } else {
      setHoverScreenSize(false);
      swiperRef.current.params.noSwiping = false;
      swiperRef.current.slideTo(0);
      swiperRef.current.enable();
    }

    setCardWidth(card?.clientWidth || 324);
  }, [size, hovered]);

  useEffect(() => {
    setTimeout(() => {
      cards.current.classList.remove("opacity-0");
    }, 500);
  }, []);

  return (
    <>
      <Switch
        theme={theme}
        value={!pricingMonthly}
        setValue={changePricingMonthly}
      />
      <div ref={cards} className="container mt-10 opacity-0 transition-opacity">
        <div
          className="-mx-3"
          onMouseLeave={() => {
            if (hovered) {
              setHovered(false);
            }
          }}
        >
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={0}
            noSwipingClass="swiper-slide"
            mousewheel={{
              releaseOnEdges: true,
              forceToAxis: true
            }}
            slidesPerView={1.1}
            breakpoints={{
              640: {
                slidesPerView: 2.1
              },
              768: {
                slidesPerView: 3.1
              },
              1200: {
                slidesPerView: 4
              }
            }}
            watchSlidesProgress={true}
            modules={[Navigation, Mousewheel]}
            className="pricing-swiper"
            rewind={true}
          >
            {plans &&
              plans.map((item, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className={clsx("pricing-card shrink-0 w-1/4 relative", {
                      "z-50": index === 0,
                      "z-40": index === 1,
                      "z-30": index === 2,
                      "z-20": index === 3,
                      "z-10": index === 4,
                      "z-0": index === 5,
                      "delay-100": index === 2,
                      "cursor-grab": !hoverScreenSize || hovered
                    })}
                    style={{
                      height: "auto",
                      transitionProperty: "margin-left",
                      transitionDuration: "0.3s",
                      marginLeft:
                        (index === 1 || index === 2) &&
                        !hovered &&
                        hoverScreenSize
                          ? -cardWidth + "px"
                          : "0"
                    }}
                    onMouseEnter={() => {
                      if (
                        (index === 0 || index === 1 || index === 2) &&
                        hoverScreenSize
                      ) {
                        setHovered(true);
                      }
                    }}
                  >
                    <div
                      className={clsx("h-full px-2 2xl:px-3 transition-all", {
                        "mt-1 -mb-1 translate-x-1 2xl:mt-2 2xl:-mb-2 2xl:translate-x-2":
                          index === 1 && !hovered && hoverScreenSize,
                        "mt-2 -mb-2 translate-x-2 2xl:mt-4 2xl:-mb-4 2xl:translate-x-4":
                          index === 2 && !hovered && hoverScreenSize
                      })}
                    >
                      <PricingCard key={index} item={item} theme={theme} />
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      </div>
    </>
  );
}
