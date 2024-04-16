import dynamic from "next/dynamic";

import { getTheme } from "@/lib/utils/getTheme";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import type { SliceZoneContext } from "@/lib/types";

const FeaturesDefault = dynamic(() => import("./Default"));
const FeaturesFourColumns = dynamic(() => import("./FourColumns"));
const FeaturesTwoColumns = dynamic(() => import("./TwoColumns"));
const FeaturesTwoColumnsIllustration = dynamic(
  () => import("./TwoColumnsIllustration")
);
const FeaturesNumbers = dynamic(() => import("./Numbers"));
const FeaturesTwoColumnsSmallImage = dynamic(
  () => import("./TwoColumnsSmallImage")
);
const FeaturesTwoColumnsLargeImage = dynamic(
  () => import("./TwoColumnsLargeImage")
);
const FeaturesThreeColumnsLargeImage = dynamic(
  () => import("./ThreeColumnsLargeImage")
);
const FeaturesFrameworks = dynamic(() => import("./Frameworks"));

/**
 * Props for `MainFeatures`.
 */
export type MainFeaturesProps = SliceComponentProps<
  Content.MainFeaturesSlice,
  SliceZoneContext
>;

/**
 * Component for "MainFeatures" Slices.
 */
const MainFeatures = ({ slice, context }: MainFeaturesProps): JSX.Element => {
  const theme = getTheme(slice.primary.theme, context.theme);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      data-theme={theme}
    >
      {slice.variation === "default" && (
        <FeaturesDefault slice={slice} theme={theme} />
      )}
      {slice.variation === "fourColumns" && (
        <FeaturesFourColumns slice={slice} theme={theme} />
      )}
      {slice.variation === "twoColumns" && (
        <FeaturesTwoColumns slice={slice} theme={theme} />
      )}
      {slice.variation === "twoColumnsIllustration" && (
        <FeaturesTwoColumnsIllustration slice={slice} theme={theme} />
      )}
      {slice.variation === "numbers" && (
        <FeaturesNumbers slice={slice} theme={theme} />
      )}
      {slice.variation === "twoColumnsSmallImage" && (
        <FeaturesTwoColumnsSmallImage slice={slice} theme={theme} />
      )}
      {slice.variation === "twoColumnsLargeImage" && (
        <FeaturesTwoColumnsLargeImage slice={slice} theme={theme} />
      )}
      {slice.variation === "threeColumnsLargeImage" && (
        <FeaturesThreeColumnsLargeImage slice={slice} theme={theme} />
      )}
      {slice.variation === "frameworks" && (
        <FeaturesFrameworks slice={slice} theme={theme} />
      )}
    </section>
  );
};

export default MainFeatures;
