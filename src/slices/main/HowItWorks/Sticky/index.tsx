"use client";

import clsx from "clsx";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useId, useRef, useState } from "react";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { Copy } from "@/components/modules/Copy";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { BorderWrap } from "@/components/ui/BorderWrap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

const gsapConditions = {
  isDesktop: "(min-width: 1024px)",
  isMobile: "(max-width: 1023px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
};

type MediaItemProps = {
  item: Content.MainHowItWorksSliceStickyItem;
  className?: string;
  theme: SliceZoneContext["theme"];
  id: string;
};

type SectionProps = {
  item: Content.MainHowItWorksSliceStickyItem;
  preTitles: (string | null)[];
  index: number;
  theme: SliceZoneContext["theme"];
  id: string;
};

export type HowItWorksSliceStickyProps = {
  slice: Content.MainHowItWorksSliceSticky;
  theme: SliceZoneContext["theme"];
};

const MediaItem = ({ item, className, theme, id }: MediaItemProps) => {
  const video = useRef() as React.MutableRefObject<HTMLVideoElement>;

  useEffect(() => {
    if (!video.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();

    mm.add(gsapConditions, (context) => {
      const { isMobile, isDesktop, reduceMotion } =
        context.conditions as gsap.Conditions;

      if (isDesktop && !reduceMotion) {
        video.current.currentTime = 0;

        const st = ScrollTrigger.create({
          trigger: video.current,
          start: "0% 100%",
          end: "100% 0%",
          onEnter: () => {
            if (!reduceMotion) {
              if (video.current.classList.contains("lazy")) {
                for (var source in video.current.children) {
                  var videoSource = video.current.children[
                    source
                  ] as HTMLSourceElement;
                  if (
                    typeof videoSource.tagName === "string" &&
                    videoSource.tagName === "SOURCE"
                  ) {
                    videoSource.src = videoSource.dataset.src as string;
                  }
                }
                video.current.classList.remove("lazy");
              }

              video.current.load();
            }
          }
        });
      }

      if (isMobile) {
        const st = ScrollTrigger.create({
          trigger: video.current,
          start: "0% 100%",
          end: "100% 0%",
          onEnter: () => {
            if (!reduceMotion) {
              if (video.current.classList.contains("lazy")) {
                for (var source in video.current.children) {
                  var videoSource = video.current.children[
                    source
                  ] as HTMLSourceElement;
                  if (
                    typeof videoSource.tagName === "string" &&
                    videoSource.tagName === "SOURCE"
                  ) {
                    videoSource.src = videoSource.dataset.src as string;
                  }
                }
                video.current.classList.remove("lazy");
              }

              video.current.load();
              video.current.play();
            }
          },
          onLeave: () => {
            if (!reduceMotion && video.current.currentTime !== 0) {
              video.current.pause();
            }
          },
          onLeaveBack: () => {
            if (!reduceMotion && video.current.currentTime !== 0) {
              video.current.pause();
            }
          },
          onEnterBack: () => {
            if (!reduceMotion) {
              video.current.load();
              video.current.play();
            }
          }
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <BorderWrap
      theme={theme}
      className={clsx(
        "h-full overflow-hidden rounded-2xl pb-[80%] lg:pb-0",
        className
      )}
    >
      <div className="bg-quaternary-orange group-first:bg-quaternary-green group-last:bg-quaternary-purple">
        {isFilled.linkToMedia(item.video_mp4) && "url" in item.video_mp4 ? (
          <video
            ref={video}
            playsInline
            loop
            preload="none"
            muted
            poster={isFilled.image(item.image) ? item.image.url : undefined}
            className="lazy w-full h-full object-cover absolute inset-0 rounded-2xl"
          >
            <source data-src={(item.video_webm as any).url} type="video/webm" />
            <source data-src={(item.video_mp4 as any).url} type="video/mp4" />
          </video>
        ) : (
          <PrismicNextImage
            field={item.image}
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover"
            fallbackAlt=""
          />
        )}
      </div>
      xz
    </BorderWrap>
  );
};

const StickySection = ({ item, preTitles, index, theme, id }: SectionProps) => {
  const section = useRef<HTMLDivElement>(null);

  const stopVideo = (video: HTMLVideoElement) => {
    video.pause();
    video.currentTime = 0;
  };

  useEffect(() => {
    const stickysMedias = gsap.utils.toArray<HTMLElement>(
      `[data-id="${id}"] .sticky-media`
    );
    const vid = stickysMedias[index].querySelector("video");
    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();

    mm.add(gsapConditions, (context) => {
      const { isDesktop, reduceMotion } = context.conditions as gsap.Conditions;

      if (isDesktop) {
        const st = ScrollTrigger.create({
          trigger: section.current,
          start: "0% 50%",
          end: "100% 50%",
          onEnter: () => {
            if (vid) {
              if (!reduceMotion) {
                vid.currentTime = 0;
                vid.play();
              }
            }

            gsap.to(stickysMedias[index], {
              autoAlpha: 1
            });
          },
          onEnterBack: () => {
            if (vid) {
              if (!reduceMotion) {
                vid.play();
              }
            }

            gsap.to(stickysMedias[index], {
              autoAlpha: 1
            });
          },
          onLeave: () => {
            if (index !== stickysMedias.length - 1) {
              if (vid && !reduceMotion) {
                stopVideo(vid);
              }
              gsap.to(stickysMedias[index], {
                autoAlpha: 0
              });
            }
          },
          onLeaveBack: () => {
            if (index !== 0) {
              if (vid && !reduceMotion) {
                stopVideo(vid);
              }
              gsap.to(stickysMedias[index], {
                opacity: 0,
                duration: 0.5
              });
            }
          }
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={section} className="text-section relative group">
      <div className="pb-[80%] w-full hidden lg:block" />
      <div className="lg:absolute lg:inset-0 py-4">
        <MediaItem item={item} theme={theme} className="lg:hidden" id={id} />
        <div
          className={clsx(
            "mt-6 lg:mt-0 rounded-2xl border-2 flex flex-col justify-center h-full px-6 py-12 lg:py-0 md:px-12 lg:px-24",
            {
              "border-gray-15": theme === "light",
              "border-gray-50": theme === "dark"
            }
          )}
        >
          <Eyebrow className="flex gap-2" size="sm" color={item.eyebrow_color}>
            {preTitles.map((pre, index) => (
              <span
                key={index}
                className={clsx(
                  pre == item.eyebrow
                    ? ""
                    : theme === "light"
                      ? "opacity-30 text-gray-15"
                      : "opacity-30 text-white"
                )}
              >
                {pre}
              </span>
            ))}
          </Eyebrow>
          <Heading field={item.heading} size="lg" className="mb-6" />
          <Copy field={item.subheading} muted theme={theme} />
        </div>
      </div>
    </div>
  );
};

const HowItWorksSliceSticky = ({
  slice,
  theme
}: HowItWorksSliceStickyProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";
  const textWrapper = useRef() as React.MutableRefObject<HTMLDivElement>;
  const videoWrapper = useRef() as React.MutableRefObject<HTMLDivElement>;
  const preTitles = slice.items.map((item) => item.eyebrow);
  const [loading, setLoading] = useState(true);
  const id = useId();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const textSections = gsap.utils.toArray<HTMLElement>(
      `[data-id="${id}"] .text-section`
    );

    let mm = gsap.matchMedia();

    mm.add(gsapConditions, (context) => {
      const { isDesktop } = context.conditions as gsap.Conditions;

      if (isDesktop) {
        const st = ScrollTrigger.create({
          trigger: videoWrapper.current,
          start: "50% 50%",
          end: (textSections.length - 1) * 100 + 50 + "% 50%",
          markers: false,
          pin: videoWrapper.current,
          pinSpacing: false,
          scrub: true,
          snap: {
            snapTo: 1 / (textSections.length - 1),
            duration: { min: 0.2, max: 0.5 }
          }
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    });

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <SliceLayout theme={theme} sliceTheme={themeFromSlice}>
      <div className="container" data-id={id}>
        <SliceHeader
          heading={slice.primary.heading}
          subheading={slice.primary.subheading}
          eyebrow={slice.primary.eyebrow}
          eyebrowColor={slice.primary.eyebrow_color}
          theme={theme}
          align="center"
        />
        <div className="mt-8 2xl:mt-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 2xl:gap-6 items-start -my-4">
            <div ref={textWrapper} className="col-span-6 order-2 lg:order-1">
              {slice.items.map((item, index) => (
                <StickySection
                  key={index}
                  item={item}
                  index={index}
                  preTitles={preTitles}
                  theme={theme}
                  id={id}
                />
              ))}
            </div>
            <div
              ref={videoWrapper}
              className="col-span-6 relative w-full order-1 lg:order-2 hidden lg:block"
            >
              {slice.items.map((item, index) => (
                <div
                  key={index}
                  className="sticky-media absolute inset-0 opacity-0 first:opacity-100 py-4"
                >
                  <MediaItem item={item} theme={theme} id={id} />
                </div>
              ))}
              <div className="w-full pb-[80%]" />
            </div>
          </div>
        </div>
      </div>
    </SliceLayout>
  );
};

export default HowItWorksSliceSticky;
