import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";

import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { Icon } from "@/components/ui/Icon";
import { Content, isFilled } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

export type FeaturesNumbersProps = {
  slice: Content.MainFeaturesSliceNumbers;
  theme: SliceZoneContext["theme"];
};

const FeaturesNumbers = ({ slice, theme }: FeaturesNumbersProps) => {
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
          <ul className="flex flex-wrap gap-y-4 2xl:gap-y-6 -mx-2 2xl:-mx-3">
            {slice.items.map((item, index) => (
              <li
                key={index}
                className="w-full px-2 2xl:px-3 md:w-1/2 lg:w-1/3 grow"
              >
                <div
                  className={clsx(
                    "p-6 rounded-xl h-full flex flex-col md:p-12 justify-between",
                    {
                      "bg-gray-F7 text-gray-15": theme === "light",
                      "bg-gray-1F text-white": theme === "dark"
                    }
                  )}
                >
                  <div>
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
                      {isFilled.keyText(item.number) && (
                        <h2 className="flex gap-2 items-center">
                          <span className="font-headings tracking-tight text-6xl lg:text-7xl 2xl:text-8xl font-semibold">
                            {item.number}
                          </span>
                        </h2>
                      )}
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
                    clickPosition="features_Numbers"
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

export default FeaturesNumbers;
