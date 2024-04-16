import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";

import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { Heading } from "@/components/ui/Heading";
import { generateBackgroundClasses } from "@/lib/utils/generateBackgroundClasses";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type CallToActionIllustratedProps = {
  slice: Content.MainCallToActionSliceIllustrated;
  theme: SliceZoneContext["theme"];
};

const CallToActionIllustrated = ({
  slice,
  theme
}: CallToActionIllustratedProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container">
        <div
          className={clsx(
            "relative px-12 rounded-xl overflow-hidden",
            generateBackgroundClasses(slice.primary.background_color),
            {
              "py-32": !slice.primary.narrow_design,
              "py-12": slice.primary.narrow_design
            }
          )}
        >
          <div className="relative z-10">
            <div
              className={clsx({
                "max-w-[512px]": !slice.primary.narrow_design,
                "w-full max-w-[564px] sm:w-[80%] md:w-[50%]":
                  slice.primary.narrow_design
              })}
            >
              {isFilled.title(slice.primary.heading) && (
                <Heading size="2xl" field={slice.primary.heading} />
              )}
              {isFilled.richText(slice.primary.subheading) && (
                <Copy
                  size={slice.primary.narrow_design ? "md" : "lg"}
                  field={slice.primary.subheading}
                  className={slice.primary.narrow_design ? "mt-4" : "mt-6"}
                  muted
                />
              )}
              {slice.items.length > 0 && (
                <CallToActions
                  items={slice.items}
                  className={clsx("mt-6", {
                    "lg:mt-10": !slice.primary.narrow_design
                  })}
                  clickPosition="call_to_action_slice_illustrated"
                />
              )}
            </div>
          </div>
          <div
            className={clsx("", {
              "absolute top-0 bottom-0 right-0 left-1/2 lg:left-1/3":
                !slice.primary.narrow_design,
              "hidden md:block h-[300px] relative -mr-12 ml-12 -mb-12 -mt-24 sm:m-0 sm:h-auto sm:absolute sm:top-0 sm:bottom-0 sm:-right-[10%] sm:left-[60%] lg:left-[40%]":
                slice.primary.narrow_design
            })}
          >
            <PrismicNextImage
              className="object-cover object-left"
              field={slice.primary.image}
              fill
              sizes="50vw"
              fallbackAlt=""
            />
          </div>
        </div>
      </div>
    </SliceLayout>
  );
};

export default CallToActionIllustrated;
