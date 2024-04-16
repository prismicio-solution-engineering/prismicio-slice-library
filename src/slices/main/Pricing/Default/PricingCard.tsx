"use client";

import clsx from "clsx";
import { useState } from "react";
import SVG from "react-inlinesvg";
import { Autoplay, EffectFlip } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import CheckIcon from "@/assets/svg/check.svg";
import QuestionIcon from "@/assets/svg/question.svg";
import FormContact from "@/components/sections/FormContactModal";
import FormRequestTrial from "@/components/sections/FormRequestTrialModal";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/Tooltip";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { usePrismicContext } from "@/lib/context/prismic";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicImage, PrismicRichText } from "@prismicio/react";

import type { SliceZoneContext } from "@/lib/types";

export default function PricingCard({
  item,
  theme
}: {
  item: Content.PricingPlanDocument;
  theme: SliceZoneContext["theme"];
}) {
  const [openTrialModal, setOpenTrialModal] = useState(false);
  const [openContactModal, setOpenContactModal] = useState(false);
  const planName = item.data.name?.toLowerCase();
  const { segmentCtaEvent } = usePrismicAnalytics();
  const { pricingMonthly } = usePrismicContext();

  return (
    <div
      className={clsx(
        "border-2 rounded-xl flex flex-col h-full transition-colors group",
        {
          "border-gray-15 bg-white text-gray-15 hover:bg-quaternary-purple":
            theme !== "dark",
          "border-gray-50 bg-gray-1F text-white hover:bg-gray-30":
            theme === "dark"
        }
      )}
    >
      <h2 className="p-4 2xl:p-6 bg-gray-15 rounded-t-[10px] text-white text-center font-headings text-xl-tight 2xl:2xl-tight font-medium tracking-tight transition-colors group-hover:bg-primary-purple">
        {item.data.name}
      </h2>
      <div className="p-4 2xl:p-6">
        <p>{item.data.short_description}</p>
        <div className="text-center mt-6">
          <span className="font-headings text-6xl xl:text-7xl 2xl:text-8xl font-semibold tracking-tight">
            {item.data.monthly_pricing !== null &&
            item.data.annual_pricing !== null
              ? pricingMonthly
                ? "$" + item.data.monthly_pricing
                : "$" + item.data.annual_pricing
              : "Custom"}
          </span>
          <span className="text-sm-flat 2xl:text-base-flat font-bold">
            {item.data.monthly_pricing !== null &&
            item.data.annual_pricing !== null
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
        <div className="text-center text-sm mt-4 opacity-50">
          paid{" "}
          {pricingMonthly
            ? item.data.name === "Enterprise"
              ? "annually"
              : "monthly"
            : "annually"}
        </div>
        <div className="mt-8 min-h-[104px] flex flex-col">
          {item.data.ctas.map((cta, index) => (
            <div key={index} className="mt-2 first:mt-0 flex">
              {cta.action === "hubspot request trial" && (
                <FormRequestTrial
                  isOpen={openTrialModal}
                  onClose={() => {
                    setOpenTrialModal(false);
                  }}
                />
              )}
              {cta.action === "hubspot pricing contact" && (
                <FormContact
                  isOpen={openContactModal}
                  initialRequestType="Enterprise Pricing Presentation"
                  onClose={() => {
                    setOpenContactModal(false);
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
                onClick={() => {
                  cta.action !== "signup" &&
                    cta.action === "hubspot request trial" &&
                    setOpenTrialModal(true);
                  cta.action !== "signup" &&
                    cta.action === "hubspot pricing contact" &&
                    setOpenContactModal(true);
                  segmentCtaEvent("CTA Clicked", {
                    ctaType: `${
                      cta.style && cta.style.replace("link", "tertiary")
                    } ${cta.action === "signup" ? "link" : "form"}`,
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
                className="block text-center cursor-pointer grow"
                style={cta.style === "link" ? "tertiary" : cta.style}
              >
                {cta.label}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div
        className={clsx("p-4 2xl:p-6 border-t-2 grow", {
          "border-gray-15 text-gray-15": theme === "light",
          "border-gray-50 text-white": theme === "dark"
        })}
      >
        <PrismicRichText
          field={item.data.features_highlight}
          components={{
            paragraph: ({ children }) => (
              <p className="my-6 first:mt-0 last:mb-0 text-base lg:text-text-md">
                {children}
              </p>
            ),
            listItem: ({ children }) => (
              <li
                className={clsx(
                  "my-3 first:mt-0 last:mb-0 pl-6 relative text-base",
                  {
                    "text-gray-50": theme === "light",
                    "text-gray-A4": theme === "dark"
                  }
                )}
              >
                <CheckIcon
                  className={clsx("absolute left-0 top-1 w-4 h-4", {
                    "text-gray-50": theme === "light",
                    "text-gray-A4": theme === "dark"
                  })}
                />
                {children}
              </li>
            ),
            hyperlink: ({ node, children, key }) => (
              <PrismicNextLink
                key={key}
                field={node.data}
                className="text-primary-purple hover:underline"
              >
                {children}
              </PrismicNextLink>
            )
          }}
        />
        {isFilled.group(item.data.features_item) &&
          item.data.features_item.map((feature, index) => (
            <li
              className={clsx(
                "my-3 first:mt-0 last:mb-0 pl-6 relative text-base",
                {
                  "text-gray-50": theme === "light",
                  "text-gray-A4": theme === "dark"
                }
              )}
              key={index}
            >
              <CheckIcon
                className={clsx("absolute left-0 top-1 w-4 h-4", {
                  "text-gray-50": theme === "light",
                  "text-gray-A4": theme === "dark"
                })}
              />
              <PrismicRichText field={feature.item} />
              <div className="text-sm leading-normal text-gray-A4">
                <PrismicRichText
                  field={feature.description}
                  components={{
                    hyperlink: ({ node, children, key }) => (
                      <PrismicNextLink
                        key={key}
                        field={node.data}
                        className="text-primary-purple hover:underline"
                      >
                        {children}
                      </PrismicNextLink>
                    )
                  }}
                />
              </div>
            </li>
          ))}
      </div>
      {isFilled.richText(item.data.example_logos_title) && (
        <div
          className={clsx("p-4 2xl:p-6 border-t-2 text-center ", {
            "border-gray-15 text-gray-15": theme === "light",
            "border-gray-50 text-white": theme === "dark"
          })}
        >
          <Heading field={item.data.example_logos_title} size="sm" />
          <div className="h-12 mt-6">
            <Swiper
              modules={[Autoplay, EffectFlip]}
              effect="flip"
              flipEffect={{
                slideShadows: false
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false
              }}
            >
              {item.data.example_logos.map((logo, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className="flex items-center justify-center"
                    style={{
                      height: "3rem",
                      backfaceVisibility: "hidden"
                    }}
                  >
                    {isFilled.image(logo.logo) &&
                      (logo.logo.url.includes("svg") ? (
                        <SVG
                          src={logo.logo.url}
                          className={clsx(
                            "w-auto h-auto max-h-12 max-w-[140px] mx-auto",
                            {
                              "text-gray-50": theme === "light",
                              "text-gray-A4": theme === "dark"
                            }
                          )}
                        />
                      ) : (
                        <PrismicImage
                          field={logo.logo}
                          className="w-auto h-auto max-h-12 max-w-[140px] mx-auto"
                        />
                      ))}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}
