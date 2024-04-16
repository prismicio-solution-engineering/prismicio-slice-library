import clsx from "clsx";

import type { SliceZoneContext } from "@/lib/types";

export type SliceLayoutProps = {
  children: React.ReactNode;
  sliceTheme?: boolean;
  theme?: SliceZoneContext["theme"];
  className?: string;
  padding?: "top" | "bottom" | "both" | "none" | "small";
  mutedBackground?: boolean;
};

/**
 * SliceLayout
 * @param {React.ReactNode} children - Child components
 * @param {boolean} sliceTheme - Tells if the slice has a theme or if it's inherited from the page
 * @param {SliceZoneContext["theme"]} theme - The theme of the component
 * @param {string} className - Additional class names
 * @param {"top" | "bottom" | "both" | "none" | "small"} padding - Vertical padding
 * @param {boolean} mutedBackground - If the background should be off theme
 * @returns {JSX.Element | null} SliceLayout component
 * @example
 * <SliceLayout theme={theme} sliceTheme={themeFromSlice}>
 *   <div className="container">...</div>
 * </SliceLayout>
 */

export const SliceLayout = ({
  children,
  sliceTheme,
  theme,
  className,
  padding = "both",
  mutedBackground = false
}: SliceLayoutProps) => {
  return (
    <div
      className={clsx(
        "slice-layout w-full",
        {
          "bg-gray-15 text-white":
            sliceTheme && theme === "dark" && !mutedBackground,
          "bg-white text-gray-15":
            sliceTheme && theme === "light" && !mutedBackground,
          "bg-gray-1F text-white": theme === "dark" && mutedBackground,
          "bg-gray-F7 text-gray-15": theme === "light" && mutedBackground,
          "text-white": !sliceTheme && theme === "dark",
          "text-gray-15": !sliceTheme && theme === "light",
          "py-12 md:py-20 2xl:py-24": padding === "both",
          "py-12": padding === "small",
          "pt-12 md:pt-20 2xl:pt-24": padding === "top",
          "pb-12 md:pb-20 2xl:pb-24": padding === "bottom",
          "py-0": padding === "none"
        },
        className
      )}
    >
      {children}
    </div>
  );
};
