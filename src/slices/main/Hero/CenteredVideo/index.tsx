import clsx from "clsx";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { BorderWrap } from "@/components/ui/BorderWrap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { Content, isFilled } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

export type HeroCenteredVideoProps = {
  slice: Content.MainHeroSliceCenteredVideo;
  context: SliceZoneContext;
};

const HeroCenteredVideo = ({ slice, context }: HeroCenteredVideoProps) => {
  if (!isFilled.embed(slice.primary.youtube_link)) {
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
    <SliceLayout
      theme={context.theme ?? "light"}
      className="container items-center relative z-10"
    >
      <div
        className={clsx(
          "mx-auto text-center flex flex-col items-center relative z-10"
        )}
      >
        {isFilled.keyText(slice.primary.eyebrow) && (
          <Eyebrow
            text={slice.primary.eyebrow}
            color={slice.primary.eyebrow_color}
          />
        )}
        {isFilled.title(slice.primary.heading) && (
          <Heading
            field={slice.primary.heading}
            size="3xl"
            className="max-w-[14em]"
          />
        )}
        {isFilled.richText(slice.primary.subheading) && (
          <Copy
            field={slice.primary.subheading}
            size="lg"
            className="mt-4 lg:mt-6"
            horizontalLists={true}
            paragraphClassName="max-w-xl mx-auto"
            theme={context.theme}
            muted
          />
        )}
        {slice.items.length > 0 && (
          <CallToActions
            items={slice.items}
            theme={context.theme}
            className="mt-6 lg:mt-10"
            clickPosition={`hero_slice_${slice.variation}`}
          />
        )}
      </div>
      {isFilled.embed(slice.primary.youtube_link) && (
        <div className="md:grid md:grid-cols-12 md:gap-x-6 mt-10">
          <BorderWrap
            className="md:col-span-10 md:col-start-2"
            theme={context.theme}
          >
            <YouTubeEmbed
              videoId={id!}
              startAt={time ? parseInt(time) : 0}
              className="-m-px"
              thumbnail={
                isFilled.image(slice.primary.image)
                  ? slice.primary.image
                  : undefined
              }
            />
          </BorderWrap>
        </div>
      )}
    </SliceLayout>
  );
};

export default HeroCenteredVideo;
