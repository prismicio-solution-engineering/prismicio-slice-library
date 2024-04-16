import type { PrismicColors, SliceZoneContext } from "../types";

/**
 * Generate background classes based on the color passed in
 * @param {string} color - Color to generate background classes for
 * @param {string[]} fallback - Array of fallback colors to use if no color is passed in or if the color is not found
 * @param {string} theme - Theme to use for fallback colors
 * @returns {string} - Background classes
 * @example
 * generateBackgroundClasses("purple", ["bg-gray-15", "bg-gray-1"], "light")
 */

export const generateBackgroundClasses = (
  color: PrismicColors | "default",
  theme?: SliceZoneContext["theme"],
  fallback?: [string, string]
) => {
  switch (color) {
    case "purple":
      return "bg-quaternary-purple text-gray-15";
    case "orange":
      return "bg-quaternary-orange text-gray-15";
    case "green":
      return "bg-quaternary-green text-gray-15";
    case "pink":
      return "bg-quaternary-pink text-gray-15";
    case "blue":
      return "bg-quaternary-blue text-gray-15";
    default:
      return fallback
        ? theme === "light"
          ? fallback[0]
          : fallback[1]
        : "bg-quaternary-purple text-gray-15";
  }
};
