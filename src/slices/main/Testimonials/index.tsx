import dynamic from "next/dynamic";

import { getTheme } from "@/lib/utils/getTheme";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import type { SliceZoneContext } from "@/lib/types";

const TestimonialsDefault = dynamic(() => import("./Default"));
const TestimonialsCaseStudy = dynamic(() => import("./CaseStudy"));
const TestimonialsPhotoSlider = dynamic(() => import("./PhotoSlider"));
const TestimonialsWebsiteSlider = dynamic(() => import("./WebsiteSlider"));
const TestimonialsPhotoCards = dynamic(() => import("./PhotoCards"));
const TestimonialsVideoSlider = dynamic(() => import("./VideoSlider"));

/**
 * Props for `MainTestimonials`.
 */
export type MainTestimonialsProps = SliceComponentProps<
  Content.MainTestimonialsSlice,
  SliceZoneContext
>;

/**
 * Component for "MainTestimonials" Slices.
 */
const MainTestimonials = ({
  slice,
  context
}: MainTestimonialsProps): JSX.Element => {
  const theme = getTheme(slice.primary.theme, context.theme);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      data-theme={theme}
    >
      {slice.variation === "default" && (
        <TestimonialsDefault slice={slice} theme={theme} />
      )}
      {slice.variation === "caseStudy" && (
        <TestimonialsCaseStudy slice={slice} theme={theme} />
      )}
      {slice.variation === "photoSlider" && (
        <TestimonialsPhotoSlider slice={slice} theme={theme} />
      )}
      {slice.variation === "websiteSlider" && (
        <TestimonialsWebsiteSlider slice={slice} theme={theme} />
      )}
      {slice.variation === "photoCards" && (
        <TestimonialsPhotoCards slice={slice} theme={theme} />
      )}
      {slice.variation === "videoSlider" && (
        <TestimonialsVideoSlider slice={slice} theme={theme} />
      )}
    </section>
  );
};

export default MainTestimonials;
