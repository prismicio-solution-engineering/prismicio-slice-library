import clsx from "clsx";
import { SliceLayout } from "@/components/layout/SliceLayout";

import { CallToActions } from "@/components/modules/CallToActions";
import { Copy } from "@/components/modules/Copy";
import { BorderWrap } from "@/components/ui/BorderWrap";
import { Heading } from "@/components/ui/Heading";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type CallToActionCardsIllustrationProps = {
  slice: Content.MainCallToActionSliceCardsIllustration;
  theme: SliceZoneContext["theme"];
};

const CallToActionCardsIllustration = ({
  slice,
  theme
}: CallToActionCardsIllustrationProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container">
        <Heading
          size="2xl"
          field={slice.primary.heading}
          className="mt-2 text-center title-limiter mx-auto max-w-[14em]"
        />
        {isFilled.image(slice.primary.image) &&
          (slice.primary.image_offset === true ? (
            <div className="w-full relative mt-12">
              <svg
                viewBox={`0 0 ${slice.primary.image.dimensions.width} ${slice.primary.image.dimensions.height}`}
              />
              <PrismicNextImage
                field={slice.primary.image}
                className="scale-[1.2] h-auto w-full origin-bottom absolute bottom-0 left-0"
                fallbackAlt=""
              />
            </div>
          ) : (
            <BorderWrap theme={theme} className="mt-12">
              <PrismicNextImage
                className="w-full h-auto"
                field={slice.primary.image}
                fallbackAlt=""
              />
            </BorderWrap>
          ))}
        <div
          className={clsx(
            "flex flex-col sm:flex-row gap-6 justify-between sm:items-center p-6 md:p-12 lg:p-20 rounded-xl mt-4 2xl:mt-6",
            {
              "bg-gray-F7": theme === "light",
              "bg-gray-1F": theme === "dark"
            }
          )}
        >
          <div>
            <Copy
              size="lg"
              muted
              field={slice.primary.subheading}
              className="max-w-[32em]"
              theme={theme}
            />
          </div>
          <CallToActions
            items={slice.items}
            theme={theme}
            clickPosition="call_to_action_slice_cards_illustration"
          />
        </div>
      </div>
    </SliceLayout>
  );
};

export default CallToActionCardsIllustration;
