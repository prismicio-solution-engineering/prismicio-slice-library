import type { SliceZoneContext } from "@/lib/types";

export const getTheme = (
  theme: string,
  contextTheme: SliceZoneContext["theme"]
) => {
  return theme && (theme === "light" || theme === "dark")
    ? theme
    : contextTheme;
};
