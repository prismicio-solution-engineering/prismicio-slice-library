import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";

import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { Heading } from "@/components/ui/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type CallToActionIllustratedBottomProps = {
  slice: Content.MainCallToActionSliceIllustratedBottom;
  theme: SliceZoneContext["theme"];
};

const CallToActionIllustratedBottom = ({
  slice,
  theme
}: CallToActionIllustratedBottomProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme} padding="top">
      <div className="relative flex flex-col">
        <div className="container relative z-10">
          <div className="text-center">
            <Heading
              size="2xl"
              field={slice.primary.heading}
              className="mx-auto max-w-[14em]"
            />
            <Copy
              size="lg"
              field={slice.primary.subheading}
              className="mt-6 max-w-[740px] mx-auto"
              theme={theme}
              muted
            />
            <CallToActions
              items={slice.items}
              theme={theme}
              className="mt-6 lg:mt-10 justify-center"
              clickPosition="call_to_action_slice_illustrated_bottom"
            />
          </div>
        </div>
        <div className="w-full relative -mt-20 h-[400px] md:h-0 md:pb-[33.33%]">
          <PrismicNextImage
            field={slice.primary.image}
            className="absolute h-full w-full object-cover"
            fallbackAlt=""
          />
          <div
            className={clsx(
              "absolute top-0 right-0 left-0 h-full bg-gradient-to-b to-transparent",
              {
                "from-gray-15": theme === "dark",
                "from-white": theme === "light"
              }
            )}
          />
        </div>
      </div>
    </SliceLayout>
  );
};

export default CallToActionIllustratedBottom;
