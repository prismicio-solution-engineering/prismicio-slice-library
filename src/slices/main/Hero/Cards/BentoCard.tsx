"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

import { Copy } from "@/components/modules/Copy";
import { BorderWrap } from "@/components/ui/BorderWrap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

export const BentoCard = ({
  item,
  index
}: {
  item: Content.MainHeroSliceCardsItem;
  index: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const [shadowBlur, setShadowBlur] = useState("19px");
  const [shadowOpacity, setShadowOpacity] = useState("0.12");
  const [shadowOpacityLow, setShadowOpacityLow] = useState("0.08");
  const [shadowDistance, setShadowDistance] = useState("12px");

  useEffect(() => {
    if (hovered) {
      setShadowBlur("28px");
      setShadowOpacity("0.4");
      setShadowOpacityLow("0.12");
      setShadowDistance("24px");
    } else {
      setShadowBlur("19px");
      setShadowOpacity("0.12");
      setShadowOpacityLow("0.08");
      setShadowDistance("12px");
    }
  }, [hovered]);

  return (
    <BorderWrap
      muted
      theme="light"
      className="w-full group h-full"
      innerClassName={clsx("h-full h-full relative overflow-hidden", {
        "bg-quaternary-orange": item.highlight === "orange",
        "bg-quaternary-green": item.highlight === "green",
        "bg-quaternary-blue": item.highlight === "blue",
        "bg-quaternary-purple": item.highlight === "purple",
        "bg-quaternary-pink": item.highlight === "pink",
        "bg-gray-F7": item.highlight === "none" || !item.highlight
      })}
    >
      <div
        className="relative gap-8 flex flex-col h-full overflow-hidden"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="px-8 lg:px-12 pt-8 lg:pt-12 flex flex-col gap-4">
          {isFilled.keyText(item.eyebrow) && (
            <Eyebrow color={item.eyebrow_color} className="mb-0">
              {item.eyebrow}
            </Eyebrow>
          )}
          <PrismicNextLink
            field={item.link}
            className="after:absolute after:inset-0"
          >
            <Heading
              field={item.heading}
              size="lg"
              className="max-w-[38rem]"
              balance={false}
            />
          </PrismicNextLink>
          <Copy
            field={item.subheading}
            muted
            theme="light"
            className="max-w-[32rem]"
          />
        </div>
        <PrismicNextLink field={item.link} className="grow">
          <div
            className={clsx(
              "pb-px grow transition-all group-hover:-translate-y-4",
              {
                "pl-8 lg:pl-12 pr-px": index === 0,
                "px-8 lg:px-12": index !== 0
              }
            )}
          >
            <div
              className={clsx("-mb-16 lg:-mb-32 relative", {
                "-mr-[240px]": index === 0
              })}
            >
              <PrismicNextImage
                field={item.image}
                className="w-full h-full object-cover object-left-top transition-all"
                style={{
                  boxShadow:
                    item.highlight === "orange"
                      ? `0px ${shadowDistance} ${shadowBlur} rgba(237, 107, 34, ${shadowOpacity})`
                      : item.highlight === "green"
                        ? `0px ${shadowDistance} ${shadowBlur} rgba(59, 187, 150, ${shadowOpacity})`
                        : item.highlight === "blue"
                          ? `0px ${shadowDistance} ${shadowBlur} rgba(89, 181, 248, ${shadowOpacity})`
                          : item.highlight === "purple"
                            ? `0px ${shadowDistance} ${shadowBlur} rgba(142, 68, 236, ${shadowOpacity})`
                            : item.highlight === "pink"
                              ? `0px ${shadowDistance} ${shadowBlur} rgba(249, 114, 137, ${shadowOpacity})`
                              : `0px ${shadowDistance} ${shadowBlur} rgba(0, 0, 0, ${shadowOpacityLow})`
                }}
              />
            </div>
          </div>
        </PrismicNextLink>
      </div>
      <svg
        viewBox="0 0 594 624"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(
          "absolute top-0 right-12 w-[calc(100%-48px)] h-auto -z-10",
          {
            "text-tertiary-orange": item.highlight === "orange",
            "text-tertiary-green": item.highlight === "green",
            "text-tertiary-blue": item.highlight === "blue",
            "text-tertiary-purple": item.highlight === "purple",
            "text-tertiary-pink": item.highlight === "pink",
            hidden: item.highlight === "none" || !item.highlight
          }
        )}
      >
        <path
          d="M-70.9191 570.935C-25.8873 606.051 75.5262 646.967 171.448 587.613C277.817 521.795 370.73 340.594 282.27 225.606C205.143 125.35 68.5786 224.175 93.1331 339.205C117.688 454.236 228.529 480.498 304.37 461.175C546.357 399.521 629.387 75.6119 567.941 -36.7606"
          stroke="currentColor"
          strokeWidth="12"
        />
      </svg>
      <div
        className={clsx("-z-20 inset-0 absolute", {
          "bg-quaternary-orange": item.highlight === "orange",
          "bg-quaternary-green": item.highlight === "green",
          "bg-quaternary-blue": item.highlight === "blue",
          "bg-quaternary-purple": item.highlight === "purple",
          "bg-quaternary-pink": item.highlight === "pink",
          "bg-gray-F7": item.highlight === "none" || !item.highlight
        })}
      />
    </BorderWrap>
  );
};
