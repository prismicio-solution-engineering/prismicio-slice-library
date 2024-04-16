"use client";

import clsx from "clsx";
import { Fragment, useEffect, useState } from "react";

import CrownIcon from "@/assets/svg/crown.svg";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

import type { SliceZoneContext } from "@/lib/types";

type FormMultiSelectProps = {
  options: SelectOption[];
  label?: string;
  theme: SliceZoneContext["theme"];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
};

type SelectOption = {
  value: string;
  label: string;
};

export const FormMultiSelect = ({
  options,
  label,
  theme,
  placeholder,
  onChange,
  className
}: FormMultiSelectProps) => {
  const [value, setValue] = useState<SelectOption[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const handleChange = (option: SelectOption[]) => {
    setValue(option);
  };

  useEffect(() => {
    if (isMounted) {
      const values = value.map((option) => option.value);
      onChange(values);
    } else {
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className={`w-full ${className}`}>
      {label && <label className="font-bold block mb-3">{label}</label>}
      <Listbox value={value} onChange={handleChange} multiple>
        <div className="relative">
          {value.length === 0 ? (
            <Listbox.Button className="relative cursor-pointer w-full rounded-lg border-2 px-4 py-2 leading-7 pr-10 text-left focus:outline-none focus:ring-4 focus:ring-tertiary-purple">
              <span className="block truncate">{placeholder}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDownIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
          ) : (
            <Listbox.Button
              className={clsx(
                "relative cursor-pointer w-full rounded-lg border-2 px-4 py-2 leading-7 pr-10 text-left focus:outline-none focus:ring-4 focus:ring-tertiary-purple",
                {
                  "bg-white border-gray-15": theme === "light",
                  "bg-gray-15 border-gray-50": theme === "dark"
                }
              )}
            >
              <span className="block truncate font-semibold">
                {value.map((value) => value.label).join(", ")}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />
              </span>
            </Listbox.Button>
          )}
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
                      <span className="block truncate font-semibold">
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          {option.value === "3 gold" ||
                          option.value === "2 silver" ||
                          option.value === "1 bronze" ? (
                            <CrownIcon
                              className={clsx("h-5 w-5", {
                                "text-[#FFD600]": option.value === "3 gold",
                                "text-gray-A4": option.value === "2 silver",
                                "text-[#EE8950]": option.value === "1 bronze"
                              })}
                              aria-hidden="true"
                            />
                          ) : (
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          )}
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
