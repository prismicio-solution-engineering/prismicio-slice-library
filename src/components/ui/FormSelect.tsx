"use client";

import clsx from "clsx";
import { Fragment, SetStateAction, useState } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

import type { SliceZoneContext } from "@/lib/types";

type FormSelectProps = {
  options: { label: string; value: string | boolean | number }[];
  label?: string;
  theme: SliceZoneContext["theme"];
  onChange: SetStateAction<any>;
  placeholder?: string;
  className?: string;
};

export const FormSelect = ({
  options,
  label,
  theme,
  placeholder,
  onChange,
  className
}: FormSelectProps) => {
  const initialValue = placeholder ? placeholder : options[0];

  const [value, setValue] = useState(initialValue);

  const handleChange = (option: { label: string; value: string }) => {
    setValue(option);
    onChange(option.value);
  };

  return (
    <div className={`w-full font-headings ${className}`}>
      {label && <label className="font-bold block mb-3">{label}</label>}
      <Listbox value={value} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button
            className={clsx(
              "relative w-full cursor-pointer rounded-lg border-2 px-4 py-2 leading-7 pr-10 text-left focus:outline-none focus:ring-4 focus:ring-tertiary-purple",
              {
                "bg-white border-gray-15": theme === "light",
                "bg-gray-15 border-gray-50": theme === "dark"
              }
            )}
          >
            <span className="block truncate">
              {typeof value !== "string" ? value.label : placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={clsx(
                "absolute mt-1 max-h-60 w-full overflow-auto rounded-lg border-2 py-1 shadow-lg focus:outline-none",
                {
                  "bg-white border-gray-15": theme === "light",
                  "bg-gray-15 border-gray-50 ": theme === "dark"
                }
              )}
            >
              {options.map((option, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    clsx(
                      "relative cursor-pointer select-none py-2 pl-10 pr-4",
                      {
                        "bg-gray-F7": active && theme === "light",
                        "bg-gray-1F": active && theme === "dark"
                      }
                    )
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};
