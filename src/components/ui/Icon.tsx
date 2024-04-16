"use client";

import { cva, cx } from "class-variance-authority";
import SVG from "react-inlinesvg";

import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { VariantProps } from "class-variance-authority";

const iconStyles = cva("", {
  variants: {
    size: {
      sm: "w-8 h-8",
      md: "w-12 h-12",
      lg: "w-16 h-16"
    },
    color: {
      orange: "text-primary-orange",
      pink: "text-primary-pink",
      green: "text-primary-green",
      purple: "text-primary-purple",
      blue: "text-primary-blue",
      gray: "text-gray-50"
    }
  },
  defaultVariants: {
    size: "md",
    color: "orange"
  }
});

export type IconProps = {
  className?: string;
  src: string;
  size?: VariantProps<typeof iconStyles>["size"];
  color?: VariantProps<typeof iconStyles>["color"];
  fallback?: ImageField;
  theme?: "light" | "dark";
};

/**
 * Icon
 * @param {string} className Additional class names
 * @param {string} src Path to SVG
 * @param {string} size Size of icon
 * @param {string} color Color of icon
 * @param {ImageField} fallback Fallback image
 * @param {string} theme Theme
 * @returns {JSX.Element} Icon component
 * @example
 * <Icon src="/assets/svg/icon.svg" size="lg" color="purple" />
 */

export const Icon = ({
  className,
  src,
  size,
  color,
  fallback,
  theme
}: IconProps) => (
  <SVG className={cx(iconStyles({ size, color }), className)} src={src}>
    {fallback && (
      <div
        className={cx(
          "relative rounded-xl overflow-hidden",
          iconStyles({ size, color }),
          className
        )}
      >
        <PrismicNextImage
          className={cx(
            "z-10 relative",
            iconStyles({ size, color }),
            className
          )}
          field={fallback}
          fallbackAlt=""
        />
        <span
          className={cx("absolute inset-0", theme === "dark" ? "bg-white" : "")}
        />
      </div>
    )}
  </SVG>
);
