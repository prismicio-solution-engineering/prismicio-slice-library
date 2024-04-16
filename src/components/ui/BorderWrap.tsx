import clsx from "clsx";

import type { SliceZoneContext } from "@/lib/types";

export type BorderWrapProps = {
  radius?: "xl" | "2xl";
  theme: SliceZoneContext["theme"];
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  muted?: boolean;
  disableOnDark?: boolean;
  noBorder?: boolean;
};

/**
 * BorderWrap
 * @param {string} radius Border radius
 * @param {string} theme Theme of border
 * @param {React.ReactNode} children Children
 * @param {string} className Additional class names
 * @param {string} innerClassName Additional class names for inner div
 * @param {boolean} muted Muted borders
 * @param {boolean} disableOnDark No border on dark theme
 * @param {boolean} noBorder No border
 * @returns {JSX.Element} BorderWrap component
 * @example
 * <BorderWrap theme="light">
 *  <PrismicNextImage field={image} />
 * </BorderWrap>
 */

export const BorderWrap = ({
  radius = "2xl",
  theme = "light",
  children,
  className,
  innerClassName,
  muted = false,
  disableOnDark = false,
  noBorder = false
}: BorderWrapProps) => {
  return (
    <div className={clsx("relative p-px", className)}>
      <div
        className={clsx("absolute inset-0 z-10 pointer-events-none", {
          "rounded-xl": radius === "xl",
          "rounded-2xl": radius === "2xl",
          "border-gray-EE": theme === "light" && muted,
          "border-gray-15": theme === "light" && !muted,
          "border-gray-50": theme === "dark",
          "border-2":
            (theme === "dark" && !disableOnDark && !noBorder) ||
            (theme === "light" && !noBorder) ||
            (!noBorder && !disableOnDark)
        })}
      />
      <div
        className={clsx(
          "overflow-hidden",
          {
            "rounded-xl": radius === "xl",
            "rounded-2xl": radius === "2xl"
          },
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
};
