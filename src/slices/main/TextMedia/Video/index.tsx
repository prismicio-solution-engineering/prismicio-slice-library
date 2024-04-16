import clsx from "clsx";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { BorderWrap } from "@/components/ui/BorderWrap";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { Content, isFilled } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

export type TextMediaVideoProps = {
  slice: Content.MainTextMediaSliceVideo;
  theme: SliceZoneContext["theme"];
};

const TextMediaVideo = async ({ slice, theme }: TextMediaVideoProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  if (slice.primary.youtube_link.provider_name !== "YouTube") {
    return null;
  }

  let id;
  let time;

  if (slice.primary.youtube_link.embed_url.includes("v=")) {
    const url = new URL(slice.primary.youtube_link.embed_url);
    id = url.searchParams.get("v");
    time = url.searchParams.get("t");
  } else {
    const url = new URL(slice.primary.youtube_link.embed_url);
    id = url.pathname.split("/").pop();
    time = url.searchParams.get("t");
  }

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme} padding="small">
      <div
        className={clsx("container", {
          "md:grid md:grid-cols-12": !slice.primary.full_width
        })}
      >
        <div
          className={clsx({
            "md:col-span-10 md:col-start-2 lg:px-14": !slice.primary.full_width
          })}
        >
          <BorderWrap theme={theme ? theme : "light"}>
            <YouTubeEmbed
              videoId={id!}
              startAt={time ? parseInt(time) : 0}
              thumbnail={
                isFilled.image(slice.primary.image)
                  ? slice.primary.image
                  : undefined
              }
              className="-m-px"
            />
          </BorderWrap>
        </div>
      </div>
    </SliceLayout>
  );
};

export default TextMediaVideo;
