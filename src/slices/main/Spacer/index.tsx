import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `MainSpacer`.
 */
export type MainSpacerProps = SliceComponentProps<Content.MainSpacerSlice>;

/**
 * Component for "MainSpacer" Slices.
 */
const MainSpacer = ({ slice }: MainSpacerProps): JSX.Element => {
  return (
    <div
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="spacer-remove"
    />
  );
};

export default MainSpacer;
