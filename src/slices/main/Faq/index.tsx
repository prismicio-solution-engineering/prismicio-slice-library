import dynamic from "next/dynamic";

import { getTheme } from "@/lib/utils/getTheme";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import type { SliceZoneContext } from "@/lib/types";

const FaqDefault = dynamic(() => import("./Default"));

/**
 * Props for `MainFaq`.
 */
export type MainFaqProps = SliceComponentProps<
  Content.MainFaqSlice,
  SliceZoneContext
>;

/**
 * Component for "MainFaq" Slices.
 */
const MainFaq = ({ slice, context }: MainFaqProps): JSX.Element => {
  const theme = getTheme(slice.primary.theme, context.theme);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      data-theme={theme}
    >
      {slice.variation === "default" && (
        <FaqDefault slice={slice} theme={theme} />
      )}
    </section>
  );
};

export default MainFaq;
