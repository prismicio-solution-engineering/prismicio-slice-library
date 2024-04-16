import clsx from "clsx";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { BorderWrap } from "@/components/ui/BorderWrap";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type TextMediaImageProps = {
  slice: Content.MainTextMediaSliceImage;
  theme: SliceZoneContext["theme"];
};

const TextMediaImage = async ({ slice, theme }: TextMediaImageProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme} padding="small">
      <div
        className={clsx("container", {
          "md:grid md:grid-cols-12": !slice.primary.full_width
        })}
      >
        <div
          className={clsx({
            "md:col-span-10 md:col-start-2 lg:px-14": !slice.primary.full_width
          })}
        >
          <BorderWrap
            className="w-full"
            theme={theme ?? "light"}
            noBorder={slice.primary.remove_border}
          >
            <PrismicNextImage
              field={slice.primary.image}
              className="w-full"
              fallbackAlt=""
            />
          </BorderWrap>
        </div>
      </div>
    </SliceLayout>
  );
};

export default TextMediaImage;
