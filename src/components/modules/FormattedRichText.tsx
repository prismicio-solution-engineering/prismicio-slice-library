import clsx from "clsx";
import React from "react";

import CheckIcon from "@/assets/svg/check.svg";
import { Heading } from "@/components/ui/Heading";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { createSlug } from "@/lib/utils/createSlug";
import { inlineCode, inlineCodeClasses } from "@/lib/utils/inlineCode";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

import { BorderWrap } from "../ui/BorderWrap";

import type { RichTextField, TitleField } from "@prismicio/client";
import type { SliceZoneContext } from "@/lib/types";
export type FormattedRichTextProps = {
  field: RichTextField | TitleField;
  smallHeadings?: boolean;
  smallLists?: boolean;
  horizontalLists?: boolean;
  slimExceptImages?: boolean;
  underlineLinks?: boolean;
  paragraphClassName?: string;
  theme?: SliceZoneContext["theme"];
  muted?: boolean;
};

/**
 * FormattedRichText
 * @param {RichTextField | TitleField} field Rich text field
 * @param {boolean} smallHeadings Small headings
 * @param {boolean} smallLists Small lists
 * @param {boolean} horizontalLists Horizontal lists
 * @param {boolean} slimExceptImages Slim except images
 * @param {string} paragraphClassName Paragraph class name
 * @param {SliceZoneContext["theme"]} theme Theme context
 * @param {boolean} muted More subtle text color
 * @returns {JSX.Element | null} FormattedRichText component
 * @example
 * <FormattedRichText
 *  field={field}
 *  theme="light"
 *  muted={muted}
 * />
 */

export const FormattedRichText = ({
  field,
  smallHeadings,
  smallLists,
  horizontalLists,
  slimExceptImages,
  underlineLinks,
  paragraphClassName,
  theme,
  muted
}: FormattedRichTextProps) => (
  <PrismicRichText
    field={field}
    components={{
      heading1: ({ children, node }) => (
        <Heading
          as="h1"
          size="2xl"
          className={clsx(
            "mb-6 mt-12 first:mt-0 last:mb-0 print:mb-2 print:mt-8",
            {
              "xl:px-32": slimExceptImages
            }
          )}
          id={createSlug(node.text)}
        >
          {children}
        </Heading>
      ),
      heading2: ({ children, node }) => (
        <Heading
          as="h2"
          size="xl"
          className={clsx(
            "mb-6 mt-12 first:mt-0 last:mb-0 print:mb-2 print:mt-8",
            {
              "xl:px-32": slimExceptImages
            }
          )}
          id={createSlug(node.text)}
        >
          {children}
        </Heading>
      ),
      heading3: ({ children }) => (
        <Heading
          as="h3"
          size={smallHeadings ? "lg-limited" : "lg"}
          className={clsx(
            "mb-6 mt-12 first:mt-0 last:mb-0 print:mb-2 print:mt-8",
            {
              "xl:px-32": slimExceptImages
            }
          )}
        >
          {children}
        </Heading>
      ),
      heading4: ({ children }) => (
        <Heading
          as="h4"
          size={smallHeadings ? "md-limited" : "md"}
          className={clsx(
            "mb-6 mt-12 first:mt-0 last:mb-0 print:mb-2 print:mt-8",
            {
              "xl:px-32": slimExceptImages
            }
          )}
        >
          {children}
        </Heading>
      ),
      heading5: ({ children }) => (
        <Heading
          as="h5"
          size="sm"
          className={clsx(
            "mb-6 mt-12 first:mt-0 last:mb-0 print:mb-2 print:mt-8",
            {
              "xl:px-32": slimExceptImages
            }
          )}
        >
          {children}
        </Heading>
      ),
      heading6: ({ children }) => (
        <Heading
          as="h6"
          size="xs"
          className={clsx(
            "mb-6 mt-12 first:mt-0 last:mb-0 print:mb-2 print:mt-8",
            {
              "xl:px-32": slimExceptImages
            }
          )}
        >
          {children}
        </Heading>
      ),
      paragraph: ({ children }) => (
        <p
          className={clsx(
            "my-6 first:mt-0 last:mb-0 print:my-2",
            paragraphClassName,
            {
              "xl:px-32": slimExceptImages,
              "text-gray-15": theme !== "dark" && !muted,
              "text-white": theme === "dark" && !muted,
              "text-gray-50": theme !== "dark" && muted,
              "text-gray-A4": theme === "dark" && muted
            }
          )}
        >
          {inlineCode(children)}
        </p>
      ),
      list: ({ children }) => (
        <ul
          className={clsx("", {
            "xl:px-32": slimExceptImages,
            "text-gray-15": theme !== "dark" && !muted,
            "text-white": theme === "dark" && !muted,
            "text-gray-50": theme !== "dark" && muted,
            "text-gray-A4": theme === "dark" && muted,
            "bg-white border-gray-EE": theme !== "dark" && horizontalLists,
            "bg-gray-15 border-gray-50": theme === "dark" && horizontalLists,
            "flex flex-col md:flex-row gap-6 border-2 rounded-lg p-8 mt-8":
              horizontalLists
          })}
        >
          {children}
        </ul>
      ),
      oList: ({ children }) => (
        <ol
          className={clsx("list-decimal list-inside", {
            "xl:px-32": slimExceptImages,
            "text-gray-15": theme !== "dark" && !muted,
            "text-white": theme === "dark" && !muted,
            "text-gray-50": theme !== "dark" && muted,
            "text-gray-A4": theme === "dark" && muted
          })}
        >
          {children}
        </ol>
      ),
      span({ text, key }) {
        const result: React.ReactNode[] = [];

        let i = 0;
        for (const line of text.split("\n")) {
          if (i > 0) {
            result.push(<br key={`${i}__break`} />);
          }

          const parts = line.split("`");
          if (parts.length > 1) {
            for (let j = 0; j < parts.length; j++) {
              if (j % 2 === 0) {
                // Even parts contain text outside backticks
                result.push(
                  <React.Fragment key={`${i}__part${j}`}>
                    {parts[j]}
                  </React.Fragment>
                );
              } else {
                // Odd parts contain text within backticks
                result.push(
                  <code className={inlineCodeClasses} key={`${i}__part${j}`}>
                    {parts[j]}
                  </code>
                );
              }
            }
          } else {
            // No backticks found in the line
            result.push(
              <React.Fragment key={`${i}__line`}>{line}</React.Fragment>
            );
          }

          i++;
        }

        return <React.Fragment key={key}>{result}</React.Fragment>;
      },
      listItem: ({ children }) => (
        <li
          className={clsx("relative text-left", {
            "text-base my-4": smallLists && !horizontalLists,
            "my-6 first:mt-0 last:mb-0 pl-9 print:my-2 print:pl-6":
              !horizontalLists,
            "text-base font-bold md:max-w-[264px] flex items-center leading-5":
              horizontalLists
          })}
        >
          <CheckIcon
            className={clsx("text-primary-purple", {
              "w-7 h-7 shrink-0 mr-4": horizontalLists,
              "absolute left-0 top-0.5 w-6 h-6 print:w-4 print:h-4":
                !horizontalLists
            })}
          />
          {children}
        </li>
      ),
      oListItem: ({ children }) => (
        <li
          className={clsx("relative text-left", {
            "text-base my-4": smallLists && !horizontalLists,
            "my-4 first:mt-0 last:mb-0 print:my-2 print:pl-6": !horizontalLists,
            "text-base font-bold md:max-w-[264px] flex items-center leading-5":
              horizontalLists
          })}
        >
          {children}
        </li>
      ),
      hyperlink: ({ node, children, key }) => (
        <PrismicNextLink
          key={key}
          field={node.data}
          className={clsx({
            "text-primary-purple hover:underline": !underlineLinks,
            "underline underline-offset-4": underlineLinks,
            "hover:text-white": underlineLinks && theme === "dark",
            "hover:text-gray-15": underlineLinks && theme !== "dark"
          })}
        >
          {children}
        </PrismicNextLink>
      ),
      image: ({ node, key }) => (
        <BorderWrap
          key={key}
          className="my-12 first:mt-0 last:mb-0 w-full"
          theme={theme ?? "light"}
        >
          <PrismicNextImage field={node} className="w-full" fallbackAlt="" />
        </BorderWrap>
      ),
      embed: ({ node }) => {
        if (node.oembed.provider_name === "YouTube") {
          const url = new URL(node.oembed.embed_url);
          const videoId = url.searchParams.get("v");
          const time = url.searchParams.get("t");

          return (
            <BorderWrap theme={theme ? theme : "light"}>
              <YouTubeEmbed
                videoId={videoId!}
                startAt={time ? parseInt(time) : 0}
              />
            </BorderWrap>
          );
        } else {
          return null;
        }
      }
    }}
  />
);
