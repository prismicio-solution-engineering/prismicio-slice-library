import { SliceLayout } from "@/components/layout/SliceLayout";
import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Content, isFilled } from "@prismicio/client";

import { Animation } from "./Animation";

import type { SliceZoneContext } from "@/lib/types";

export type HeroHomepageProps = {
  context: SliceZoneContext;
  slice: Content.MainHeroSliceHomepage;
};

const HeroHomepage = ({ slice, context }: HeroHomepageProps) => {
  return (
    <SliceLayout
      theme={context.theme ?? "light"}
      className="items-center relative"
    >
      <div className="mx-auto text-center flex flex-col items-center z-20 container">
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
            className="mt-4 lg:mt-6 max-w-xl"
            smallLists={true}
            horizontalLists={true}
            theme={context.theme}
            muted
          />
        )}
        {slice.items.length > 0 && (
          <CallToActions
            items={slice.items}
            theme={context.theme}
            className="mt-6 lg:mt-8 mx-auto justify-center"
            clickPosition={`hero_slice_${slice.variation}`}
          />
        )}
      </div>
      <Animation slice={slice} theme={context.theme} />
    </SliceLayout>
  );
};

export default HeroHomepage;
