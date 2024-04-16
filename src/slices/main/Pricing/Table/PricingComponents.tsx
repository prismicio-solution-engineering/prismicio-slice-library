"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

import CheckIcon from "@/assets/svg/check.svg";
import ChevronIcon from "@/assets/svg/chevron.svg";
import CrossIcon from "@/assets/svg/cross.svg";
import QuestionIcon from "@/assets/svg/question.svg";
import FormContact from "@/components/sections/FormContactModal";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Switch } from "@/components/ui/Switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/Tooltip";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { usePrismicContext } from "@/lib/context/prismic";
import { useWindowSize } from "@/lib/hooks/useWindowSize";
import { Disclosure } from "@headlessui/react";
import { Content, isFilled } from "@prismicio/client";

import { tableGroups } from "./";

import type { SliceZoneContext } from "@/lib/types";

type TableProps = {
  plans: Content.PricingPlanDocument[];
  slice: Content.MainPricingSliceTable;
  rows: {
    [key: string]: Content.MainPricingSliceTableItem[];
  };
  theme: SliceZoneContext["theme"];
};

type DesktopFeatureRowProps = {
  name: string | null;
  explanation: string | null;
  field: string | null;
  full?: boolean;
  borderBottom?: boolean;
  borderTop?: boolean;
  plans: Content.PricingPlanDocument[];
  smallText?: boolean;
  indent?: boolean;
  tag?: string | null;
  theme: SliceZoneContext["theme"];
};

type DesktopGroupRowProps = {
  name: string | null;
  theme: SliceZoneContext["theme"];
};

type MobileTableCardProps = {
  plan: Content.PricingPlanDocument;
  slice: Content.MainPricingSliceTable;
  theme: SliceZoneContext["theme"];
};

type MobileFeatureGroupProps = {
  slice: Content.MainPricingSliceTable;
  group:
    | "unlimited_essentials"
    | "content_delivery"
    | "users_and_user_roles"
    | "localization"
    | "publishing_experience"
    | "developer_experience"
    | "apis_and_integrations"
    | "security_and_compliance"
    | "support_and_services"
    | "billing";
  plan: Content.PricingPlanDocument;
  theme: SliceZoneContext["theme"];
};

type MobileFeatureRowProps = {
  plan: Content.PricingPlanDocument;
  slice: Content.MainPricingSliceTable;
  group: keyof Content.PricingPlanDocumentData;
  theme: SliceZoneContext["theme"];
};

const DesktopGroupRow = ({ name, theme }: DesktopGroupRowProps) => {
  return (
    <tr
      className={clsx("flex font-headings text-base w-full border-x-2", {
        "border-gray-15": theme === "light",
        "border-gray-50": theme === "dark"
      })}
    >
      <td
        className={clsx("w-[256px] shrink-0 p-6 pb-4 text-left border-r-2", {
          "border-gray-15 bg-gray-F7": theme === "light",
          "border-gray-50 bg-gray-1F": theme === "dark"
        })}
      >
        {name}
      </td>
      <td className="flex-1 p-6 shrink-0 pb-4"></td>
    </tr>
  );
};

const DesktopFeatureRow = ({
  name,
  explanation,
  field,
  full,
  plans,
  borderBottom,
  borderTop,
  smallText,
  theme,
  indent,
  tag
}: DesktopFeatureRowProps) => {
  return (
    <tr
      className={clsx(
        "flex text-base lg:text-md font-medium group border-x-2 last:border-b-2 last:rounded-b-xl",
        {
          "text-gray-50 border-gray-15": theme === "light",
          "text-gray-A4 border-gray-50": theme === "dark"
        }
      )}
    >
      <td
        className={clsx(
          "w-[256px] shrink-0 px-6 text-left border-r-2 flex gap-4 justify-between relative items-center group-last:rounded-bl-[10px]",
          {
            "py-6": full,
            "py-4": !full,
            "border-b-2 group-last:border-b-0": borderBottom,
            "border-t-2": borderTop,
            "bg-gray-F7 border-gray-15": theme === "light",
            "bg-gray-1F border-gray-50": theme === "dark",
            "pl-12": indent
          }
        )}
      >
        {indent && (
          <span
            className={clsx("w-2 h-full absolute top-0 left-0 bottom-0", {
              "bg-gray-AC": theme === "light",
              "bg-gray-50": theme === "dark"
            })}
          />
        )}
        <span className="flex items-center flex-wrap gap-2">
          <span className="text-base">{name}</span>
          {isFilled.select(tag) && tag !== "none" && (
            <span
              className={clsx(
                "text-xs font-bold inline-block py-0.5 px-2 rounded-full whitespace-nowrap text-white first-letter:capitalize",
                {
                  "bg-primary-orange": tag === "beta",
                  "bg-primary-green": tag === "coming soon"
                }
              )}
            >
              {tag}
            </span>
          )}
        </span>
        {explanation && (
          <div className="relative">
            <Tooltip placement="right">
              <TooltipTrigger>
                <QuestionIcon className="h-6 w-6" />
              </TooltipTrigger>
              <TooltipContent>{explanation}</TooltipContent>
            </Tooltip>
          </div>
        )}
      </td>
      {plans &&
        plans.map(
          (plan, index) =>
            field && (
              <td
                key={index}
                className={clsx(
                  "flex-[1_1_100px] w-0 shrink-0 border-r-2 last:border-r-0 flex justify-center items-center group-last:last:rounded-br-[10px] group-last:last:overflow-hidden",
                  {
                    "border-b-2 group-last:border-b-0": borderBottom,
                    "border-t-2": borderTop,
                    "p-2": smallText,
                    "py-6 px-4": full && !smallText,
                    "py-4 px-4": !full && !smallText,
                    "border-gray-15": theme === "light",
                    "border-gray-50": theme === "dark"
                  }
                )}
              >
                {plan.data[field as keyof Content.PricingPlanDocumentData] ===
                "Check" ? (
                  <>
                    <CheckIcon className="mx-auto text-primary-green h-6 w-6" />
                    <span className="sr-only">Included</span>
                  </>
                ) : (
                  <span
                    className={clsx("text-ellipsis overflow-hidden", {
                      "font-medium":
                        plan.data[
                          field as keyof Content.PricingPlanDocumentData
                        ] === "100 GB" ||
                        plan.data[
                          field as keyof Content.PricingPlanDocumentData
                        ] === "$0.10/GB" ||
                        plan.data[
                          field as keyof Content.PricingPlanDocumentData
                        ] === "$1/100 SKUs" ||
                        plan.data[
                          field as keyof Content.PricingPlanDocumentData
                        ] === "Basic",
                      "text-sm font-regular": smallText,
                      "text-base font-bold": !smallText
                    })}
                  >
                    {
                      plan.data[
                        field as keyof Content.PricingPlanDocumentData
                      ] as string
                    }
                  </span>
                )}
              </td>
            )
        )}
    </tr>
  );
};

export const DesktopTable = ({ plans, slice, rows, theme }: TableProps) => {
  const { segmentCtaEvent } = usePrismicAnalytics();
  const [modal, setModal] = useState(false);
  const size = useWindowSize();
  const [screenIsSmall, setScreenIsSmall] = useState(true);
  const { pricingMonthly, changePricingMonthly } = usePrismicContext();

  useEffect(() => {
    if (size.width >= 1024) {
      setScreenIsSmall(false);
    } else {
      setScreenIsSmall(true);
    }
  }, [size]);

  if (screenIsSmall) return <></>;

  return (
    <table className="w-full text-center flex flex-col relative h-full mt-8 2xl:mt-14 first:mt-0">
      <thead
        className={clsx("w-full sticky top-24 z-20 sticky-el pt-4", {
          "bg-white": theme === "light",
          "bg-gray-15": theme === "dark"
        })}
      >
        <tr
          className={clsx(
            "flex border-t-2 border-l-2 border-r-2 rounded-t-xl",
            {
              "border-gray-15": theme === "light",
              "border-gray-50": theme === "dark"
            }
          )}
        >
          <th
            className={clsx(
              "w-[256px] shrink-0 p-6 border-r-2 text-base lg:text-md tracking-tight font-medium text-gray-50 overflow-hidden rounded-tl-[10px]",
              {
                "bg-gray-F7 border-gray-15": theme === "light",
                "bg-gray-1F border-gray-50": theme === "dark"
              }
            )}
          >
            <Switch
              theme={theme}
              value={!pricingMonthly}
              setValue={changePricingMonthly}
            />
          </th>
          <th
            className={clsx(
              "flex-[1_1_300px] w-0 shrink-0 p-6 border-r-2 font-headings text-md-tight 2xl:text-lg font-medium flex items-center justify-center",
              {
                "bg-gray-15 border-gray-15 text-white": theme === "light",
                "bg-gray-30 border-gray-50": theme === "dark"
              }
            )}
          >
            Individuals and teams
          </th>
          <th
            className={clsx(
              "flex-[1_1_300px] w-0 shrink-0 p-6 font-headings text-md-tight 2xl:text-lg font-medium flex items-center justify-center overflow-hidden rounded-tr-[10px]",
              {
                "bg-gray-15 border-gray-15 text-white": theme === "light",
                "bg-gray-30 border-gray-50": theme === "dark"
              }
            )}
          >
            Organizations
          </th>
        </tr>
        <tr
          className={clsx("flex text-base lg:text-md font-medium border-x-2", {
            "text-gray-15 border-gray-15 bg-white": theme === "light",
            "bg-gray-15 border-gray-50": theme === "dark"
          })}
        >
          <td
            className={clsx(
              "w-[256px] shrink-0 p-6 border-t-2 text-left border-r-2 flex flex-col border-b-2",
              {
                "bg-gray-F7 border-gray-15": theme === "light",
                "bg-gray-1F border-gray-50": theme === "dark"
              }
            )}
          >
            <span className="font-headings font-medium tracking-tight text-2xl-tight lg:text-3xl-tight 2xl:text-4xl">
              Plans
            </span>
            <span
              className={clsx(
                "text-base lg:text-base mt-2 flex justify-between items-end gap-4",
                {
                  "text-gray-50": theme === "light",
                  "text-gray-A4": theme === "dark"
                }
              )}
            >
              <span>
                Price per month and per repository, paid{" "}
                {pricingMonthly ? "monthly" : "annually"}
              </span>
              <div className="relative">
                <Tooltip placement="right">
                  <TooltipTrigger>
                    <QuestionIcon className="-mb-2 h-6 w-6" />
                  </TooltipTrigger>
                  <TooltipContent>
                    All our pricing plans are per repository. A repository is an
                    independent working space with its own content, set of
                    users, endpoint, and subscription. You can have as many
                    repositories as you want and each repo will have its own
                    subscription. You can adjust each repo's plan and
                    subscription in the Settings / Plans & Billing through your
                    dashboard.
                  </TooltipContent>
                </Tooltip>
              </div>
            </span>
          </td>
          {plans &&
            plans.map((plan, index) => (
              <td
                key={index}
                className={clsx(
                  "flex-[1_1_100px] w-0 shrink-0 px-4 py-6 border-r-2 border-t-2 last:border-r-0 border-b-2 flex flex-col justify-center items-center overflow-hidden",
                  {
                    "border-gray-50": theme === "dark",
                    "border-gray-15": theme === "light"
                  }
                )}
              >
                <span className="font-headings text-2xl-tight lg:text-3xl-tight 2xl:text-4xl font-medium tracking-tight">
                  {plan.data.monthly_pricing !== null &&
                  plan.data.annual_pricing !== null
                    ? pricingMonthly
                      ? "$" + plan.data.monthly_pricing
                      : "$" + plan.data.annual_pricing
                    : "Custom"}
                </span>
                <span className="font-headings text-md-tight 2xl:text-lg font-medium tracking-tight mt-2">
                  {plan.data.name}
                </span>

                {plan.data.ctas.map((cta, index) => {
                  if (index === 0) {
                    const planName = plan.data.name?.toLowerCase();

                    return (
                      <div key={index} className="mt-2 first:mt-0 flex">
                        {cta.action === "hubspot pricing contact" && (
                          <FormContact
                            isOpen={modal}
                            initialRequestType="Enterprise Pricing Presentation"
                            onClose={() => {
                              setModal(false);
                            }}
                          />
                        )}
                        <Button
                          theme={theme}
                          as={cta.action === "signup" ? "a" : "button"}
                          href={
                            cta.action === "signup"
                              ? planName === "free"
                                ? `https://prismic.io/dashboard/signup?redirectUri=/dashboard/new-repository?plan=personal&source=pricingPage`
                                : `https://prismic.io/dashboard/signup?redirectUri=/dashboard/new-repository?plan=${planName}_${
                                    pricingMonthly ? "monthly" : "yearly"
                                  }&source=pricingPage`
                              : undefined
                          }
                          className="block text-center cursor-pointer mt-4"
                          style={cta.style === "link" ? "tertiary" : cta.style}
                          size="xs"
                          onClick={() => {
                            cta.action !== "signup" &&
                              cta.action === "hubspot pricing contact" &&
                              setModal(true);
                            segmentCtaEvent("CTA Clicked", {
                              ctaType: `${cta.style.replace(
                                "link",
                                "tertiary"
                              )} ${cta.action === "signup" ? "link" : "form"}`,
                              ctaPosition: "pricing_cards_slice_default",
                              ctaText: cta.label || "",
                              ctaUrl:
                                cta.action === "signup"
                                  ? planName === "free"
                                    ? `https://prismic.io/dashboard/signup?redirectUri=/dashboard/new-repository?plan=personal&source=pricingPage`
                                    : `https://prismic.io/dashboard/signup?redirectUri=/dashboard/new-repository?plan=${planName}_${
                                        pricingMonthly ? "monthly" : "yearly"
                                      }&source=pricingPage`
                                  : ""
                            });
                          }}
                        >
                          {cta.label}
                        </Button>
                      </div>
                    );
                  }
                })}
              </td>
            ))}
        </tr>
      </thead>
      <tbody className="w-full">
        {rows.unlimitedEssentialsRows.length > 0 && (
          <DesktopGroupRow
            name={slice.primary.unlimited_essentials_title}
            theme={theme}
          />
        )}
        {rows.unlimitedEssentialsRows.map(
          (item, index) =>
            item.key &&
            tableGroups.unlimited_essentials.includes(item.key) && (
              <DesktopFeatureRow
                key={index}
                name={item.feature}
                explanation={item.tooltip}
                field={item.key}
                plans={plans}
                borderBottom={index === rows.unlimitedEssentialsRows.length - 1}
                borderTop
                smallText={item.small_text}
                indent={item.indent}
                tag={item.tag}
                theme={theme}
              />
            )
        )}
        {rows.contentDeliveryRows.length > 0 && (
          <DesktopGroupRow
            name={slice.primary.content_delivery_title}
            theme={theme}
          />
        )}
        {rows.contentDeliveryRows.map(
          (item, index) =>
            item.key && (
              <DesktopFeatureRow
                key={index}
                name={item.feature}
                explanation={item.tooltip}
                field={item.key}
                plans={plans}
                borderBottom={index === rows.contentDeliveryRows.length - 1}
                borderTop
                smallText={item.small_text}
                indent={item.indent}
                tag={item.tag}
                theme={theme}
              />
            )
        )}
        {rows.usersAndUserRolesRows.length > 0 && (
          <DesktopGroupRow
            name={slice.primary.users_and_user_roles_title}
            theme={theme}
          />
        )}
        {rows.usersAndUserRolesRows.map(
          (item, index) =>
            item.key && (
              <DesktopFeatureRow
                key={index}
                name={item.feature}
                explanation={item.tooltip}
                field={item.key}
                plans={plans}
                borderBottom={index === rows.usersAndUserRolesRows.length - 1}
                borderTop
                smallText={item.small_text}
                indent={item.indent}
                tag={item.tag}
                theme={theme}
              />
            )
        )}
        {rows.localizationRows.length > 0 && (
          <DesktopGroupRow
            name={slice.primary.localization_title}
            theme={theme}
          />
        )}
        {rows.localizationRows.map(
          (item, index) =>
            item.key && (
              <DesktopFeatureRow
                key={index}
                name={item.feature}
                explanation={item.tooltip}
                field={item.key}
                plans={plans}
                borderBottom={index === rows.localizationRows.length - 1}
                borderTop
                smallText={item.small_text}
                indent={item.indent}
                tag={item.tag}
                theme={theme}
              />
            )
        )}
        {rows.publishingExperienceRows.length > 0 && (
          <DesktopGroupRow
            name={slice.primary.publishing_experience_title}
            theme={theme}
          />
        )}
        {rows.publishingExperienceRows.map(
          (item, index) =>
            item.key && (
              <DesktopFeatureRow
                key={index}
                name={item.feature}
                explanation={item.tooltip}
                field={item.key}
                plans={plans}
                borderBottom={
                  index === rows.publishingExperienceRows.length - 1
                }
                borderTop
                smallText={item.small_text}
                indent={item.indent}
                tag={item.tag}
                theme={theme}
              />
            )
        )}
        {rows.developerExperienceRows.length > 0 && (
          <DesktopGroupRow
            name={slice.primary.developer_experience_title}
            theme={theme}
          />
        )}
        {rows.developerExperienceRows.map(
          (item, index) =>
            item.key && (
              <DesktopFeatureRow
                key={index}
                name={item.feature}
                explanation={item.tooltip}
                field={item.key}
                plans={plans}
                borderBottom={index === rows.developerExperienceRows.length - 1}
                borderTop
                smallText={item.small_text}
                indent={item.indent}
                tag={item.tag}
                theme={theme}
              />
            )
        )}
        {rows.apisAndIntegrationsRows.length > 0 && (
          <DesktopGroupRow
            name={slice.primary.apis_and_integrations_title}
            theme={theme}
          />
        )}
        {rows.apisAndIntegrationsRows.map(
          (item, index) =>
            item.key && (
              <DesktopFeatureRow
                key={index}
                name={item.feature}
                explanation={item.tooltip}
                field={item.key}
                plans={plans}
                borderBottom={index === rows.apisAndIntegrationsRows.length - 1}
                borderTop
                smallText={item.small_text}
                indent={item.indent}
                tag={item.tag}
                theme={theme}
              />
            )
        )}
        {rows.securityAndComplianceRows.length > 0 && (
          <DesktopGroupRow
            name={slice.primary.security_and_compliance_title}
            theme={theme}
          />
        )}
        {rows.securityAndComplianceRows.map(
          (item, index) =>
            item.key && (
              <DesktopFeatureRow
                key={index}
                name={item.feature}
                explanation={item.tooltip}
                field={item.key}
                plans={plans}
                borderBottom={
                  index === rows.securityAndComplianceRows.length - 1
                }
                borderTop
                smallText={item.small_text}
                indent={item.indent}
                tag={item.tag}
                theme={theme}
              />
            )
        )}
        {rows.supportAndServicesRows.length > 0 && (
          <DesktopGroupRow
            name={slice.primary.support_and_services_title}
            theme={theme}
          />
        )}
        {rows.supportAndServicesRows.map(
          (item, index) =>
            item.key && (
              <DesktopFeatureRow
                key={index}
                name={item.feature}
                explanation={item.tooltip}
                field={item.key}
                plans={plans}
                borderBottom={index === rows.supportAndServicesRows.length - 1}
                borderTop
                smallText={item.small_text}
                indent={item.indent}
                tag={item.tag}
                theme={theme}
              />
            )
        )}
        {rows.billingRows.length > 0 && (
          <DesktopGroupRow name={slice.primary.billing_title} theme={theme} />
        )}
        {rows.billingRows.map(
          (item, index) =>
            item.key && (
              <DesktopFeatureRow
                key={index}
                name={item.feature}
                explanation={item.tooltip}
                field={item.key}
                plans={plans}
                borderBottom={index === rows.billingRows.length - 1}
                borderTop
                smallText={item.small_text}
                indent={item.indent}
                tag={item.tag}
                theme={theme}
              />
            )
        )}
      </tbody>
    </table>
  );
};

const MobileFeatureGroup = ({
  slice,
  group,
  plan,
  theme
}: MobileFeatureGroupProps) => {
  const title =
    `${group}_title` as keyof Content.MainPricingSliceTable["primary"];

  return (
    <div className="px-6">
      <Heading as="h4" size="md">
        {slice.primary[title] as string}
      </Heading>
      <div className="mt-4 flex flex-col gap-5">
        {tableGroups[group].map((group, index) => (
          <MobileFeatureRow
            key={index}
            group={group as keyof Content.PricingPlanDocumentData}
            plan={plan}
            slice={slice}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
};

const MobileFeatureRow = ({
  plan,
  slice,
  group,
  theme
}: MobileFeatureRowProps) => {
  const tag = slice.items.filter((item) => item.key === group)[0]?.tag;

  return (
    <div className="flex justify-between items-center gap-2">
      <span className="flex items-center">
        {plan.data[group as keyof Content.PricingPlanDocumentData] ? (
          <CheckIcon className="w-4 h-4 mr-2 shrink-0 text-primary-green" />
        ) : (
          <CrossIcon className="w-4 h-4 mr-2 shrink-0 text-primary-orange" />
        )}

        <span className="flex flex-wrap gap-2">
          <span
            className={clsx({
              "line-through": !plan.data[group]
            })}
          >
            {slice.items.filter((item) => item.key === group)[0]?.feature}
            {plan.data[group] && (
              <span>
                {plan.data[group] !== "Check" && `: ${plan.data[group]}`}
              </span>
            )}
          </span>
          {isFilled.select(tag) && tag !== "none" && (
            <span
              className={clsx(
                "text-xs font-bold inline-block py-0.5 px-2 rounded-full whitespace-nowrap text-white first-letter:capitalize",
                {
                  "bg-primary-orange": tag === "beta",
                  "bg-primary-green": tag === "coming soon"
                }
              )}
            >
              {tag}
            </span>
          )}
        </span>
      </span>
      <Tooltip placement="right">
        <TooltipTrigger>
          <QuestionIcon className="w-4 h-4" />
        </TooltipTrigger>
        <TooltipContent>
          {slice.items.filter((item) => item.key === group)[0]?.tooltip}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

const MobileTableCard = ({ plan, slice, theme }: MobileTableCardProps) => {
  const { segmentCtaEvent } = usePrismicAnalytics();
  const [modal, setModal] = useState(false);
  const { pricingMonthly } = usePrismicContext();

  return (
    <div
      className={clsx(
        " border-2 rounded-xl mt-4 first:mt-0 overflow-hidden max-w-md mx-auto",
        {
          "border-gray-15 bg-white": theme === "light",
          "border-gray-50 bg-gray-1F": theme === "dark"
        }
      )}
    >
      <header
        className={clsx("p-4 text-center", {
          "bg-gray-15 text-white": theme === "light",
          "bg-gray-30 text-white": theme === "dark"
        })}
      >
        <Heading as="h3" size="md">
          {plan.data.name}
        </Heading>
      </header>
      <div className="p-6">
        <div className="text-center">
          <span className="font-headings text-6xl font-semibold tracking-tight">
            {plan.data.monthly_pricing !== null &&
            plan.data.annual_pricing !== null
              ? pricingMonthly
                ? "$" + plan.data.monthly_pricing
                : "$" + plan.data.annual_pricing
              : "Custom"}
          </span>
          <span className="text-base-flat font-bold">
            {plan.data.monthly_pricing !== null &&
            plan.data.annual_pricing !== null
              ? pricingMonthly
                ? "/month"
                : "/month"
              : ""}
          </span>
        </div>
        <div className="text-base-flat mt-1 text-center font-medium flex justify-center items-center gap-2">
          Per repository
          <Tooltip placement="right">
            <TooltipTrigger>
              <QuestionIcon className="w-6 h-6" />
            </TooltipTrigger>
            <TooltipContent>
              All our pricing plans are per repository. A repository is an
              independent working space with its own content, set of users,
              endpoint, and subscription. You can have as many repositories as
              you want and each repo will have its own subscription. You can
              adjust each repo's plan and subscription in the Settings / Plans &
              Billing through your dashboard.
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="text-center text-sm mt-2 opacity-50">
          paid {pricingMonthly ? "monthly" : "annually"}
        </div>
      </div>
      <div className="w-full max-w-xs mx-auto px-6">
        {plan.data.ctas.map((cta, index) => {
          if (index === 0) {
            const planName = plan.data.name?.toLowerCase();

            return (
              <div key={index}>
                {cta.action === "hubspot pricing contact" && (
                  <FormContact
                    isOpen={modal}
                    initialRequestType="Enterprise Pricing Presentation"
                    onClose={() => {
                      setModal(false);
                    }}
                  />
                )}
                <Button
                  as={cta.action === "signup" ? "a" : "button"}
                  theme={theme}
                  href={
                    cta.action === "signup"
                      ? `https://prismic.io/dashboard/signup?redirectUri=/dashboard/new-repository?plan=${planName}_${
                          pricingMonthly ? "monthly" : "yearly"
                        }&source=pricingPage`
                      : undefined
                  }
                  onClick={() => {
                    cta.action !== "signup" &&
                      cta.action === "hubspot pricing contact" &&
                      setModal(true);
                    segmentCtaEvent("CTA Clicked", {
                      ctaType: `${cta.style.replace("link", "tertiary")} ${
                        cta.action === "signup" ? "link" : "form"
                      }`,
                      ctaPosition: "pricing_cards_slice_default",
                      ctaText: cta.label || "",
                      ctaUrl:
                        cta.action === "signup"
                          ? `https://prismic.io/dashboard/signup?redirectUri=/dashboard/new-repository?plan=${planName}_${
                              pricingMonthly ? "monthly" : "yearly"
                            }&source=pricingPage`
                          : ""
                    });
                  }}
                  className="block text-center cursor-pointer w-full"
                  style={cta.style === "link" ? "tertiary" : cta.style}
                >
                  {cta.label}
                </Button>
              </div>
            );
          }
        })}
      </div>
      <div className="mt-4">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="div"
                className="flex items-center justify-center w-full max-w-xs mx-auto mb-4 px-6"
              >
                <Button
                  as="button"
                  style="tertiary"
                  className="text-center cursor-pointer w-full flex justify-center text-base-flat"
                >
                  {!open ? (
                    <span>See all features</span>
                  ) : (
                    <span>Hide all features</span>
                  )}
                  <ChevronIcon
                    className={clsx("w-6 h-6 shrink-0 -mr-6", {
                      "transform rotate-180": open
                    })}
                  />
                </Button>
              </Disclosure.Button>
              <Disclosure.Panel
                className={clsx("flex flex-col gap-6 py-6 border-t-2", {
                  "border-gray-15": theme === "light",
                  "border-gray-50": theme === "dark"
                })}
              >
                <MobileFeatureGroup
                  slice={slice}
                  plan={plan}
                  group="unlimited_essentials"
                  theme={theme}
                />
                <MobileFeatureGroup
                  slice={slice}
                  plan={plan}
                  group="content_delivery"
                  theme={theme}
                />
                <MobileFeatureGroup
                  slice={slice}
                  plan={plan}
                  group="users_and_user_roles"
                  theme={theme}
                />
                <MobileFeatureGroup
                  slice={slice}
                  plan={plan}
                  group="localization"
                  theme={theme}
                />
                <MobileFeatureGroup
                  slice={slice}
                  plan={plan}
                  group="publishing_experience"
                  theme={theme}
                />
                <MobileFeatureGroup
                  slice={slice}
                  plan={plan}
                  group="developer_experience"
                  theme={theme}
                />
                <MobileFeatureGroup
                  slice={slice}
                  plan={plan}
                  group="apis_and_integrations"
                  theme={theme}
                />
                <MobileFeatureGroup
                  slice={slice}
                  plan={plan}
                  group="security_and_compliance"
                  theme={theme}
                />
                <MobileFeatureGroup
                  slice={slice}
                  plan={plan}
                  group="support_and_services"
                  theme={theme}
                />
                <MobileFeatureGroup
                  slice={slice}
                  plan={plan}
                  group="billing"
                  theme={theme}
                />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export const MobileTable = ({ plans, slice, theme }: TableProps) => {
  const size = useWindowSize();
  const [screenIsSmall, setScreenIsSmall] = useState(true);
  const { pricingMonthly, changePricingMonthly } = usePrismicContext();

  useEffect(() => {
    if (size.width >= 1024) {
      setScreenIsSmall(false);
    } else {
      setScreenIsSmall(true);
    }
  }, [size]);

  if (!screenIsSmall) return <></>;

  return (
    <div className="mt-8">
      <Switch
        theme={theme}
        value={!pricingMonthly}
        setValue={changePricingMonthly}
      />
      <div className="mt-8">
        {plans &&
          plans.map((plan, index) => (
            <MobileTableCard
              key={index}
              plan={plan}
              slice={slice}
              theme={theme}
            />
          ))}
      </div>
    </div>
  );
};
