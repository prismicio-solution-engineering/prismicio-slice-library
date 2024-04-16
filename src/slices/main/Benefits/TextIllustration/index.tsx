import { SliceLayout } from "@/components/layout/SliceLayout";

import { Copy } from "@/components/modules/Copy";
import { Heading } from "@/components/ui/Heading";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type BenefitsTextIllustrationProps = {
  slice: Content.MainBenefitsSliceTextIllustration;
  theme: SliceZoneContext["theme"];
};

const BenefitsTextIllustration = ({
  slice,
  theme
}: BenefitsTextIllustrationProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container grid grid-cols-12 gap-x-6">
        <Heading
          size="2xl"
          field={slice.primary.heading}
          className="col-span-12 max-w-[27.5rem] lg:max-w-[34rem] 2xl:max-w-[41rem] xl:col-span-7 xl:col-start-3"
        />
        <Copy
          field={slice.primary.first_column}
          className="col-span-12 md:col-span-7 xl:col-span-5 xl:col-start-3 mt-8"
          muted
          theme={theme}
        />
        <div className="grid col-span-full grid-cols-12 mt-8 xl:mt-20">
          <PrismicNextImage
            field={slice.primary.image}
            className="col-span-10 col-start-2 -ml-4 md:col-span-6 md:-ml-16 xl:col-span-4 xl:col-start-3 "
          />
          <Copy
            field={slice.primary.second_column}
            className="mt-8 col-span-12 md:col-span-6 xl:col-span-4 xl:col-start-8"
            muted
            theme={theme}
          />
        </div>
      </div>
    </SliceLayout>
  );
};

export default BenefitsTextIllustration;
