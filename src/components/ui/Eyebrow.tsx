import { clsx } from "clsx";

import type { PrismicColors } from "@/lib/types";

export type EyebrowProps = {
  text?: string;
  children?: React.ReactNode;
  size?: "sm" | "lg";
  color?: PrismicColors | null | undefined | false;
  className?: string;
  margin?: boolean;
};

/**
 * Eyebrow
 * @param {string} text Text to display
 * @param {string} children Text to display
 * @param {string} size Size of text
 * @param {string} color Color of text
 * @param {string} className Additional class names
 * @param {boolean} margin Add margin to bottom
 * @returns {JSX.Element} Eyebrow component
 * @example
 * <Eyebrow text="Eyebrow" color="green" />
 */

export const Eyebrow = ({
  text,
  children,
  size = "lg",
  color,
  className,
  margin = true
}: EyebrowProps) => {
  return (
    <span
      className={clsx(
        "block",
        {
          "font-bold text-base md:text-md": size === "lg",
          "font-semibold text-sm-flat 2xl:text-base-flat": size === "sm",
          "text-primary-green": color === "green",
          "text-primary-orange": color === "orange",
          "text-primary-purple": color === "purple",
          "text-primary-blue": color === "blue",
          "text-primary-pink": color === "pink",
          "opacity-50": !color,
          "mb-4": margin
        },
        className
      )}
    >
      {text ? text : children}
    </span>
  );
};
