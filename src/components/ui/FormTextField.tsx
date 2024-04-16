import clsx from "clsx";

import type { SliceZoneContext } from "@/lib/types";

type FormTextFieldProps = {
  className?: string;
  label?: string;
  theme?: SliceZoneContext["theme"];
  [x: string]: any;
};

export const FormTextField = ({
  className,
  label,
  theme,
  ...rest
}: FormTextFieldProps) => {
  return (
    <div className={className}>
      {label && <label className="font-bold block mb-3">{label}</label>}
      <input
        {...rest}
        className={clsx(
          "rounded-lg border-2 px-4 py-2 leading-7 focus:outline-none focus:ring-4 focus:ring-tertiary-purple w-full",
          {
            "bg-white border-gray-15": theme === "light" || !theme,
            "bg-gray-15 border-gray-50": theme === "dark"
          }
        )}
      />
    </div>
  );
};
