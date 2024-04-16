"use client";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { CallToActions } from "@/components/modules/CallToActions";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { Content, isFilled } from "@prismicio/client";

import KanbanSwiper from "./KanbanSwiper";

import type { SliceZoneContext } from "@/lib/types";
type FeaturedPartnerProps = {
  slice: Content.MainFeaturedSliceKanbanCards;
  theme: SliceZoneContext["theme"];
};

const FeaturedPartner = ({ slice, theme }: FeaturedPartnerProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container">
        <SliceHeader
          theme={theme}
          heading={slice.primary.heading}
          subheading={slice.primary.subheading}
          align="center"
        />
        <KanbanSwiper theme={theme} slice={slice} />
        {isFilled.link(slice.primary.link) && (
          <div className="flex justify-center mt-12">
            <CallToActions
              theme={theme}
              items={[
                {
                  link: slice.primary.link,
                  link_label: slice.primary.link_label,
                  link_style: slice.primary.link_style
                }
              ]}
            />
          </div>
        )}
      </div>
    </SliceLayout>
  );
};

export default FeaturedPartner;
