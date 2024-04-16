import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";

import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { Heading } from "@/components/ui/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type CallToActionCardsPhotoProps = {
  slice: Content.MainCallToActionSliceCardsPhoto;
  theme: SliceZoneContext["theme"];
};

const CallToActionCardsPhoto = ({
  slice,
  theme
}: CallToActionCardsPhotoProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container flex flex-col md:flex-row gap-4 2xl:gap-6">
        <div
          className={clsx(
            "rounded-xl md:w-1/2 p-6 md:p-12 lg:p-20 flex items-center order-2 md:order-1",
            {
              "bg-gray-1F text-gray-15": theme === "dark",
              "bg-gray-1F text-white": theme !== "dark"
            }
          )}
        >
          <div className="max-w-[740px]">
            <Heading
              size="2xl"
              field={slice.primary.heading}
              className="text-white"
            />
            <Copy
              size="lg"
              field={slice.primary.subheading}
              className="mt-6"
              muted
              theme="dark"
            />
            <CallToActions
              items={slice.items}
              theme="dark"
              className="mt-6 lg:mt-10"
              clickPosition="call_to_action_slice_cards_photo"
            />
          </div>
        </div>
        {isFilled.image(slice.primary.image) && (
          <div className="md:w-1/2 rounded-xl relative overflow-hidden pb-[70%] md:pb-0 order-1 md:order-2">
            <PrismicNextImage
              className="object-cover"
              field={slice.primary.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1300px) 50vw, 33vw"
              fill
              fallbackAlt=""
            />
          </div>
        )}
      </div>
    </SliceLayout>
  );
};

export default CallToActionCardsPhoto;
