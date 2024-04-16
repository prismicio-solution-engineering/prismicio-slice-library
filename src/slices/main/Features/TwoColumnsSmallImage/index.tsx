import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";

import { Copy } from "@/components/modules/Copy";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { Heading } from "@/components/ui/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type FeaturesTwoColumnsSmallImageProps = {
  slice: Content.MainFeaturesSliceTwoColumnsSmallImage;
  theme: SliceZoneContext["theme"];
};

const FeaturesTwoColumnsSmallImage = ({
  slice,
  theme
}: FeaturesTwoColumnsSmallImageProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container">
        <SliceHeader
          heading={slice.primary.heading}
          subheading={slice.primary.subheading}
          theme={theme}
          align="center"
        />
        <div className="mt-8 2xl:mt-14 first:mt-0">
          <ul className="flex flex-wrap gap-y-4 2xl:gap-y-6 -mx-2 2xl:-mx-3">
            {slice.items.map((item, index) => (
              <li key={index} className="w-full px-2 2xl:px-3 md:w-1/2 grow">
                <div
                  className={clsx(
                    "p-6 rounded-xl h-full flex flex-col md:p-12",
                    {
                      "bg-gray-F7 text-gray-15": theme === "light",
                      "bg-gray-1F text-white": theme === "dark"
                    }
                  )}
                >
                  <Heading size="md" field={item.heading} />
                  <Copy
                    field={item.subheading}
                    className="mt-4 max-w-[46em]"
                    muted
                    theme={theme}
                  />
                  {isFilled.image(item.image) && (
                    <PrismicNextImage
                      field={item.image}
                      className="mt-10 w-full"
                      fallbackAlt=""
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SliceLayout>
  );
};

export default FeaturesTwoColumnsSmallImage;
