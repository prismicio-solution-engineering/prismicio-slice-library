import clsx from "clsx";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type HeroCenteredBackgroundProps = {
  slice: Content.MainHeroSliceCenteredBackground;
  context: SliceZoneContext;
};

const HeroCenteredBackground = ({
  slice,
  context
}: HeroCenteredBackgroundProps) => {
  return (
    <SliceLayout
      theme={context.theme ?? "light"}
      className="relative overflow-hidden"
    >
      <div className="container items-center relative z-10 md:py-12 2xl:py-24">
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
      </div>
      {isFilled.image(slice.primary.image) && (
        <PrismicNextImage
          field={slice.primary.image}
          priority
          className="absolute bottom-0 right-0 left-0 hidden md:block w-full"
          fallbackAlt=""
        />
      )}
    </SliceLayout>
  );
};

export default HeroCenteredBackground;
