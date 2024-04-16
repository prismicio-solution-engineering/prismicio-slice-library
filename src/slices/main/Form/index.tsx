import dynamic from "next/dynamic";

import { getTheme } from "@/lib/utils/getTheme";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import type { SliceZoneContext } from "@/lib/types";

const FormDemo = dynamic(() => import("./Demo"));

/**
 * Props for `MainForm`.
 */
export type MainFormProps = SliceComponentProps<
  Content.MainFormSlice,
  SliceZoneContext
>;

/**
 * Component for "MainForm" Slices.
 */
const MainForm = ({ slice, context }: MainFormProps): JSX.Element => {
  const theme = getTheme(slice.primary.theme, context.theme);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      data-theme={theme}
    >
      {slice.variation === "demo" && <FormDemo slice={slice} theme={theme} />}
    </section>
  );
};

export default MainForm;
