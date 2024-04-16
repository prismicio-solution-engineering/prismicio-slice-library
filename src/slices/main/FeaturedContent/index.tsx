import dynamic from "next/dynamic";

import { getTheme } from "@/lib/utils/getTheme";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import type { SliceZoneContext } from "@/lib/types";

const FeaturedContentShowcaseSlider = dynamic(() => import("./ShowcaseSlider"));
const FeaturedContentPartner = dynamic(() => import("./Partner"));
const FeaturedContentChangelog = dynamic(() => import("./Changelog"));
const FeaturedContentVideoSummary = dynamic(() => import("./VideoSummary"));
const FeaturedContentTimelineCards = dynamic(() => import("./TimelineCards"));
const FeaturedContentKanbanCards = dynamic(() => import("./KanbanCards"));

/**
 * Props for `MainFeaturedContent`.
 */
export type MainFeaturedContentProps = SliceComponentProps<
  Content.MainFeaturedSlice,
  SliceZoneContext
>;

/**
 * Component for "MainFeaturedContent" Slices.
 */
const MainFeaturedContent = ({
  slice,
  context
}: MainFeaturedContentProps): JSX.Element => {
  const theme = getTheme(slice.primary.theme, context.theme);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      data-theme={theme}
    >
      {slice.variation === "showcaseSlider" && (
        <FeaturedContentShowcaseSlider slice={slice} theme={theme} />
      )}
      {slice.variation === "partner" && (
        <FeaturedContentPartner slice={slice} theme={theme} />
      )}
      {slice.variation === "changelog" && (
        <FeaturedContentChangelog slice={slice} theme={theme} />
      )}
      {slice.variation === "videoSummary" && (
        <FeaturedContentVideoSummary slice={slice} theme={theme} />
      )}
      {slice.variation === "timelineCards" && (
        <FeaturedContentTimelineCards slice={slice} theme={theme} />
      )}
      {slice.variation === "kanbanCards" && (
        <FeaturedContentKanbanCards slice={slice} theme={theme} />
      )}
    </section>
  );
};

export default MainFeaturedContent;
