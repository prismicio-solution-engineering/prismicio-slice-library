import clsx from "clsx";

import type { SliceZoneContext } from "@/lib/types";
import type { KeyTextField } from "@prismicio/client";

export type ImageCaptionProps = {
  text: KeyTextField;
  className?: string;
  theme?: SliceZoneContext["theme"];
};

/**
 * ImageCaption
 * @param {string} text Text to display
 * @param {string} className Additional class names
 * @returns {JSX.Element} ImageCaption component
 * @example
 * <ImageCaption text={caption} theme="light" />
 */

export const ImageCaption = ({
  text,
  className,
  theme = "light"
}: ImageCaptionProps) => {
  return (
    <figcaption
      className={clsx(
        "font-headings block text-xs-flat font-medium leading-4 mt-4",
        {
          "text-gray-50": theme === "light",
          "text-gray-AC": theme === "dark"
        },
        className
      )}
    >
      {text}
    </figcaption>
  );
};
