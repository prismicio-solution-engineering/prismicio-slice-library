"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { isFilled } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";
import type { CtaItemProps } from "./CallToActions";

const FormContact = dynamic(
  () => import("@/components/sections/FormContactModal")
);
const FormFrameworks = dynamic(
  () => import("@/components/sections/FormFrameworksModal")
);
const FormHireMe = dynamic(
  () => import("@/components/sections/FormHireMeModal")
);
const FormMeetupSignup = dynamic(
  () => import("@/components/sections/FormMeetupSignupModal")
);
const FormPageBuilderWaitlist = dynamic(
  () => import("@/components/sections/FormPageBuilderWaitlistModal")
);
const FormPartner = dynamic(
  () => import("@/components/sections/FormPartnerModal")
);
const FormRequestTrial = dynamic(
  () => import("@/components/sections/FormRequestTrialModal")
);
const FormRequestAi = dynamic(
  () => import("@/components/sections/FormRequestAiModal")
);
const FormGetListed = dynamic(
  () => import("@/components/sections/FormGetListedModal")
);
const FormEnterpriseConsultation = dynamic(
  () => import("@/components/sections/FormEnterpriseConsultationModal")
);

export type CallToActionProps = {
  item: CtaItemProps;
  theme?: SliceZoneContext["theme"];
  size?: "sm" | "md" | "lg";
  clickPosition?: string;
  buttonClasses?: string;
  index: number;
  form?: string | null | undefined;
};

/**
 * CallToAction
 * @param {CtaItemProps} item - CTA item
 * @param {SliceZoneContext["theme"]} theme - The theme of the component
 * @param {"sm" | "md" | "lg"} size - The size of the buttons
 * @param {string} clickPosition - The click position (for analytics)
 * @param {string} buttonClasses - Additional class names for buttons
 * @param {number} index - Index of the CTA item
 * @param {string | null | undefined} form - The form to open
 * @returns {JSX.Element | null} CallToAction component
 * @example
 * <CallToAction
 *  item={item}
 *  clickPosition="call_to_action_default"
 *  theme="light"
 * />
 */

export const CallToAction = ({
  item,
  theme,
  size,
  clickPosition,
  buttonClasses,
  index,
  form
}: CallToActionProps) => {
  const { segmentCtaEvent } = usePrismicAnalytics();
  const [modalOpen, setModalOpen] = useState(false);

  if (
    !isFilled.link(item.link) ||
    !isFilled.keyText(item.link_label) ||
    !isFilled.select(item.link_style)
  ) {
    return <></>;
  }

  const linkStyle = item.link_style as string;
  const linkLabel = item.link_label as string;
  const linkUrl = item.link.url as string;

  return (
    <>
      {!form && (
        <Button
          data-intellimize-id={`cta-${
            item.link_style ? item.link_style : "primary"
          }`}
          className={buttonClasses}
          key={index}
          field={item.link}
          style={item.link_style}
          theme={theme}
          size={size ? size : "md"}
          onClick={() => {
            segmentCtaEvent("CTA Clicked", {
              ctaType: linkStyle,
              ctaPosition: clickPosition || "",
              ctaText: linkLabel,
              ctaUrl: linkUrl.startsWith("/")
                ? `https://prismic.io${linkUrl}`
                : linkUrl
            });
          }}
        >
          {item.link_label}
        </Button>
      )}
      {form && (
        <>
          <Button
            as="button"
            data-intellimize-id={`cta-${
              item.link_style ? item.link_style : "primary"
            }`}
            className={buttonClasses}
            key={index}
            style={item.link_style}
            theme={theme}
            size={size ? size : "md"}
            onClick={() => {
              segmentCtaEvent("CTA Clicked", {
                ctaType: linkStyle,
                ctaPosition: clickPosition || "",
                ctaText: linkLabel
              });
              setModalOpen(true);
            }}
          >
            {item.link_label}
          </Button>
          {form === "contact" && (
            <FormContact
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          )}
          {form === "frameworks" && (
            <FormFrameworks
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          )}
          {form === "hire-me" && (
            <FormHireMe
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          )}
          {form === "meetup-signup" && (
            <FormMeetupSignup
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          )}
          {form === "page-builder-waitlist" && (
            <FormPageBuilderWaitlist
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          )}
          {form === "partner" && (
            <FormPartner
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          )}
          {form === "request-trial" && (
            <FormRequestTrial
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          )}
          {form === "request-ai" && (
            <FormRequestAi
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          )}
          {form === "get-listed" && (
            <FormGetListed
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          )}
          {form === "enterprise-consultation" && (
            <FormEnterpriseConsultation
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            />
          )}
        </>
      )}
    </>
  );
};
