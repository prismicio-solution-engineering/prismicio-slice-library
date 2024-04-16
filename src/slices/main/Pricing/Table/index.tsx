import { SliceLayout } from "@/components/layout/SliceLayout";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";

import { DesktopTable, MobileTable } from "./PricingComponents";

import type { SliceZoneContext } from "@/lib/types";

export type PricingTableProps = {
  slice: Content.MainPricingSliceTable;
  theme: SliceZoneContext["theme"];
};

export const tableGroups = {
  unlimited_essentials: ["documents", "has_slices", "custom_types", "assets"],
  content_delivery: [
    "api_calls",
    "builtin_cdn",
    "cdn_bandwidth_month",
    "bandwidth_consumption",
    "image_processing_optimization"
  ],
  users_and_user_roles: [
    "users",
    "user_roles",
    "roles_per_locale",
    "roles_per_team_space"
  ],
  localization: ["locales", "localization_workflow"],
  publishing_experience: [
    "page_builder",
    "live_editing",
    "previews",
    "shareable_previews",
    "scheduling",
    "releases",
    "inwebsite_edit_button",
    "full_revision_history",
    "ai_features"
  ],
  developer_experience: ["slice_machine", "development_environment"],
  apis_and_integrations: [
    "migration_api",
    "document_api",
    "graphql",
    "webhooks",
    "integration_fields",
    "skus"
  ],
  security_and_compliance: [
    "sla",
    "backups",
    "restoring_capabilities",
    "sso",
    "infosec_and_legal_review"
  ],
  support_and_services: ["support_level", "csm_se", "custom_training_sessions"],
  billing: ["card_billing", "invoice_billing"]
};

const PricingTable = async ({ slice, theme }: PricingTableProps) => {
  const themeFromSlice = false;

  const rows = {
    unlimitedEssentialsRows: slice.items.filter((item) =>
      tableGroups.unlimited_essentials.includes(item.key as string)
    ),
    contentDeliveryRows: slice.items.filter((item) =>
      tableGroups.content_delivery.includes(item.key as string)
    ),
    usersAndUserRolesRows: slice.items.filter((item) =>
      tableGroups.users_and_user_roles.includes(item.key as string)
    ),
    localizationRows: slice.items.filter((item) =>
      tableGroups.localization.includes(item.key as string)
    ),
    publishingExperienceRows: slice.items.filter((item) =>
      tableGroups.publishing_experience.includes(item.key as string)
    ),
    developerExperienceRows: slice.items.filter((item) =>
      tableGroups.developer_experience.includes(item.key as string)
    ),
    apisAndIntegrationsRows: slice.items.filter((item) =>
      tableGroups.apis_and_integrations.includes(item.key as string)
    ),
    securityAndComplianceRows: slice.items.filter((item) =>
      tableGroups.security_and_compliance.includes(item.key as string)
    ),
    supportAndServicesRows: slice.items.filter((item) =>
      tableGroups.support_and_services.includes(item.key as string)
    ),
    billingRows: slice.items.filter((item) =>
      tableGroups.billing.includes(item.key as string)
    )
  };

  const client = createClient();

  const plans = await client.getAllByType("pricing_plan", {
    orderings: {
      field: "my.pricing_plan.order"
    }
  });

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container">
        <SliceHeader
          theme={theme}
          heading={slice.primary.heading}
          subheading={slice.primary.subheading}
          align="center"
        />
        <MobileTable rows={rows} slice={slice} plans={plans} theme={theme} />
        <DesktopTable rows={rows} slice={slice} plans={plans} theme={theme} />
      </div>
    </SliceLayout>
  );
};

export default PricingTable;
