import { SliceLayout } from "@/components/layout/SliceLayout";
import { Copy } from "@/components/modules/Copy";
import { Heading } from "@/components/ui/Heading";
import { ImageCaption } from "@/components/ui/ImageCaption";

import { CallToActions } from "@/components/modules/CallToActions";
import { BorderWrap } from "@/components/ui/BorderWrap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type BenefitsImageTextLeftProps = {
  slice: Content.MainBenefitsSliceImageTextLeft;
  theme: SliceZoneContext["theme"];
};

const BenefitsImageTextLeft = ({
  slice,
  theme
}: BenefitsImageTextLeftProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container flex flex-col md:flex-row gap-6 md:items-center">
        <div className="md:w-1/2 order-2 md:pl-14 md:order-last">
          {isFilled.keyText(slice.primary.eyebrow) && (
            <Eyebrow
              text={slice.primary.eyebrow}
              color={slice.primary.eyebrow_color}
            />
          )}
          <Heading
            size={
              isFilled.richText(slice.primary.heading) &&
              slice.primary.heading[0].type === "heading3"
                ? "lg"
                : "2xl"
            }
            field={slice.primary.heading}
            className="mt-2 first:mt-0"
          />
          <Copy
            field={slice.primary.subheading}
            className="mt-6 max-w-lg"
            muted
            theme={theme}
          />
          <CallToActions
            className="mt-8"
            items={slice.items}
            clickPosition="benefits_imageTextLeft"
          />
        </div>
        <figure className="md:w-1/2">
          <BorderWrap theme={theme}>
            <PrismicNextImage
              field={slice.primary.image}
              className="w-full"
              fallbackAlt=""
            />
          </BorderWrap>
          <ImageCaption
            text={slice.primary.caption}
            theme={theme}
            className="text-center"
          />
        </figure>
      </div>
    </SliceLayout>
  );
};

export default BenefitsImageTextLeft;
