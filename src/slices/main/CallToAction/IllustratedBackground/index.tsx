import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";

import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { BorderWrap } from "@/components/ui/BorderWrap";
import { Heading } from "@/components/ui/Heading";
import { generateBackgroundClasses } from "@/lib/utils/generateBackgroundClasses";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type CallToActionIllustratedBackgroundProps = {
  slice: Content.MainCallToActionSliceIllustratedBackground;
  theme: SliceZoneContext["theme"];
};

const CallToActionIllustratedBackground = ({
  slice,
  theme
}: CallToActionIllustratedBackgroundProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container">
        <BorderWrap theme={theme}>
          <div
            className={clsx(
              "relative py-[25%] px-[10%] md:py-[14%] md:px-[25%]",
              generateBackgroundClasses(slice.primary.background_color)
            )}
          >
            <div className="relative z-10 flex items-center justify-center text-center">
              <div className="max-w-[512px]">
                <Heading size="2xl" field={slice.primary.heading} />
                <Copy
                  size="lg"
                  field={slice.primary.subheading}
                  className="mt-6"
                  muted
                />
                <CallToActions
                  items={slice.items}
                  theme="light"
                  className="mt-6 lg:mt-10 justify-center"
                  clickPosition="call_to_action_slice_illustrated_background"
                />
              </div>
            </div>
            <div className="absolute top-0 bottom-0 right-0 left-0">
              <PrismicNextImage
                className="object-cover object-center"
                field={slice.primary.image}
                fill
                sizes="50vw"
                fallbackAlt=""
              />
            </div>
          </div>
        </BorderWrap>
      </div>
    </SliceLayout>
  );
};

export default CallToActionIllustratedBackground;
