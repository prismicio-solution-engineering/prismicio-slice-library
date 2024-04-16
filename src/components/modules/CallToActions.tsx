import clsx from "clsx";

import { CallToAction } from "@/components/modules/CallToAction";
import {
  isLinkToMediaField,
  isLinkToWebField
} from "@/lib/utils/linkFieldTypeChecker";
import { createClient } from "@/prismicio";
import {
  Content,
  isFilled,
  KeyTextField,
  LinkField,
  SelectField
} from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

export type CtaItemProps = {
  link: LinkField;
  link_label?: KeyTextField;
  link_style?: SelectField<"primary" | "secondary" | "tertiary">;
};

type CallToActionsProps = {
  className?: string;
  items: CtaItemProps[];
  theme?: SliceZoneContext["theme"];
  size?: "sm" | "md" | "lg";
  clickPosition?: string;
  buttonClasses?: string;
};

/**
 * CallToActions
 * @param {string} className - Additional class names
 * @param {CtaItemProps[]} items - Array of CTA items
 * @param {SliceZoneContext["theme"]} theme - The theme of the component
 * @param {"sm" | "md" | "lg"} size - The size of the buttons
 * @param {string} clickPosition - The click position (for analytics)
 * @param {string} buttonClasses - Additional class names for buttons
 * @returns {JSX.Element | null} CallToActions component
 * @example
 * <CallToActions items={slice.items} clickPosition="call_to_action_default" theme="light" />
 */

export const CallToActions = async ({
  className,
  items,
  theme,
  size,
  clickPosition,
  buttonClasses
}: CallToActionsProps) => {
  const client = createClient();

  const formIds = items
    .filter(
      (item) =>
        isFilled.link(item.link) &&
        !isLinkToWebField(item.link) &&
        !isLinkToMediaField(item.link) &&
        item.link.type === "form"
    )
    .map(
      (item) =>
        isFilled.link(item.link) &&
        !isLinkToWebField(item.link) &&
        !isLinkToMediaField(item.link) &&
        item.link.id
    )
    .filter(Boolean) as string[];

  let forms = [] as Content.FormDocument[];

  if (formIds.length > 0) {
    forms = await client.getAllByIDs(formIds, {
      fetch: ["form.hubspot_form_id"]
    });
  }

  return (
    <div className={clsx("flex items-center flex-wrap gap-4", className)}>
      {items.map((item: CtaItemProps, index: number) => {
        const form = forms.find(
          (form) =>
            isFilled.link(item.link) &&
            !isLinkToWebField(item.link) &&
            !isLinkToMediaField(item.link) &&
            form.id === item.link.id
        )?.data.hubspot_form_id;

        const formName = (() => {
          switch (form) {
            case process.env.HUBSPOT_CONTACT_FORM:
              return "contact";
            case process.env.HUBSPOT_FRAMEWORKS_FORM:
              return "frameworks";
            case process.env.HUBSPOT_HIRE_ME_FORM:
              return "hire-me";
            case process.env.HUBSPOT_MEETUP_FORM:
              return "meetup-signup";
            case process.env.HUBSPOT_PAGE_BUILDER_WAITLIST_FORM:
              return "page-builder-waitlist";
            case process.env.HUBSPOT_REQUEST_AI_FORM:
              return "request-ai";
            case process.env.HUBSPOT_PARTNER_FORM:
              return "partner";
            case process.env.HUBSPOT_TRIAL_FORM:
              return "request-trial";
            case process.env.HUBSPOT_GET_LISTED_FORM:
              return "get-listed";
            case process.env.HUBSPOT_ENTERPRISE_CONSULTATION_FORM:
              return "enterprise-consultation";
            default:
              return "";
          }
        })();

        return (
          <CallToAction
            item={item}
            theme={theme}
            size={size}
            clickPosition={clickPosition}
            buttonClasses={buttonClasses}
            index={index}
            form={form && formName}
            key={index}
          />
        );
      })}
    </div>
  );
};
