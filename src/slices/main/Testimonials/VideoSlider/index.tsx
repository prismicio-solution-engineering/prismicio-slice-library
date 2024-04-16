"use client";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";
import { useEffect, useState } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { Mousewheel, Navigation, Swiper as SwiperRef } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import PlayIcon from "@/assets/svg/play.svg";
import QuoteIcon from "@/assets/svg/quote.svg";
import { Copy } from "@/components/modules/Copy";
import { Heading } from "@/components/ui/Heading";
import { NavArrows } from "@/components/ui/NavArrows";
import { asText, Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type TestimonialsVideoSliderProps = {
  slice: Content.MainTestimonialsSliceVideoSlider;
  theme: SliceZoneContext["theme"];
};

type VideoSlideProps = {
  item: Content.MainTestimonialsSliceVideoSliderItem;
  index: number;
  onPlayVideo: () => void;
  playing: number;
  theme: SliceZoneContext["theme"];
};

const VideoSlide = ({
  item,
  index,
  onPlayVideo,
  playing,
  theme
}: VideoSlideProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoElement, setVideoElement] = useState<YouTubePlayer>(null);

  if (!isFilled.embed(item.youtube_link)) {
    return null;
  }

  let id;
  let time;

  if (item.youtube_link.embed_url.includes("v=")) {
    const url = new URL(item.youtube_link.embed_url);
    id = url.searchParams.get("v");
    time = url.searchParams.get("t");
  } else {
    const url = new URL(item.youtube_link.embed_url);
    id = url.pathname.split("/").pop();
    time = url.searchParams.get("t");
  }

  const playVideo = () => {
    setShowVideo(true);
  };

  useEffect(() => {
    if (playing !== index && videoElement !== null) {
      setShowVideo(false);
    }
  }, [playing]);

  const _onReady = (event: YouTubePlayer) => {
    setVideoElement(event);
    setIsPlaying(true);
    onPlayVideo();
  };

  const _onEnd = () => {
    videoElement.target.seekTo(0);
    videoElement.target.pauseVideo();
    setIsPlaying(false);
    setShowVideo(false);
  };

  const _onPause = () => {
    setIsPlaying(false);
  };

  const _onPlay = () => {
    setIsPlaying(true);
    onPlayVideo();
  };

  return (
    <div className="relative rounded-xl overflow-hidden text-white">
      <div className="relative group">
        {showVideo && isFilled.embed(item.youtube_link) ? (
          <div className="relative">
            <div className="aspect-w-5 aspect-h-7 relative">
              <YouTube
                videoId={id!}
                iframeClassName="absolute inset-0 w-full h-full rounded-xl"
                opts={{
                  height: "1400",
                  width: "1000",
                  playerVars: {
                    rel: 0,
                    showinfo: 0,
                    controls: 0,
                    autoplay: 1,
                    modestbranding: 1
                  }
                }}
                onReady={_onReady}
                onEnd={_onEnd}
                onPause={_onPause}
                onPlay={_onPlay}
              />
            </div>
          </div>
        ) : (
          <div>
            <button
              className="absolute z-10 inset-0 flex items-center justify-center"
              onClick={playVideo}
            >
              <PlayIcon className="w-10 h-10" />
            </button>
            <div className="absolute bg-gray-15 items-center flex -bottom-px -right-px -left-px min-w-full rounded-t-xl h-[80px] px-4 md:px-6 z-20">
              <span className="font-medium text-lg lg:text-base 2xl:text-lg block relative z-10">
                {item.author}
                {isFilled.keyText(item.author_detail) && (
                  <span> - {item.author_detail}</span>
                )}
              </span>
            </div>
            {isFilled.richText(item.quote) && (
              <div className="absolute text-left bottom-10 md:bottom-16 right-0 left-0 p-6 md:p-8 md:pb-12 transition-opacity text-white z-10 font-headings tracking-tight text-xl-tight 2xl:2xl-tight font-medium">
                <QuoteIcon className="relative z-10 mb-3 w-6 h-6 text-white" />
                <Copy field={item.quote} className="relative z-10" />
                <span className="absolute inset-0 bg-gradient-to-t from-black opacity-75" />
              </div>
            )}
            <div
              className={clsx(
                "aspect-w-5 aspect-h-7 border rounded-xl overflow-hidden relative",
                {
                  "border-gray-1F": theme === "dark",
                  "border-gray-F7": theme === "light"
                }
              )}
            >
              <PrismicNextImage
                field={item.image}
                fill
                sizes="(max-width: 1023px) 70vw, 30rem"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TestimonialsVideoSlider = ({
  slice,
  theme
}: TestimonialsVideoSliderProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container">
        <div
          className={clsx("rounded-2xl p-6 md:p-14 overflow-hidden", {
            "bg-gray-F7": theme === "light",
            "bg-gray-1F": theme === "dark"
          })}
        >
          <header className="flex justify-between gap-6">
            <Heading size="lg" as="h2">
              {asText(slice.primary.heading)}
            </Heading>
            <NavArrows
              className="video-swiper-nav"
              theme={theme === "light" ? "dark" : "light"}
            />
          </header>
          <Swiper
            spaceBetween={16}
            slidesPerView="auto"
            breakpoints={{
              300: {
                slidesPerView: 1.2
              },
              480: {
                spaceBetween: 16,
                slidesPerView: 1.4
              },
              1024: {
                spaceBetween: 16,
                slidesPerView: 3.2
              },
              1441: {
                spaceBetween: 24,
                slidesPerView: 2.4
              }
            }}
            mousewheel={{
              forceToAxis: true
            }}
            modules={[Navigation, Mousewheel]}
            centerInsufficientSlides={true}
            className="video-swiper mt-8"
            navigation={{
              prevEl: ".video-swiper-nav .prev",
              nextEl: ".video-swiper-nav .next",
              disabledClass: "video-swiper-nav-disabled"
            }}
          >
            {slice.items.map((item, index) => (
              <SwiperSlide key={index}>
                <VideoSlide
                  item={item}
                  index={index}
                  onPlayVideo={() => setActiveIndex(index)}
                  playing={activeIndex}
                  theme={theme}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </SliceLayout>
  );
};

export default TestimonialsVideoSlider;
