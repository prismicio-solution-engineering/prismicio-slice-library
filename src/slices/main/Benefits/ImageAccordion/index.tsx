"use client";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { AccordionWrapper } from "@/components/ui/AccordionWrapper";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { SliceHeader } from "@/components/modules/SliceHeader";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { BorderWrap } from "@/components/ui/BorderWrap";
import { Tab } from "@headlessui/react";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { SliceZoneContext } from "@/lib/types";

export type BenefitsImageAccordionProps = {
  slice: Content.MainBenefitsSliceImageAccordion;
  theme: SliceZoneContext["theme"];
};

const BenefitsImageAccordion = ({
  slice,
  theme
}: BenefitsImageAccordionProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container">
        <SliceHeader
          heading={slice.primary.heading}
          subheading={slice.primary.subheading}
          eyebrow={slice.primary.eyebrow}
          eyebrowColor={slice.primary.eyebrow_color}
          theme={theme}
        />
        <div className="flex flex-col md:flex-row mt-8 2xl:mt-14 first:mt-0 gap-2 sm:gap-4 2xl:gap-6">
          <Tab.Group
            vertical
            onChange={setSelectedIndex}
            selectedIndex={selectedIndex}
            defaultIndex={0}
          >
            <Tab.Panels className="md:w-6/12 relative">
              <BorderWrap theme={theme}>
                {slice.items.map((item, index) => (
                  <Tab.Panel
                    key={index}
                    unmount={false}
                    className="overflow-hidden aspect-w-8 aspect-h-6"
                  >
                    <AnimatePresence>
                      {selectedIndex == index && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={{
                            visible: { opacity: 1 },
                            hidden: { opacity: 0 }
                          }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <PrismicNextImage
                            field={item.image}
                            className="h-full w-full object-cover"
                            fill
                            fallbackAlt=""
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Tab.Panel>
                ))}
              </BorderWrap>
            </Tab.Panels>
            <Tab.List className="md:w-6/12">
              <AccordionWrapper>
                {slice.items.map((item, index) => (
                  <Tab key={index} className="focus:outline-none text-left">
                    <AccordionItem
                      index={index}
                      theme={theme}
                      heading={item.heading}
                      subheading={item.subheading}
                    />
                  </Tab>
                ))}
              </AccordionWrapper>
            </Tab.List>
          </Tab.Group>
        </div>
      </div>
    </SliceLayout>
  );
};

export default BenefitsImageAccordion;
