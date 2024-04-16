"use client";

import clsx from "clsx";
import SVG from "react-inlinesvg";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { Heading } from "@/components/ui/Heading";
import { Content, isFilled } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

export type LogotypesDefaultProps = {
  slice: Content.MainLogotypesSliceDefault;
  theme: SliceZoneContext["theme"];
};

const LogotypesDefault = ({ slice, theme }: LogotypesDefaultProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  const count = slice.items.length;

  return (
    <SliceLayout
      sliceTheme={themeFromSlice}
      theme={theme}
      mutedBackground={!slice.primary.remove_background}
    >
      <div className="container">
        {isFilled.title(slice.primary.heading) && (
          <Heading field={slice.primary.heading} size="md" />
        )}
        <div
          className={clsx(
            "mt-8 2xl:mt-14 flex flex-wrap gap-12 lg:gap-24 items-center lg:flex-nowrap",
            {
              "lg:justify-between": count > 4
            }
          )}
        >
          {slice.items.map(
            (item, index) =>
              isFilled.image(item.logotype) && (
                <div className="h-6 w-24 lg:h-8 lg:w-32" key={index}>
                  <SVG
                    src={item.logotype.url}
                    className="h-full w-full max-h-8 max-w-32"
                  />
                </div>
              )
          )}
        </div>
      </div>
    </SliceLayout>
  );
};

export default LogotypesDefault;
