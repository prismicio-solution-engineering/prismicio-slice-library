import clsx from "clsx";
import dynamic from "next/dynamic";

import { getTheme } from "@/lib/utils/getTheme";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import type { SliceZoneContext } from "@/lib/types";

const CallToActionDefault = dynamic(() => import("./Default"));
const CallToActionIllustrated = dynamic(() => import("./Illustrated"));
const CallToActionillustratedBackground = dynamic(
  () => import("./IllustratedBackground")
);
const CallToActionillustratedBottom = dynamic(
  () => import("./IllustratedBottom")
);
const CallToActionCardsPhoto = dynamic(() => import("./CardsPhoto"));
const CallToActionCardsIllustration = dynamic(
  () => import("./CardsIllustration")
);
const CallToActionCompact = dynamic(() => import("./Compact"));

/**
 * Props for `MainCallToAction`.
 */
export type MainCallToActionProps = SliceComponentProps<
  Content.MainCallToActionSlice,
  SliceZoneContext
>;

/**
 * Component for "MainCallToAction" Slices.
 */
const MainCallToAction = ({
  slice,
  context
}: MainCallToActionProps): JSX.Element => {
  const theme = getTheme(slice.primary.theme, context.theme);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      data-theme={theme}
      data-intellimize-id={slice.primary.allow_personalization && "cta-slice"}
      className={clsx({
        "connect-next-slice":
          slice.variation === "illustratedBottom" &&
          slice.primary.connect_to_next_slice
      })}
    >
      {slice.variation === "default" && (
        <CallToActionDefault slice={slice} theme={theme} />
      )}
      {slice.variation === "illustrated" && (
        <CallToActionIllustrated slice={slice} theme={theme} />
      )}
      {slice.variation === "illustratedBackground" && (
        <CallToActionillustratedBackground slice={slice} theme={theme} />
      )}
      {slice.variation === "illustratedBottom" && (
        <CallToActionillustratedBottom slice={slice} theme={theme} />
      )}
      {slice.variation === "cardsPhoto" && (
        <CallToActionCardsPhoto slice={slice} theme={theme} />
      )}
      {slice.variation === "cardsIllustration" && (
        <CallToActionCardsIllustration slice={slice} theme={theme} />
      )}
      {slice.variation === "compact" && (
        <CallToActionCompact slice={slice} theme={theme} />
      )}
    </section>
  );
};

export default MainCallToAction;
