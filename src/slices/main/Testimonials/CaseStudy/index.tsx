"use client";

import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";
import SVG from "react-inlinesvg";

import QuoteIcon from "@/assets/svg/quote.svg";
import { Copy } from "@/components/modules/Copy";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { generateBackgroundClasses } from "@/lib/utils/generateBackgroundClasses";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type TestimonialsCaseStudyProps = {
  slice: Content.MainTestimonialsSliceCaseStudy;
  theme: SliceZoneContext["theme"];
};

const TestimonialsCaseStudy = ({
  slice,
  theme
}: TestimonialsCaseStudyProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  const copyTheme =
    slice.primary.background_color === "default" ||
    !slice.primary.background_color
      ? theme === "light"
        ? "light"
        : "dark"
      : "light";

  const lightBorderCondition =
    theme !== "dark" &&
    (slice.primary.background_color === "default" ||
      !slice.primary.background_color);

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container">
        <div
          className={clsx(
            "rounded-xl py-8 md:py-12 px-6 md:px-16 overflow-hidden relative mt-8 xl:mt-14 first:mt-0",
            generateBackgroundClasses(slice.primary.background_color, theme, [
              "bg-gray-F7 text-gray-15",
              "bg-gray-1F text-white"
            ])
          )}
        >
          <div>
            <div className="flex flex-col gap-8">
              <div className="flex items-center justify-between h-10">
                <Heading field={slice.primary.heading} size="lg" />
                {isFilled.link(slice.primary.link) && (
                  <Button
                    className=""
                    field={slice.primary.link}
                    theme={theme}
                    style="tertiary"
                  >
                    {slice.primary.link_label}
                  </Button>
                )}
              </div>
              <div
                className={clsx(
                  "flex flex-col sm:flex-row sm:gap-8 italic border-t border-b py-6",
                  {
                    "border-gray-50": !lightBorderCondition,
                    "border-gray-AC": lightBorderCondition
                  }
                )}
              >
                <QuoteIcon className="w-6 h-6 mb-4 shrink-0" />
                <Copy
                  field={slice.primary.quote}
                  muted
                  theme={copyTheme}
                  size="xl"
                  className="max-w-3xl 2xl:max-w-4xl"
                />
              </div>
              <footer className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="rounded-full w-14 h-14 overflow-hidden relative">
                    <PrismicNextImage
                      field={slice.primary.image}
                      className="object-cover w-14 h-14"
                      width={56}
                      height={56}
                      fallbackAlt=""
                    />
                  </div>
                  <div>
                    <Copy size="lg" theme={copyTheme}>
                      {slice.primary.author}
                    </Copy>
                    {isFilled.keyText(slice.primary.author_detail) && (
                      <Copy muted theme={copyTheme}>
                        {slice.primary.author_detail}
                      </Copy>
                    )}
                  </div>
                </div>
                {isFilled.image(slice.primary.logo) && (
                  <SVG
                    src={slice.primary.logo.url}
                    className="max-h-6 w-auto h-full max-w-[120px]"
                  />
                )}
              </footer>
            </div>
          </div>
        </div>
      </div>
    </SliceLayout>
  );
};

export default TestimonialsCaseStudy;
