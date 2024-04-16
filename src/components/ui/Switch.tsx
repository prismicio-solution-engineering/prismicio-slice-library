"use client";

import clsx from "clsx";

import { Switch as SwitchComponent } from "@headlessui/react";

import type { SliceZoneContext } from "@/lib/types";

type SwitchProps = {
  value: boolean | undefined;
  setValue: ((value: boolean) => void) | undefined;
  options?: string[];
  screenReaderLabel?: string;
  trueExplainer?: string;
  theme: SliceZoneContext["theme"];
};

export const Switch = ({
  value,
  setValue,
  options = ["Monthly", "Annually"],
  trueExplainer = "(Save up to 25%)",
  screenReaderLabel = "Toggle billing",
  theme
}: SwitchProps) => {
  return (
    <div
      className={clsx("flex items-center justify-center gap-2 flex-wrap", {
        "text-gray-50": theme === "light",
        "text-gray-A4": theme === "dark"
      })}
    >
      <span>{options[0]}</span>
      <SwitchComponent
        checked={value}
        onChange={setValue}
        className={clsx(
          "relative inline-flex h-8 w-[54px] items-center rounded-full border-2",
          {
            "bg-white": theme === "light",
            "bg-gray-1F": theme === "dark"
          }
        )}
      >
        <span className="sr-only">{screenReaderLabel}</span>
        <span
          className={`${
            value ? "translate-x-6" : "translate-x-0.5"
          } inline-block h-6 w-6 transform rounded-full bg-primary-purple transition`}
        />
      </SwitchComponent>
      <span className="relative">
        {options[1]}
        {/* <span className="text-xs absolute -left-8 -right-8 text-center translate-y-full bottom-0 text-primary-purple font-semibold">
          {trueExplainer}
        </span> */}
      </span>
    </div>
  );
};
