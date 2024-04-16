import dynamic from "next/dynamic";

import { getTheme } from "@/lib/utils/getTheme";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import type { SliceZoneContext } from "@/lib/types";

const PricingDefault = dynamic(() => import("./Default"));
const PricingTable = dynamic(() => import("./Table"));

/**
 * Props for `MainPricing`.
 */
export type MainPricingProps = SliceComponentProps<
  Content.MainPricingSlice,
  SliceZoneContext
>;

/**
 * Component for "MainPricing" Slices.
 */
const MainPricing = ({ slice, context }: MainPricingProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      data-theme={context.theme}
    >
      {slice.variation === "default" && (
        <PricingDefault slice={slice} theme={context.theme} />
      )}
      {slice.variation === "table" && (
        <PricingTable slice={slice} theme={context.theme} />
      )}
    </section>
  );
};

export default MainPricing;
