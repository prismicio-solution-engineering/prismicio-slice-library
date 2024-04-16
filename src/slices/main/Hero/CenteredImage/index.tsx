import clsx from "clsx";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { BorderWrap } from "@/components/ui/BorderWrap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ImageCaption } from "@/components/ui/ImageCaption";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type HeroCenteredImageProps = {
  slice: Content.MainHeroSliceCenteredImage;
  context: SliceZoneContext;
};

const HeroCenteredImage = ({ slice, context }: HeroCenteredImageProps) => {
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
      {isFilled.image(slice.primary.image) && (
        <div className="md:grid md:grid-cols-12 md:gap-x-6 mt-10">
          <figure className="md:col-span-10 md:col-start-2">
            <BorderWrap theme={context.theme}>
              <PrismicNextImage
                field={slice.primary.image}
                className="w-full"
                priority
                fallbackAlt=""
              />
            </BorderWrap>
            <ImageCaption
              text={slice.primary.caption}
              theme={context.theme}
              className="text-center"
            />
          </figure>
        </div>
      )}
    </SliceLayout>
  );
};

export default HeroCenteredImage;
