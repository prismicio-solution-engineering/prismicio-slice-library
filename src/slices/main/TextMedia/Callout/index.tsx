import clsx from "clsx";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { Copy } from "@/components/modules/Copy";
import { Content } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

export type TextMediaCalloutProps = {
  slice: Content.MainTextMediaSliceCallout;
  theme: SliceZoneContext["theme"];
};

const TextMediaCallout = async ({ slice, theme }: TextMediaCalloutProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme} padding="small">
      <div className="container md:grid md:grid-cols-12 md:gap-6">
        <div className="md:col-span-10 md:col-start-2 lg:px-14">
          <Copy
            field={slice.primary.rich_text}
            muted
            slimExceptImages={true}
            theme={theme}
            className={clsx(
              "rounded-2xl my-12 md:my-0 md:first:mt-0 p-6 lg:p-12 xl:px-0",
              {
                "bg-gray-F7": theme === "light",
                "bg-gray-1F": theme === "dark"
              }
            )}
          />
        </div>
      </div>
    </SliceLayout>
  );
};

export default TextMediaCallout;
