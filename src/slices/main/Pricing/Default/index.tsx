import { SliceLayout } from "@/components/layout/SliceLayout";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";

import PricingCardsSwiper from "./PricingCardsSwiper";

import type { SliceZoneContext } from "@/lib/types";

export type PricingDefaultProps = {
  slice: Content.MainPricingSliceDefault;
  theme: SliceZoneContext["theme"];
};

const PricingDefault = async ({ slice, theme }: PricingDefaultProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  const client = createClient();

  const plans = await client.getAllByType("pricing_plan", {
    orderings: {
      field: "my.pricing_plan.order"
    }
  });

  return (
    <SliceLayout
      sliceTheme={themeFromSlice}
      theme={theme}
      className="overflow-hidden"
    >
      <PricingCardsSwiper theme={theme} plans={plans} />
    </SliceLayout>
  );
};

export default PricingDefault;
