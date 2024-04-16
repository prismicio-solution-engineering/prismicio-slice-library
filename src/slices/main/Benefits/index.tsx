import dynamic from 'next/dynamic';

import { getTheme } from '@/lib/utils/getTheme';
import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import type { SliceZoneContext } from "@/lib/types";

const BenefitsDefault = dynamic(() => import("./Default"));
const BenefitsImageTextRight = dynamic(() => import("./ImageTextRight"));
const BenefitsImageTextLeft = dynamic(() => import("./ImageTextLeft"));
const BenefitsImageAccordion = dynamic(() => import("./ImageAccordion"));
const BenefitsAnimationCards = dynamic(() => import("./AnimationCards"));
const BenefitsAnimationTextRight = dynamic(
  () => import("./AnimationTextRight")
);
const BenefitsAnimationTextLeft = dynamic(() => import("./AnimationTextLeft"));
const BenefitsTextImageGrid = dynamic(() => import("./TextImageGrid"));
const BenefitsIllustrationCards = dynamic(() => import("./IllustrationCards"));
const BenefitsTextIllustration = dynamic(() => import("./TextIllustration"));

/**
 * Props for `MainBenefits`.
 */
export type MainBenefitsProps = SliceComponentProps<
  Content.MainBenefitsSlice,
  SliceZoneContext
>;

/**
 * Component for "MainBenefits" Slices.
 */
const MainBenefits = ({ slice, context }: MainBenefitsProps): JSX.Element => {
  if (!slice.variation) return <></>;
  const theme = getTheme(slice.primary.theme, context.theme);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      data-theme={theme}
    >
      {slice.variation === "default" && (
        <BenefitsDefault slice={slice} theme={theme} />
      )}
      {slice.variation === "imageTextRight" && (
        <BenefitsImageTextRight slice={slice} theme={theme} />
      )}
      {slice.variation === "imageTextLeft" && (
        <BenefitsImageTextLeft slice={slice} theme={theme} />
      )}
      {slice.variation === "imageAccordion" && (
        <BenefitsImageAccordion slice={slice} theme={theme} />
      )}
      {slice.variation === "animationCards" && (
        <BenefitsAnimationCards slice={slice} theme={theme} />
      )}
      {slice.variation === "animationTextRight" && (
        <BenefitsAnimationTextRight slice={slice} theme={theme} />
      )}
      {slice.variation === "animationTextLeft" && (
        <BenefitsAnimationTextLeft slice={slice} theme={theme} />
      )}
      {slice.variation === "textImageGrid" && (
        <BenefitsTextImageGrid slice={slice} theme={theme} />
      )}
      {slice.variation === "illustrationCards" && (
        <BenefitsIllustrationCards slice={slice} theme={theme} />
      )}
      {slice.variation === "textIllustration" && (
        <BenefitsTextIllustration slice={slice} theme={theme} />
      )}
    </section>
  );
};

export default MainBenefits;
