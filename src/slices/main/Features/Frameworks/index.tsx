"use client";

import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";
import { useState } from "react";
import SVG from "react-inlinesvg";

import ChevronIcon from "@/assets/svg/chevron.svg";
import { Copy } from "@/components/modules/Copy";
import FormFrameworks from "@/components/sections/FormFrameworksModal";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type FeaturesDefaultProps = {
  slice: Content.MainFeaturesSliceFrameworks;
  theme: SliceZoneContext["theme"];
};

const FeaturesDefault = ({ slice, theme }: FeaturesDefaultProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";
  const [isOpen, setIsOpen] = useState(false);
  const { segmentCtaEvent } = usePrismicAnalytics();

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container">
        <div
          className={clsx("rounded-xl p-6 md:py-10 md:px-12 text-center", {
            "bg-gray-1F": theme === "dark",
            "bg-gray-F7": theme === "light"
          })}
        >
          <div className="max-w-xl mx-auto">
            <Heading field={slice.primary.heading} size="lg" />
            <Copy
              field={slice.primary.subheading}
              className="mt-6"
              theme={theme}
              muted
            />
            <nav>
              {slice.items && slice.items.length > 0 && (
                <div className="flex gap-4 items-center justify-center mt-10">
                  {slice.items.map((item, index) => (
                    <PrismicNextLink
                      field={item.link}
                      key={index}
                      className={clsx(
                        "flex items-center gap-4 group rounded-xl font-bold overflow-hidden pr-5",
                        {
                          "bg-gray-30": theme === "dark",
                          "bg-gray-EE": theme === "light"
                        }
                      )}
                      onClick={() => {
                        segmentCtaEvent("CTA Clicked", {
                          ctaType: "primary link",
                          ctaPosition: "frameworks_slice_default",
                          ctaText: isFilled.keyText(item.link_label)
                            ? item.link_label
                            : "",
                          ctaUrl: isFilled.link(item.link) ? item.link.url : ""
                        });
                        setIsOpen(true);
                      }}
                    >
                      <span
                        className={clsx("h-12 w-12 sm:h-20 sm:w-20 block", {
                          "bg-gray-1F": theme === "dark",
                          "bg-gray-F7": theme === "light"
                        })}
                      >
                        <span
                          className={clsx(
                            "bg-opacity-20 h-12 w-12 sm:h-20 sm:w-20 p-3 sm:p-5 block",
                            {
                              "bg-primary-orange": item.color === "orange",
                              "bg-primary-purple": item.color === "purple",
                              "bg-primary-blue": item.color === "blue",
                              "bg-primary-green": item.color === "green",
                              "bg-primary-pink": item.color === "pink"
                            }
                          )}
                        >
                          {isFilled.image(item.icon) && (
                            <SVG
                              src={item.icon.url}
                              className="w-6 h-6 sm:w-10 sm:h-10 transition-transform group-hover:scale-110"
                            />
                          )}
                        </span>
                      </span>
                      {isFilled.keyText(item.link_label) && (
                        <span className="flex items-center">
                          <span>{item.link_label}</span>
                          <ChevronIcon className="-rotate-90 mt-0.5 w-6 h-6" />
                        </span>
                      )}
                    </PrismicNextLink>
                  ))}
                </div>
              )}
              {isFilled.keyText(slice.primary.link_label) && (
                <div className="mt-6">
                  <Button
                    as="button"
                    className="inline-block"
                    style="tertiary"
                    onClick={() => {
                      segmentCtaEvent("CTA Clicked", {
                        ctaType: "tertiary",
                        ctaPosition: "features_frameworks",
                        ctaText: slice.primary.link_label!,
                        ctaUrl: ""
                      });
                      setIsOpen(true);
                    }}
                  >
                    {slice.primary.link_label}
                  </Button>
                  <FormFrameworks
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                  />
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </SliceLayout>
  );
};

export default FeaturesDefault;
