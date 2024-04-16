import dynamic from "next/dynamic";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import type { SliceZoneContext } from "@/lib/types";

const HeroDefault = dynamic(() => import("./Default"));
const HeroCentered = dynamic(() => import("./Centered"));
const HeroCenteredBackground = dynamic(() => import("./CenteredBackground"));
const HeroCenteredImage = dynamic(() => import("./CenteredImage"));
const HeroCenteredVideo = dynamic(() => import("./CenteredVideo"));
const HeroHomepage = dynamic(() => import("./Homepage"));
const HeroCards = dynamic(() => import("./Cards"));

/**
 * Props for `MainHero`.
 */
export type MainHeroProps = SliceComponentProps<
  Content.MainHeroSlice,
  SliceZoneContext
>;

/**
 * Component for "MainHero" Slices.
 */
const MainHero = ({ slice, context }: MainHeroProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      data-theme={context.theme ?? "light"}
      data-intellimize-id={slice.primary.allow_personalization && "hero-slice"}
    >
      {slice.variation === "default" && (
        <HeroDefault slice={slice} context={context} />
      )}
      {slice.variation === "centered" && (
        <HeroCentered slice={slice} context={context} />
      )}
      {slice.variation === "centeredBackground" && (
        <HeroCenteredBackground slice={slice} context={context} />
      )}
      {slice.variation === "centeredImage" && (
        <HeroCenteredImage slice={slice} context={context} />
      )}
      {slice.variation === "centeredVideo" && (
        <HeroCenteredVideo slice={slice} context={context} />
      )}
      {slice.variation === "homepage" && (
        <HeroHomepage slice={slice} context={context} />
      )}
      {slice.variation === "cards" && (
        <HeroCards slice={slice} context={context} />
      )}
    </section>
  );
};

export default MainHero;
