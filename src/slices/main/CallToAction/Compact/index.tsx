import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";

import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { Heading } from "@/components/ui/Heading";
import { Content } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

export type CallToActionCompactProps = {
  slice: Content.MainCallToActionSliceCompact;
  theme: SliceZoneContext["theme"];
  padding?: "top" | "bottom" | "both" | "none";
};

const CallToActionCompact = ({
  slice,
  theme,
  padding
}: CallToActionCompactProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme} padding={padding}>
      <div className="container">
        <div
          className={clsx(
            "rounded-xl p-8 lg:p-12 flex flex-col items-start md:flex-row md:items-center justify-between gap-6",
            {
              "bg-white text-gray-15": theme === "dark",
              "bg-gray-15 text-white": theme === "light"
            }
          )}
        >
          <div className="max-w-3xl">
            <Heading size="xl" field={slice.primary.heading} />
            <Copy
              size="lg"
              field={slice.primary.subheading}
              className="mt-6"
              theme={theme === "light" ? "dark" : "light"}
              muted
            />
          </div>
          <div>
            <CallToActions
              items={slice.items}
              theme={theme === "light" ? "dark" : "light"}
              className="w-full max-w-xs"
            />
          </div>
        </div>
      </div>
    </SliceLayout>
  );
};

export default CallToActionCompact;
