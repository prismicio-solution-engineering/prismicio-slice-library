import clsx from "clsx";

import { Copy } from "@/components/modules/Copy";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import {
  isFilled,
  KeyTextField,
  RichTextField,
  TitleField
} from "@prismicio/client";

import type { PrismicColors, SliceZoneContext } from "@/lib/types";

type SliceHeaderProps = {
  heading?: TitleField;
  subheading?: RichTextField;
  eyebrow?: KeyTextField;
  eyebrowColor?: PrismicColors;
  theme: SliceZoneContext["theme"];
  align?: "left" | "center";
  children?: React.ReactNode;
};

/**
 * SliceHeader
 * @param {TitleField} heading Title field
 * @param {RichTextField} subheading Subheading field
 * @param {KeyTextField} eyebrow Eyebrow field
 * @param {PrismicColors} eyebrowColor Eyebrow color
 * @param {SliceZoneContext["theme"]} theme Theme context
 * @param {"left" | "center"} align Alignment of text
 * @param {React.ReactNode} children Children
 * @returns {JSX.Element | null} SliceHeader component
 * @example
 * <SliceHeader
 *  heading={heading}
 *  subheading={subheading}
 *  eyebrow={eyebrow}
 *  eyebrowColor={eyebrowColor}
 *  theme={theme}
 * >
 *   <CallToActions items={slice.items} />
 * </SliceHeader>
 */

export const SliceHeader = ({
  heading,
  subheading,
  eyebrow,
  eyebrowColor = "purple",
  theme,
  align = "left",
  children
}: SliceHeaderProps) =>
  isFilled.title(heading) || isFilled.richText(subheading) ? (
    <header
      className={clsx({
        "text-center mx-auto": align === "center"
      })}
    >
      {isFilled.keyText(eyebrow) && (
        <Eyebrow
          text={eyebrow}
          color={eyebrowColor}
          className={clsx({
            "mx-auto": align === "center"
          })}
        />
      )}
      <Heading
        size="2xl"
        field={heading}
        className={clsx("max-w-[22em]", {
          "mx-auto": align === "center"
        })}
      />
      <Copy
        size="lg"
        muted
        field={subheading}
        className={clsx("mt-6 max-w-[36em]", {
          "mx-auto": align === "center"
        })}
        theme={theme}
      />
      {children}
    </header>
  ) : null;
