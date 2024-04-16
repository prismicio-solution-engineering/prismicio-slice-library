"use client";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { Heading } from "@/components/ui/Heading";
import { Content, isFilled } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

export type BenefitsAnimationTextRightProps = {
  slice: Content.MainBenefitsSliceAnimationTextRight;
  theme: SliceZoneContext["theme"];
};

const BenefitsAnimationTextRight = ({
  slice,
  theme
}: BenefitsAnimationTextRightProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          videoRef.current?.play();
        } else {
          if (!videoRef.current) return;
          videoRef.current?.pause();
          videoRef.current.currentTime = 0;
        }
      },
      { threshold: 0.5 } // Adjust this value to when you want the video to play.
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

  const items = slice.items.map((item) => {
    return {
      ...item,
      link_style: "tertiary"
    };
  }) as Content.MainBenefitsSliceAnimationTextRight["items"];

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container md:grid md:grid-cols-12 md:gap-x-6 items-center gap-y-8">
        <Heading
          size="2xl"
          field={slice.primary.heading}
          className="lg:col-start-2 md:col-span-12 lg:col-span-10"
        />
        <div className="relative z-10 col-span-5 lg:col-span-4 lg:col-start-2">
          <div>
            <Heading
              field={slice.primary.subheading}
              size="lg"
              className="mt-4"
            />
            <Copy
              field={slice.primary.paragraph}
              className="mt-4"
              muted
              theme={theme}
            />
            <CallToActions items={items} className="mt-6" theme={theme} />
          </div>
        </div>
        {isFilled.linkToMedia(slice.primary.animation_mp4) && (
          <motion.video
            ref={videoRef}
            className="col-span-6 col-start-7 w-full mt-10 md:mt-0"
            autoPlay
            muted
            playsInline
            loop
            poster={
              isFilled.image(slice.primary.animation_poster)
                ? slice.primary.animation_poster.url
                : ""
            }
          >
            <source src={slice.primary.animation_mp4.url} type="video/mp4" />
            {isFilled.linkToMedia(slice.primary.animation_webm) && (
              <source
                src={slice.primary.animation_webm.url}
                type="video/webm"
              />
            )}
          </motion.video>
        )}
      </div>
    </SliceLayout>
  );
};

export default BenefitsAnimationTextRight;
