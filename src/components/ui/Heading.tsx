import { cva, cx } from "class-variance-authority";

import { createSlug } from "@/lib/utils/createSlug";
import { PrismicRichText } from "@prismicio/react";

import type { RichTextField } from "@prismicio/client";
import type { VariantProps } from "class-variance-authority";
const headingStyles = cva("font-headings tracking-tight scroll-mt-[120px]", {
  variants: {
    size: {
      xs: "text-base-tight 2xl:md-tight font-medium", // 16/-/18
      sm: "text-md-tight 2xl:text-lg font-medium", // 18/-/20
      "md-limited": "text-xl-tight font-medium", // 20/-/22
      md: "text-xl-tight 2xl:2xl-tight font-medium", // 22/-/24
      "lg-limited": "text-2xl-tight lg:text-3xl-tight font-medium", // 24/28
      lg: "text-2xl-tight lg:text-3xl-tight 2xl:text-4xl font-medium", // 24/28/32
      xl: "text-3xl-tight lg:text-4xl 2xl:text-5xl font-medium", // 28/32/40
      "2xl-limited": "text-3xl-tight lg:text-4xl font-bold", // 28/32
      "2xl": "text-4xl lg:text-5xl 2xl:text-6xl font-bold", // 32/40/48
      "3xl": "text-6xl lg:text-7xl 2xl:text-8xl font-bold" // 48/56/64
    }
  },
  defaultVariants: {
    size: "2xl"
  }
});

export type HeadingProps = {
  size?: VariantProps<typeof headingStyles>["size"];
  as?: React.ElementType;
  className?: string;
  field?: RichTextField;
  children?: React.ReactNode;
  id?: string;
  balance?: boolean;
};

/**
 * Heading
 * @param {string} size Size of heading
 * @param {React.ElementType} as Element type, defaults to PrismicRichText
 * @param {string} className Additional class names
 * @param {RichTextField} field Rich text field
 * @param {React.ReactNode} children Children
 * @param {string} id ID
 * @param {boolean} balance Balance text
 * @returns {JSX.Element} Heading component
 * @example
 * <Heading size="2xl" field={heading} />
 */

export const Heading = ({
  as: Comp = PrismicRichText,
  className,
  size = "2xl",
  field,
  children,
  id,
  balance = true
}: HeadingProps) => {
  if (field) {
    return (
      <Comp
        field={field}
        components={{
          heading1: ({ children }: any) => (
            <h1
              className={cx(
                headingStyles({ size }),
                className,
                balance ? "wrap-balance" : ""
              )}
            >
              {children}
            </h1>
          ),
          heading2: ({ children, node }: any) => (
            <h2
              id={id ? id : createSlug(node.text)}
              className={cx(
                headingStyles({ size }),
                className,
                balance ? "wrap-balance" : ""
              )}
            >
              {children}
            </h2>
          ),
          heading3: ({ children }: any) => (
            <h3
              id={id}
              className={cx(
                headingStyles({ size }),
                className,
                balance ? "wrap-balance" : ""
              )}
            >
              {children}
            </h3>
          ),
          heading4: ({ children }: any) => (
            <h4
              id={id}
              className={cx(
                headingStyles({ size }),
                className,
                balance ? "wrap-balance" : ""
              )}
            >
              {children}
            </h4>
          ),
          heading5: ({ children }: any) => (
            <h5
              id={id}
              className={cx(
                headingStyles({ size }),
                className,
                balance ? "wrap-balance" : ""
              )}
            >
              {children}
            </h5>
          ),
          heading6: ({ children }: any) => (
            <h6
              id={id}
              className={cx(
                headingStyles({ size }),
                className,
                balance ? "wrap-balance" : ""
              )}
            >
              {children}
            </h6>
          )
        }}
      />
    );
  } else {
    return (
      <Comp
        id={id}
        className={cx(
          headingStyles({ size }),
          className,
          balance ? "wrap-balance" : ""
        )}
      >
        {children}
      </Comp>
    );
  }
};
