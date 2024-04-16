import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";
import { Heading } from "@/components/ui/Heading";
import { Icon } from "@/components/ui/Icon";

import CheckIcon from "@/assets/svg/check-icon.svg";
import { CallToActions } from "@/components/modules/CallToActions";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { BorderWrap } from "@/components/ui/BorderWrap";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type BenefitsDefaultProps = {
  slice: Content.MainBenefitsSliceDefault;
  theme: SliceZoneContext["theme"];
};

const BenefitsDefault = ({ slice, theme }: BenefitsDefaultProps) => {
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
        >
          <CallToActions
            items={[
              {
                link: slice.primary.link,
                link_style: "tertiary",
                link_label: slice.primary.link_label
              }
            ]}
            theme={theme}
            clickPosition="benefits_default"
            buttonClasses="mt-10 inline-block"
            className="justify-center"
          />
        </SliceHeader>
        <div className="mt-8 2xl:mt-14 first:mt-0">
          <ul className="flex flex-wrap gap-y-4 2xl:gap-y-6 -mx-2 2xl:-mx-3">
            {slice.items.map((item, index) => (
              <li
                key={index}
                className="w-full px-2 2xl:px-3 md:w-1/2 lg:w-1/3 grow"
              >
                <div
                  className={clsx(
                    "border-2 p-6 rounded-xl h-full flex flex-col md:p-6 justify-center",
                    {
                      "border-gray-EE": theme === "light",
                      "border-gray-30": theme === "dark"
                    }
                  )}
                >
                  <div className="flex flex-row gap-4 md:justify-center items-center">
                    {isFilled.image(item.icon) ? (
                      <Icon
                        src={item.icon.url}
                        size="sm"
                        color="purple"
                        className="shrink-0"
                        fallback={item.icon}
                        theme={theme}
                      />
                    ) : slice.primary.numbered_list ? (
                      <span className="bg-primary-purple text-primary-purple bg-opacity-20 w-8 h-8 rounded-lg shrink-0 text-center font-bold flex items-center justify-center text-md">
                        {index + 1}
                      </span>
                    ) : (
                      <CheckIcon className="text-primary-purple w-8 h-8 shrink-0" />
                    )}
                    <Heading size="sm" field={item.heading} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {isFilled.image(slice.primary.image) && (
          <BorderWrap theme={theme} className="mt-12">
            <PrismicNextImage
              field={slice.primary.image}
              className="w-full"
              fallbackAlt=""
            />
          </BorderWrap>
        )}
      </div>
    </SliceLayout>
  );
};

export default BenefitsDefault;
