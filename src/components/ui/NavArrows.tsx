import clsx from "clsx";

import ChevronIcon from "@/assets/svg/chevron.svg";

export type NavArrowsProps = {
  theme?: "light" | "dark";
  className?: string;
  id?: string;
};

/**
 * NavArrows
 * @param {string} theme Theme of arrows
 * @param {string} className Additional class names
 * @param {string} id ID of the slider
 * @returns {JSX.Element} NavArrows component
 * @example
 * <NavArrows theme="light" />
 */

export const NavArrows = ({ theme, className, id }: NavArrowsProps) => {
  return (
    <div className={clsx("gap-2 flex", className)} id={id}>
      <button
        aria-label="Previous"
        className={clsx(
          "prev rounded-full border-2 h-10 w-10 transition-all disabled:opacity-25 disabled:bg-transparent",
          {
            "border-white bg-white text-gray-15 disabled:text-white":
              theme === "light",
            "border-gray-15 bg-gray-15 text-white disabled:text-gray-15":
              theme === "dark"
          }
        )}
      >
        <ChevronIcon className="h-6 w-6 rotate-90 mx-auto" />
      </button>
      <button
        aria-label="Next"
        className={clsx(
          "next rounded-full border-2 h-10 w-10 transition-all disabled:opacity-25 disabled:bg-transparent",
          {
            "border-white bg-white text-gray-15 disabled:text-white":
              theme === "light",
            "border-gray-15 bg-gray-15 text-white disabled:text-gray-15":
              theme === "dark"
          }
        )}
      >
        <ChevronIcon className="h-6 w-6 -rotate-90 mx-auto" />
      </button>
    </div>
  );
};
