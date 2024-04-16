import clsx from "clsx";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { Copy } from "@/components/modules/Copy";
import { Heading } from "@/components/ui/Heading";
import { Content } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

export type TextMediaIntroProps = {
  slice: Content.MainTextMediaSliceIntro;
  theme: SliceZoneContext["theme"];
};

const TextMediaIntro = async ({ slice, theme }: TextMediaIntroProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme} padding="small">
      <div className="container md:grid md:grid-cols-12 md:gap-6">
        <div className="md:col-span-10 md:col-start-2 lg:px-14">
          <div className="xl:px-32">
            <Heading field={slice.primary.heading} className="text-center" />
          </div>
          <Copy
            field={slice.primary.subheading}
            muted
            slimExceptImages={true}
            theme={theme}
            size="lg"
            className="mt-6 text-center"
          />
        </div>
      </div>
    </SliceLayout>
  );
};

export default TextMediaIntro;
