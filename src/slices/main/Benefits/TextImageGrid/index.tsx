import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";
import { Copy } from "@/components/modules/Copy";
import { Heading } from "@/components/ui/Heading";
import { ImageCaption } from "@/components/ui/ImageCaption";

import { BorderWrap } from "@/components/ui/BorderWrap";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type BenefitsTextImageGridProps = {
  slice: Content.MainBenefitsSliceTextImageGrid;
  theme: SliceZoneContext["theme"];
};

const BenefitsTextImageGrid = ({
  slice,
  theme
}: BenefitsTextImageGridProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout theme={theme} sliceTheme={themeFromSlice}>
      <div className="container md:grid md:grid-cols-12 md:gap-x-6">
        <div className="md:col-span-5 mb-10 md:mb-20 flex flex-col gap-6">
          <Heading field={slice.primary.heading} size="2xl" />
          <Copy field={slice.primary.first_column} muted theme={theme} />
        </div>
        <div
          className={clsx("md:col-span-5 md:col-start-7", {
            "md:mt-[35%] mb-10 md:-mb-32":
              slice.primary.layout === "Square | Landscape | Portrait",
            "md:mt-[40%] mb-10 md:-mb-32":
              slice.primary.layout === "Portrait | Landscape | Square"
          })}
        >
          <Copy
            field={slice.primary.second_column}
            muted
            theme={theme}
            className={clsx({
              "p-12 rounded-xl": slice.primary.highlight_second_column,
              "bg-gray-F7":
                slice.primary.highlight_second_column && theme === "light",
              "bg-gray-1F":
                slice.primary.highlight_second_column && theme === "dark"
            })}
          />
        </div>
      </div>
      <div className="container">
        <div className="grid grid-cols-12 gap-x-6">
          <BorderWrap
            theme={theme}
            className={clsx("relative z-20", {
              "col-span-4 col-start-2":
                slice.primary.layout === "Square | Landscape | Portrait",
              "col-span-5":
                slice.primary.layout === "Portrait | Landscape | Square"
            })}
          >
            <PrismicNextImage
              field={
                slice.primary.layout === "Square | Landscape | Portrait"
                  ? slice.primary.image_square
                  : slice.primary.image_portrait
              }
            />
          </BorderWrap>
          <div
            className={clsx("col-span-9 relative", {
              "-mt-[9%]":
                slice.primary.layout === "Square | Landscape | Portrait",
              "col-start-4 -mt-[50%]":
                slice.primary.layout === "Portrait | Landscape | Square"
            })}
          >
            <BorderWrap theme={theme} className="relative">
              <PrismicNextImage field={slice.primary.image_landscape} />
            </BorderWrap>
            {slice.primary.caption && (
              <ImageCaption
                theme={theme}
                className={clsx("absolute", {
                  "max-w-[80%]":
                    slice.primary.layout === "Square | Landscape | Portrait",
                  "max-w-[45%]":
                    slice.primary.layout === "Portrait | Landscape | Square"
                })}
                text={slice.primary.caption}
              />
            )}
          </div>
          <BorderWrap
            theme={theme}
            className={clsx("relative col-start-8 z-10", {
              "col-span-5 -mt-[78%]":
                slice.primary.layout === "Square | Landscape | Portrait",
              "col-span-4 -mt-[32%]":
                slice.primary.layout === "Portrait | Landscape | Square"
            })}
          >
            <PrismicNextImage
              field={
                slice.primary.layout === "Square | Landscape | Portrait"
                  ? slice.primary.image_portrait
                  : slice.primary.image_square
              }
            />
          </BorderWrap>
        </div>
      </div>
    </SliceLayout>
  );
};

export default BenefitsTextImageGrid;
