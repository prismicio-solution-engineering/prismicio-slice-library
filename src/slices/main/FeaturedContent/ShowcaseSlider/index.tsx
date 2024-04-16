"use client";

import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { CallToActions } from "@/components/modules/CallToActions";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type FeaturesShowcaseSliderProps = {
  slice: Content.MainFeaturedSliceShowcaseSlider;
  theme: SliceZoneContext["theme"];
};

type SliderRowProps = {
  items: Content.MainFeaturedSliceShowcaseSliderItem[];
  dir: "left" | "right";
  theme: SliceZoneContext["theme"];
};

const divideAbove = 7;

const SliderRow = ({ items, dir, theme }: SliderRowProps) => {
  const trigger = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLDivElement>(null);

  if (items && items.length > divideAbove) {
    const middleIndex = Math.ceil(items.length / 2);
    const firstRow = items.slice(0, middleIndex);
    const secondRow = items.slice(middleIndex);

    if (dir === "left") {
      items = firstRow;
    } else {
      items = secondRow;
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (trigger.current && images.current) {
      const screenWidth = window.innerWidth;
      const imageWidth = images.current.children[0].clientWidth;
      const imagesWidth = imageWidth * images.current.children.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger.current,
          start: "0% 100%",
          end: "100% 0%",
          scrub: true,
          markers: false
        }
      });

      if (dir === "left") {
        tl.fromTo(
          images.current,
          {
            x: 0
          },
          {
            x: screenWidth - imagesWidth,
            ease: "none"
          }
        );
      } else {
        tl.fromTo(
          images.current,
          {
            x: screenWidth - imagesWidth
          },
          {
            x: 0,
            ease: "none"
          }
        );
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={trigger} className="w-full flex">
      <div ref={images} className="flex gap-4 2xl:gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "border-[12px] rounded-lg w-[80%] sm:w-1/2 md:w-1/3 shrink-0",
              {
                "border-gray-F7": theme === "light",
                "border-gray-1F": theme === "dark"
              }
            )}
          >
            {isFilled.contentRelationship(item.website) && (
              <PrismicNextImage
                field={
                  (
                    item.website.data as Pick<
                      Content.WebsiteDocumentData,
                      "screenshot"
                    >
                  )?.screenshot
                }
                fallbackAlt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const FeaturedShowcaseSlider = ({
  slice,
  theme
}: FeaturesShowcaseSliderProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      {(isFilled.title(slice.primary.heading) ||
        isFilled.link(slice.primary.link)) && (
        <div className="container flex flex-col sm:flex-row sm:items-center justify-between">
          <SliceHeader heading={slice.primary.heading} theme={theme} />
          {isFilled.link(slice.primary.link) && (
            <CallToActions
              items={[
                {
                  link_label: slice.primary.link_label,
                  link: slice.primary.link,
                  link_style: "tertiary"
                }
              ]}
              theme={theme}
            />
          )}
        </div>
      )}
      {slice.items.length > divideAbove ? (
        <div className="w-full relative mt-8 2xl:mt-14 first:mt-0 flex flex-col gap-4 2xl:gap-6 overflow-hidden">
          <SliderRow items={slice.items} dir="left" theme={theme} />
          <SliderRow items={slice.items} dir="right" theme={theme} />
        </div>
      ) : (
        <div className="w-full relative mt-8 2xl:mt-14 first:mt-0 overflow-hidden">
          <SliderRow items={slice.items} dir="left" theme={theme} />
        </div>
      )}
    </SliceLayout>
  );
};

export default FeaturedShowcaseSlider;
