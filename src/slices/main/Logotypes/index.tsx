import dynamic from "next/dynamic";

import { getTheme } from "@/lib/utils/getTheme";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import type { SliceZoneContext } from "@/lib/types";

const LogotypesDefault = dynamic(() => import("./Default"));

/**
 * Props for `MainLogotypes`.
 */
export type MainLogotypesProps = SliceComponentProps<
  Content.MainLogotypesSlice,
  SliceZoneContext
>;

/**
 * Component for "MainLogotypes" Slices.
 */
const MainLogotypes = ({ slice, context }: MainLogotypesProps): JSX.Element => {
  const removedBackground = slice.primary.remove_background;
  const theme = getTheme(slice.primary.theme, context.theme);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      data-theme={theme}
      data-theme-variation={!removedBackground && "muted"}
    >
      {slice.variation === "default" && (
        <LogotypesDefault slice={slice} theme={theme} />
      )}
    </section>
  );
};

export default MainLogotypes;
