"use client";

import { AccordionWrapper } from "@/components/ui/AccordionWrapper";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { Copy } from "@/components/modules/Copy";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { Heading } from "@/components/ui/Heading";
import { asText, Content } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

export type FaqDefaultProps = {
  slice: Content.MainFaqSliceDefault;
  theme: SliceZoneContext["theme"];
};

const FaqDefault = ({ slice, theme }: FaqDefaultProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  const jsonSchema = () => {
    const items = slice.items.map((item) => {
      return {
        "@type": "Question",
        name: asText(item.question),
        acceptedAnswer: {
          "@type": "Answer",
          text: asText(item.answer)
        }
      };
    });

    return {
      __html: `
          {
            "@context":"https://schema.org",
            "@type":"FAQPage",
            "mainEntity": ${JSON.stringify(items)}
          }
          `
    };
  };

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonSchema()}
        key="item-jsonld-faq"
      />
      <div className="container lg:grid lg:grid-cols-2 lg:gap-6 items-start">
        <div className="lg:sticky lg:top-32">
          <div className="max-w-lg">
            <Heading
              size="2xl"
              field={slice.primary.heading}
              className="mt-2 first:mt-0"
            />
            <Copy
              size="lg"
              field={slice.primary.subheading}
              className="mt-6 opacity-75"
            />
          </div>
        </div>
        <div className="mt-8 lg:mt-0">
          <AccordionWrapper>
            {slice.items.map((item, index) => (
              <AccordionItem
                key={index}
                index={index}
                theme={theme}
                heading={item.question}
                subheading={item.answer}
              />
            ))}
          </AccordionWrapper>
        </div>
      </div>
    </SliceLayout>
  );
};

export default FaqDefault;
