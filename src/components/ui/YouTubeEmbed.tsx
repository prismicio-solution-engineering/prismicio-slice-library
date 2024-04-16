"use client";

import clsx from "clsx";
import NextImage from "next/image";
import { useState } from "react";
import YouTube from "react-youtube";

import PlayIcon from "@/assets/svg/play.svg";
import { EmptyImageFieldImage, FilledImageFieldImage } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

type YouTubeEmbedProps = {
  videoId: string;
  title?: string;
  thumbnail?: EmptyImageFieldImage | FilledImageFieldImage | null | undefined;
  className?: string;
  aspectRatio?: "16/9" | "5/7";
  controls?: 1 | 0;
  showPlayButton?: boolean;
  instantVideo?: boolean;
  startAt?: number;
};

export const YouTubeEmbed = ({
  videoId,
  title,
  thumbnail,
  className,
  aspectRatio = "16/9",
  controls = 1,
  showPlayButton = true,
  instantVideo,
  startAt
}: YouTubeEmbedProps) => {
  const [showVideo, setShowVideo] = useState(instantVideo || false);

  const imageUrl = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
  const fallbackImageUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className={clsx("bg-gray-15", className)}>
      {showVideo ? (
        <div
          className={clsx("w-full relative", {
            "aspect-[16/9]": aspectRatio === "16/9",
            "aspect-[5/7]": aspectRatio === "5/7"
          })}
        >
          <YouTube
            videoId={videoId}
            iframeClassName="absolute inset-0 w-full h-full"
            opts={{
              playerVars: {
                rel: 0,
                showinfo: 0,
                controls: controls,
                autoplay: 1,
                start: startAt || 0
              }
            }}
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowVideo(true)}
          className={clsx("group relative w-full", {
            "aspect-[16/9]": aspectRatio === "16/9",
            "aspect-[5/7]": aspectRatio === "5/7"
          })}
          aria-label={`Play video ${title}`}
        >
          {showPlayButton && (
            <PlayIcon className="w-10 h-10 z-10 absolute top-1/2 left-1/2 text-white transform -translate-x-1/2 -translate-y-1/2" />
          )}
          {thumbnail ? (
            <PrismicNextImage
              field={thumbnail}
              className="h-full w-full"
              fill
              sizes="(max-width: 1024px) 100vw, (max-width: 1300px) 50vw, 33vw"
            />
          ) : (
            <NextImage
              src={imageUrl}
              alt=""
              onError={(event: any) => {
                event.target.id = fallbackImageUrl;
                event.target.srcset = fallbackImageUrl;
              }}
              layout="fill"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          )}
        </button>
      )}
    </div>
  );
};
