import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";

import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type FeaturesTwoColumnsIllustrationProps = {
  slice: Content.MainFeaturesSliceTwoColumnsIllustration;
  theme: SliceZoneContext["theme"];
};

const FeaturesTwoColumnsIllustration = ({
  slice,
  theme
}: FeaturesTwoColumnsIllustrationProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container">
        <SliceHeader
          heading={slice.primary.heading}
          subheading={slice.primary.subheading}
          theme={theme}
        />
        <div className="mt-8 2xl:mt-14 first:mt-0">
          <ul className="flex flex-wrap flex-col gap-y-4 md:grid md:grid-cols-2 md:grid-rows-2 2xl:gap-y-6 -mx-2 2xl:-mx-3">
            {slice.items.map((item, index) => (
              <li
                key={index}
                className={clsx(
                  "w-full px-2 2xl:px-3 grow row-span-1 col-span-1",
                  {
                    "order-1": index === 0,
                    "order-2 md:order-3": index === 1,
                    "md:row-span-2 order-3 md:order-2": index === 2
                  }
                )}
              >
                <div
                  className={clsx(
                    "p-6 rounded-xl h-full flex flex-col md:p-12",
                    {
                      "bg-gray-F7 text-gray-15": theme === "light",
                      "bg-gray-1F text-white": theme === "dark"
                    }
                  )}
                >
                  <div>
                    {index === 2 &&
                      isFilled.image(slice.primary.image) &&
                      (slice.primary.image_offset === true ? (
                        <div className="w-full mb-10 relative">
                          <svg
                            viewBox={`0 0 ${slice.primary.image.dimensions.width} ${slice.primary.image.dimensions.height}`}
                          />
                          <PrismicNextImage
                            field={slice.primary.image}
                            className="scale-[1.2] h-auto w-full origin-bottom absolute bottom-0 left-0"
                            fallbackAlt=""
                          />
                        </div>
                      ) : (
                        <div className="w-full mb-10 rounded-xl overflow-hidden">
                          <PrismicNextImage
                            field={slice.primary.image}
                            sizes="100vw"
                            className="w-full h-auto"
                            fallbackAlt=""
                          />
                        </div>
                      ))}
                    <div className="flex flex-col">
                      {isFilled.image(item.icon) && (
                        <Icon
                          src={item.icon.url}
                          size="md"
                          color={item.icon_color}
                          className="mb-6"
                          fallback={item.icon}
                          theme={theme}
                        />
                      )}
                      <Heading size="md" field={item.heading} />
                    </div>
                    <Copy
                      field={item.subheading}
                      className="mt-4 max-w-[46em]"
                      muted
                      theme={theme}
                    />
                  </div>
                  <CallToActions
                    items={[
                      {
                        link: item.link,
                        link_style: "tertiary",
                        link_label: item.link_label
                      }
                    ]}
                    theme={theme}
                    clickPosition="features_TwoColumnsIllustration"
                    buttonClasses="mt-10 inline-block"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SliceLayout>
  );
};

export default FeaturesTwoColumnsIllustration;
