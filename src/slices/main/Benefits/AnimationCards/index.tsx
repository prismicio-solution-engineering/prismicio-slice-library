"use client";

import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";
import { useEffect, useRef } from "react";

import { Copy } from "@/components/modules/Copy";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { BorderWrap } from "@/components/ui/BorderWrap";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { asText, Content, isFilled } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

export type BenefitsAnimationCardsProps = {
  slice: Content.MainBenefitsSliceAnimationCards;
  theme: SliceZoneContext["theme"];
};

const Video = ({
  url,
  webmUrl,
  poster
}: {
  url: string;
  webmUrl: string;
  poster: string;
}) => {
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

  return (
    <div className="relative">
      <video
        className="scale-[1.005]"
        ref={videoRef}
        muted
        playsInline
        loop
        poster={poster ? poster : ""}
      >
        <source src={url} type="video/mp4" />
        {webmUrl && <source src={webmUrl} type="video/webm" />}
      </video>
    </div>
  );
};

const BenefitsAnimationCards = ({
  slice,
  theme
}: BenefitsAnimationCardsProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  const { segmentCtaEvent } = usePrismicAnalytics();

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container">
        <SliceHeader
          heading={slice.primary.heading}
          theme={theme}
          align="center"
        />
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-6 mt-8 2xl:mt-14">
          {slice.items.map((item, index) => (
            <BorderWrap
              theme={theme}
              key={index}
              muted
              className="flex flex-col"
              innerClassName="flex flex-col flex-1"
            >
              <div
                className={clsx("flex-1", {
                  "bg-gray-1F text-white": index === 0,
                  "bg-white text-gray-15": index === 1
                })}
              >
                {isFilled.linkToMedia(item.animation_mp4) && (
                  <Video
                    url={item.animation_mp4.url}
                    webmUrl={
                      isFilled.linkToMedia(item.animation_webm)
                        ? item.animation_webm.url
                        : ""
                    }
                    poster={
                      isFilled.image(item.animation_poster)
                        ? item.animation_poster.url
                        : ""
                    }
                  />
                )}
                <div className="p-12 grow flex flex-col">
                  <Heading
                    size="lg"
                    as="h2"
                    className="flex items-center gap-4"
                  >
                    {asText(item.heading)}
                  </Heading>
                  <Copy
                    field={item.subheading}
                    className="my-6 grow"
                    muted
                    theme={index === 0 ? "dark" : "light"}
                  />
                  <Button
                    field={item.link}
                    theme={theme}
                    style={"tertiary"}
                    onClick={() => {
                      segmentCtaEvent("CTA Clicked", {
                        ctaType: "tertiary link",
                        ctaPosition: "benefits_animationCards",
                        ctaText: item.link_label || "",
                        ctaUrl: isFilled.link(item.link) ? item.link.url! : ""
                      });
                    }}
                  >
                    {item.link_label}
                  </Button>
                </div>
              </div>
            </BorderWrap>
          ))}
        </div>
      </div>
    </SliceLayout>
  );
};

export default BenefitsAnimationCards;
