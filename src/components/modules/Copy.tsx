import { cva, cx } from "class-variance-authority";
import clsx from "clsx";

import { FormattedRichText } from "@/components/modules/FormattedRichText";
import { isFilled } from "@prismicio/client";

import type { RichTextField } from "@prismicio/client";
import type { VariantProps } from "class-variance-authority";
import type { SliceZoneContext } from "@/lib/types";

type CopyProps = {
  className?: string;
  size?: VariantProps<typeof copyStyles>["size"];
  field?: RichTextField;
  muted?: boolean;
  children?: React.ReactNode;
  paragraphClassName?: string;
  smallHeadings?: boolean;
  smallLists?: boolean;
  horizontalLists?: boolean;
  slimExceptImages?: boolean;
  underlineLinks?: boolean;
  theme?: SliceZoneContext["theme"];
};

/**
 * Copy
 * @param {string} className - Additional class names
 * @param {string} size - The size of text
 * @param {RichTextField} field - RichTextField from Prismic
 * @param {boolean} muted - More subtle text color
 * @param {React.ReactNode} children - Child components
 * @param {string} paragraphClassName - Additional class names for paragraphs
 * @param {boolean} smallHeadings - Make headings smaller
 * @param {boolean} smallLists - Make lists smaller
 * @param {boolean} horizontalLists - Make lists horizontal
 * @param {boolean} slimExceptImages - Make text slimmer except for images
 * @param {SliceZoneContext["theme"]} theme - The theme of the component
 * @returns {JSX.Element | null} Copy component
 * @example <Copy field={slice.primary.subheadiing} />
 */

const copyStyles = cva("font-copy", {
  variants: {
    size: {
      xs: "text-xs font-medium", // 12/-/-
      sm: "text-base font-medium print:text-[10px] print:text-justify", // 16/-/-
      md: "text-base 2xl:text-md font-medium print:text-[12px] print:text-justify", // 16/-/18
      lg: "text-base lg:text-md 2xl:text-xl font-medium print:text-[14px] print:text-justify", // 16/18/22
      xl: "text-2xl 2xl:text-3xl font-medium" // 24/-/28
    }
  },
  defaultVariants: {
    size: "md"
  }
});

export const Copy = ({
  className,
  size,
  field,
  muted,
  children,
  paragraphClassName,
  smallHeadings,
  smallLists,
  horizontalLists,
  slimExceptImages,
  underlineLinks,
  theme
}: CopyProps) => {
  if (isFilled.richText(field)) {
    return (
      <div className={cx(copyStyles({ size }), className)}>
        <FormattedRichText
          field={field}
          smallHeadings={smallHeadings}
          smallLists={smallLists}
          horizontalLists={horizontalLists}
          slimExceptImages={slimExceptImages}
          underlineLinks={underlineLinks}
          paragraphClassName={paragraphClassName}
          muted={muted}
          theme={theme}
        />
      </div>
    );
  } else if (children) {
    return (
      <div
        className={cx(
          copyStyles({ size }),
          className,
          clsx({
            "text-gray-15": theme !== "dark" && !muted,
            "text-white": theme === "dark" && !muted,
            "text-gray-50": theme !== "dark" && muted,
            "text-gray-A4": theme === "dark" && muted
          })
        )}
      >
        {children}
      </div>
    );
  } else {
    return null;
  }
};
