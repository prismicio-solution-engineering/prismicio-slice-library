import { SliceLayout } from "@/components/layout/SliceLayout";
import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { DeveloperCard } from "@/components/modules/DeveloperCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";
import type { DeveloperDocumentWithWebsites } from "@/lib/types";

type FeaturedPartnerProps = {
  slice: Content.MainFeaturedSlicePartner;
  theme: SliceZoneContext["theme"];
};

const FeaturedPartner = async ({ slice, theme }: FeaturedPartnerProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";
  const client = createClient();

  if (!isFilled.contentRelationship(slice.primary.partner)) {
    return <></>;
  }

  const partner = await client.getByID<DeveloperDocumentWithWebsites>(
    slice.primary.partner.id,
    {
      fetchLinks: "country.name"
    }
  );

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container flex flex-col md:flex-row gap-6 md:items-center">
        <div className="md:w-1/2 order-2 md:order-first md:pr-14">
          {isFilled.keyText(slice.primary.eyebrow) && (
            <Eyebrow text={slice.primary.eyebrow} color="purple" />
          )}
          <Heading
            size={
              isFilled.richText(slice.primary.heading) &&
              slice.primary.heading[0].type === "heading3"
                ? "lg"
                : "2xl"
            }
            field={slice.primary.heading}
            className="mt-2 first:mt-0"
          />
          <Copy
            field={slice.primary.subheading}
            className="mt-6 max-w-lg"
            muted
            theme={theme}
          />
          <CallToActions
            className="mt-8"
            items={slice.items}
            clickPosition="featured_partner"
            theme={theme}
          />
        </div>
        <div className="md:w-1/2">
          <DeveloperCard developer={partner} theme={theme} />
        </div>
      </div>
    </SliceLayout>
  );
};

export default FeaturedPartner;
