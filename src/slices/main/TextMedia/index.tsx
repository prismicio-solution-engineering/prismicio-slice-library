import dynamic from "next/dynamic";

import { getTheme } from "@/lib/utils/getTheme";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import type { SliceZoneContext } from "@/lib/types";

const TextMediaDefault = dynamic(() => import("./Default"));
const TextMediaCallout = dynamic(() => import("./Callout"));
const TextMediaIntro = dynamic(() => import("./Intro"));
const TextMediaImage = dynamic(() => import("./Image"));
const TextMediaVideo = dynamic(() => import("./Video"));

/**
 * Props for `MainTextMedia`.
 */
export type MainTextMediaProps = SliceComponentProps<
  Content.MainTextMediaSlice,
  SliceZoneContext
>;

/**
 * Component for "MainTextMedia" Slices.
 */
const MainTextMedia = ({ slice, context }: MainTextMediaProps): JSX.Element => {
  const theme = getTheme(slice.primary.theme, context.theme);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      data-theme={theme}
    >
      {slice.variation === "default" && (
        <TextMediaDefault slice={slice} theme={theme} />
      )}
      {slice.variation === "callout" && (
        <TextMediaCallout slice={slice} theme={theme} />
      )}
      {slice.variation === "intro" && (
        <TextMediaIntro slice={slice} theme={theme} />
      )}
      {slice.variation === "image" && (
        <TextMediaImage slice={slice} theme={theme} />
      )}
      {slice.variation === "video" && (
        <TextMediaVideo slice={slice} theme={theme} />
      )}
    </section>
  );
};

export default MainTextMedia;
