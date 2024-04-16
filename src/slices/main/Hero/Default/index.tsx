import { SliceLayout } from "@/components/layout/SliceLayout";
import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { BorderWrap } from "@/components/ui/BorderWrap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type HeroDefaultProps = {
  slice: Content.MainHeroSliceDefault;
  context: SliceZoneContext;
};

const HeroDefault = ({ slice, context }: HeroDefaultProps) => {
  return (
    <SliceLayout
      theme={context.theme ?? "light"}
      className="grid-wrapper container items-center overflow-hidden"
    >
      <div className="col-span-6 md:grid md:grid-cols-6 relative z-10">
        <div className="md:col-span-6 md:pr-4">
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
              className="max-w-[10em]"
            />
          )}
          {isFilled.richText(slice.primary.subheading) && (
            <Copy
              field={slice.primary.subheading}
              size="lg"
              className="mt-4 lg:mt-6 max-w-lg"
              smallLists={true}
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
      <div className="col-span-6 mt-6 sm:mt-0">
        {isFilled.image(slice.primary.image) && (
          <BorderWrap theme={context.theme}>
            <PrismicNextImage
              field={slice.primary.image}
              className="w-full"
              priority
              fallbackAlt=""
            />
          </BorderWrap>
        )}
      </div>
    </SliceLayout>
  );
};

export default HeroDefault;
