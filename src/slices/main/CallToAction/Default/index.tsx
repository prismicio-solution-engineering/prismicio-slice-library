import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";

import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { Heading } from "@/components/ui/Heading";
import { generateBackgroundClasses } from "@/lib/utils/generateBackgroundClasses";
import { Content, isFilled } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

export type CallToActionDefaultProps = {
  slice: Content.MainCallToActionSliceDefault;
  theme: SliceZoneContext["theme"];
  padding?: "top" | "bottom" | "both" | "none";
};

const CallToActionDefault = ({
  slice,
  theme,
  padding
}: CallToActionDefaultProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme} padding={padding}>
      <div className="container">
        <div
          className={clsx(
            "relative px-12 rounded-xl",
            generateBackgroundClasses(slice.primary.background_color),
            {
              "py-16 lg:py-20 2xl:py-32": !slice.primary.narrow_design,
              "py-12": slice.primary.narrow_design
            }
          )}
        >
          <div className="relative z-10 text-center">
            {isFilled.title(slice.primary.heading) && (
              <Heading
                size="2xl"
                field={slice.primary.heading}
                className="mx-auto max-w-[14em]"
              />
            )}
            {isFilled.richText(slice.primary.subheading) && (
              <Copy
                size={slice.primary.narrow_design ? "md" : "lg"}
                field={slice.primary.subheading}
                className="mt-6 max-w-[632px] mx-auto"
                muted
              />
            )}
            {slice.items.length > 0 && (
              <CallToActions
                items={slice.items}
                className={clsx("mt-6 flex justify-center", {
                  "lg:mt-10": !slice.primary.narrow_design
                })}
                clickPosition="call_to_action_slice_default"
              />
            )}
          </div>
        </div>
      </div>
    </SliceLayout>
  );
};

export default CallToActionDefault;
