import { cva, cx } from "class-variance-authority";

import { PrismicNextLink } from "@prismicio/next";

import type { VariantProps } from "class-variance-authority";

const buttonStyles = cva(
  "rounded-lg font-bold whitespace-nowrap focus:outline-none focus:ring-tertiary-purple disabled:opacity-50 group",
  {
    variants: {
      style: {
        primary:
          "border-2 focus:ring-4 transition-opacity transition-colors hover:bg-opacity-75 disabled:hover:bg-opacity-100",
        secondary:
          "border-2 focus:ring-4 transition-opacity transition-colors hover:bg-opacity-75",
        tertiary:
          "underline underline-offset-8 focus:ring-4 hover:underline-offset-4"
      },
      theme: {
        light: "border-gray-15",
        dark: "border-white"
      },
      size: {
        xs: "py-2 text-xs-flat leading-5",
        sm: "py-3 text-sm-flat leading-5 2xl:text-base-flat 2xl:leading-5",
        md: "py-3 text-sm-flat leading-5 2xl:text-base-flat 2xl:leading-5",
        lg: "py-5 text-sm-flat leading-5 2xl:text-base-flat 2xl:leading-5"
      }
    },
    compoundVariants: [
      {
        style: "primary",
        theme: "light",
        class: "bg-gray-15 text-white"
      },
      {
        style: "primary",
        theme: "dark",
        class: "bg-white text-gray-15"
      },
      {
        style: "secondary",
        theme: "light",
        class: "hover:bg-gray-15 text-gray-15 hover:text-white"
      },
      {
        style: "secondary",
        theme: "dark",
        class: "hover:bg-white text-white hover:text-gray-15"
      },
      {
        style: "primary",
        size: "xs",
        class: "px-4"
      },
      {
        style: "primary",
        size: "sm",
        class: "px-6"
      },
      {
        style: "primary",
        size: "md",
        class: "px-6"
      },
      {
        style: "primary",
        size: "lg",
        class: "px-8"
      },
      {
        style: "secondary",
        size: "xs",
        class: "px-4"
      },
      {
        style: "secondary",
        size: "sm",
        class: "px-6"
      },
      {
        style: "secondary",
        size: "md",
        class: "px-6"
      },
      {
        style: "secondary",
        size: "lg",
        class: "px-8"
      },
      {
        style: "tertiary",
        size: "xs",
        class: "-mx-2.5 px-2.5"
      },
      {
        style: "tertiary",
        size: "sm",
        class: "-mx-2.5 px-2.5"
      },
      {
        style: "tertiary",
        size: "md",
        class: "-mx-2.5 px-2.5"
      },
      {
        style: "tertiary",
        size: "lg",
        class: "-mx-2.5 px-2.5"
      }
    ],
    defaultVariants: {
      style: "primary",
      theme: "light",
      size: "md"
    }
  }
);

export type ButtonProps = {
  as?: React.ElementType;
  className?: string;
  theme?: VariantProps<typeof buttonStyles>["theme"];
  style?: VariantProps<typeof buttonStyles>["style"];
  size?: VariantProps<typeof buttonStyles>["size"];
  [x: string]: any;
};

/**
 * Button
 * @param {React.ElementType} as Element to render as, defaults to PrismicNextLink
 * @param {string} className Additional class names
 * @param {string} theme Button theme
 * @param {string} style Button style
 * @param {string} size Button size
 * @returns {JSX.Element} Button component
 * @example
 * <Button field={link} theme="dark" style="secondary" size="lg" />
 */

export const Button = ({
  as: Comp = PrismicNextLink,
  theme,
  style,
  className,
  children,
  size,
  ...rest
}: ButtonProps) => {
  if (!children) return <></>;

  return (
    <Comp
      className={cx(buttonStyles({ style, theme, size }), className)}
      {...rest}
    >
      {children}
    </Comp>
  );
};
