import dynamic from "next/dynamic";

import { getTheme } from "@/lib/utils/getTheme";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import type { SliceZoneContext } from "@/lib/types";

const HowItWorksDefault = dynamic(() => import("./Default"));
const HowItWorksCards = dynamic(() => import("./Cards"));
const HowItWorksSticky = dynamic(() => import("./Sticky"));

/**
 * Props for `MainHowItWorks`.
 */
export type MainHowItWorksProps = SliceComponentProps<
  Content.MainHowItWorksSlice,
  SliceZoneContext
>;

/**
 * Component for "MainHowItWorks" Slices.
 */
const MainHowItWorks = ({
  slice,
  context
}: MainHowItWorksProps): JSX.Element => {
  const theme = getTheme(slice.primary.theme, context.theme);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      data-theme={theme}
    >
      {slice.variation === "default" && (
        <HowItWorksDefault slice={slice} theme={theme} />
      )}
      {slice.variation === "cards" && (
        <HowItWorksCards slice={slice} theme={theme} />
      )}
      {slice.variation === "sticky" && (
        <HowItWorksSticky slice={slice} theme={theme} />
      )}
    </section>
  );
};

export default MainHowItWorks;
