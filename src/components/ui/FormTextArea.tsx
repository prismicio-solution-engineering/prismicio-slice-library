import clsx from "clsx";

import type { SliceZoneContext } from "@/lib/types";

type FormTextAreaProps = {
  className?: string;
  label?: string;
  theme?: SliceZoneContext["theme"];
  innerClassName?: string;
  innerStyle?: React.CSSProperties;
  [x: string]: any;
};

export const FormTextArea = ({
  className,
  label,
  theme,
  innerClassName,
  innerStyle,
  ...rest
}: FormTextAreaProps) => {
  return (
    <div className={className}>
      {label && <label className="font-bold block mb-3">{label}</label>}
      <textarea
        {...rest}
        style={innerStyle}
        className={clsx(
          "rounded-lg border-2 px-4 py-2 leading-7 focus:outline-none focus:ring-4 focus:ring-tertiary-purple w-full block",
          innerClassName,
          {
            "bg-white border-gray-15": theme === "light" || !theme,
            "bg-gray-15 border-gray-50": theme === "dark"
          }
        )}
      />
    </div>
  );
};
