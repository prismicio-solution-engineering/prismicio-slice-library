"use client";

import clsx from "clsx";
import React from "react";
import {
  AccordionItem as AccordionItemComponent,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemState
} from "react-accessible-accordion";

import ArrowIcon from "@/assets/svg/arrow.svg";
import { Copy } from "@/components/modules/Copy";
import { Heading } from "@/components/ui/Heading";

import type { SliceZoneContext } from "@/lib/types";
import type { RichTextField, TitleField } from "@prismicio/client";

export type AccordionItemProps = {
  index: number;
  heading: TitleField | string;
  subheading?: RichTextField;
  theme: SliceZoneContext["theme"];
  children?: React.ReactNode;
  arrow?: boolean;
};

export const AccordionItem = ({
  index,
  heading,
  subheading,
  theme,
  children,
  arrow = false
}: AccordionItemProps) => {
  return (
    <AccordionItemComponent uuid={index.toString()}>
      <AccordionItemState>
        {({ expanded }) => (
          <div
            className={clsx("border rounded-xl overflow-hidden", {
              "hover:bg-gray-F7 transition-colors border-gray-EE":
                theme === "light",
              "hover:bg-gray-1F transition-colors border-gray-30":
                theme === "dark",
              "bg-gray-F7": theme === "light" && expanded,
              "bg-gray-1F": theme === "dark" && expanded
            })}
          >
            <AccordionItemHeading>
              <AccordionItemButton className="flex items-center justify-between">
                {typeof heading === "string" ? (
                  <Heading
                    as={"h3"}
                    size="md"
                    className={clsx("text-left p-8", {
                      "opacty-50": !expanded
                    })}
                  >
                    {heading}
                  </Heading>
                ) : (
                  <Heading
                    size="md"
                    field={heading}
                    className={clsx("text-left p-8", {
                      "opacty-50": !expanded
                    })}
                  />
                )}
                {arrow && (
                  <ArrowIcon
                    className={clsx(
                      "w-8 h-8 transition-transform mr-8 shrink-0",
                      expanded ? "-rotate-90" : "rotate-90"
                    )}
                  />
                )}
              </AccordionItemButton>
            </AccordionItemHeading>

            {expanded && (
              <AccordionItemPanel>
                {children ? (
                  <div className="-mt-4 p-8 pt-0 min-h-[116px]">{children}</div>
                ) : (
                  <Copy
                    field={subheading}
                    muted
                    className="-mt-4 p-8 pt-0 min-h-[116px]"
                    theme={theme}
                  />
                )}
              </AccordionItemPanel>
            )}
          </div>
        )}
      </AccordionItemState>
    </AccordionItemComponent>
  );
};
