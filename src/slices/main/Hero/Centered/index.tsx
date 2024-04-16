import clsx from "clsx";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Content, isFilled } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

export type HeroCenteredProps = {
  slice: Content.MainHeroSliceCentered;
  context: SliceZoneContext;
};

const HeroCentered = ({ slice, context }: HeroCenteredProps) => {
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
    </SliceLayout>
  );
};

export default HeroCentered;
