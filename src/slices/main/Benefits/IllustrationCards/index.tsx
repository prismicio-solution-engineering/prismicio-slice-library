import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";

import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { BorderWrap } from "@/components/ui/BorderWrap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type BenefitsIllustrationCardsProps = {
  slice: Content.MainBenefitsSliceIllustrationCards;
  theme: SliceZoneContext["theme"];
};

type BoxItemProps = {
  item: Content.MainBenefitsSliceIllustrationCardsItem;
  theme: SliceZoneContext["theme"];
  fullWidth: boolean;
};

const BoxItem = ({ item, theme, fullWidth }: BoxItemProps) => {
  return (
    <BorderWrap
      theme={theme}
      className="h-full"
      innerClassName="h-full"
      disableOnDark
    >
      <div
        className={clsx("h-full relative flex-1 flex flex-col", {
          "bg-quaternary-orange dark-copy": item.background_color === "orange",
          "bg-quaternary-purple dark-copy ": item.background_color === "purple",
          "bg-quaternary-pink dark-copy": item.background_color === "pink",
          "bg-quaternary-blue dark-copy": item.background_color === "blue",
          "bg-quaternary-green dark-copy": item.background_color === "green",
          "bg-gray-EE":
            (item.background_color === "none" || !item.background_color) &&
            theme === "light",
          "bg-gray-1F":
            (item.background_color === "none" || !item.background_color) &&
            theme === "dark"
        })}
      >
        <div className="relative z-10 px-6 md:px-14 order-1 py-6 md:py-14 md:pb-0">
          {isFilled.keyText(item.eyebrow) && (
            <Eyebrow
              text={item.eyebrow}
              color={
                isFilled.select(item.background_color) &&
                item.background_color !== "none" &&
                item.background_color
              }
            />
          )}
          <Heading size="xl" field={item.heading} className="mt-2 max-w-sm" />
          <Copy
            field={item.subheading}
            className="mt-6 max-w-sm"
            muted
            theme={
              item.background_color === "none" || !item.background_color
                ? theme === "dark"
                  ? "dark"
                  : "light"
                : "light"
            }
          />
          <CallToActions
            theme={
              item.background_color === "none" || !item.background_color
                ? theme === "dark"
                  ? "dark"
                  : "light"
                : "light"
            }
            className="mt-6"
            items={[
              {
                link_label: item.link_label,
                link: item.link,
                link_style: "tertiary"
              }
            ]}
          />
        </div>
        <div
          className={clsx("flex justify-end grow order-2 items-end", {
            "pl-14": !fullWidth
          })}
        >
          <PrismicNextImage
            field={item.illustration}
            className={clsx({
              "w-full": fullWidth
            })}
          />
        </div>
      </div>
    </BorderWrap>
  );
};

const BenefitsIllustrationCards = ({
  slice,
  theme
}: BenefitsIllustrationCardsProps) => {
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
        <div className="flex flex-col lg:flex-row gap-4 2xl:gap-6 mt-8 2xl:mt-14 first:mt-0">
          {slice.items.map((item, index) => (
            <div key={index} className="lg:w-1/2">
              <BoxItem
                item={item}
                theme={theme}
                fullWidth={slice.primary.full_width_illustrations}
              />
            </div>
          ))}
        </div>
      </div>
    </SliceLayout>
  );
};

export default BenefitsIllustrationCards;
