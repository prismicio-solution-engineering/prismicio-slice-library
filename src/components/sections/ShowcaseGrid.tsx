"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";

import ArrowIcon from "@/assets/svg/arrow.svg";
import { NoResults } from "@/components/sections/NoResults";
import { Button } from "@/components/ui/Button";
import { FormMultiSelect } from "@/components/ui/FormMultiSelect";
import { Heading } from "@/components/ui/Heading";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { createClient } from "@/prismicio";
import { RadioGroup } from "@headlessui/react";
import { asText, Content, filter, isFilled, Query } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

import type { WebsiteDocumentWithTechnology } from "@/lib/types";

const queryOptions = {
  fetchLinks: ["technology.title", "technology.logotype"],
  pageSize: 54,
  page: 1
};

type ShowcaseGridProps = {
  websites: Query<WebsiteDocumentWithTechnology>;
  technologies: Content.TechnologyDocument[];
  industries: Content.IndustryDocument[];
};

type ShowcaseCardProps = {
  website: WebsiteDocumentWithTechnology;
};

type SelectOptions = {
  value: string;
  label: string;
}[];

const ShowcaseCard = ({ website }: ShowcaseCardProps) => {
  const [isShowing, setIsShowing] = useState(false);
  const [heroHasLoaded, setHeroHasLoaded] = useState(false);

  website.data.screenshot.alt = website.data.screenshot.alt
    ? website.data.screenshot.alt
    : `${asText(website.data.name)} screenshot`;

  useEffect(() => {
    setIsShowing(true);
  }, []);

  return (
    <div
      className={clsx(
        "block rounded-2xl grow p-3 pb-4 transition-colors border-2 relative",
        {
          "border-gray-EE hover:border-gray-F7 hover:bg-gray-F7":
            !isFilled.contentRelationship(website.data.case_study),
          "border-tertiary-purple hover:bg-tertiary-purple bg-quaternary-purple":
            isFilled.contentRelationship(website.data.case_study)
        }
      )}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-xl shadow-website-screenshot" />
        <div className="aspect-w-16 aspect-h-12 rounded-lg overflow-hidden relative bg-gray-F7">
          <PrismicNextImage
            fill
            onLoadingComplete={() => setHeroHasLoaded(true)}
            className={`${
              heroHasLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            } transition-all ease-in-out duration-500 object-cover`}
            field={
              website.data
                .screenshot as Content.WebsiteDocumentData["screenshot"]
            }
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
          />
        </div>
      </div>
      <div className="px-2 mt-4 text-base font-headings text-gray-50">
        <PrismicNextLink
          field={website.data.link}
          className="after:absolute after:inset-0 flex items-center gap-0.5 group"
        >
          <Heading size="xs" as="h2">
            {asText(website.data.name)}
          </Heading>
          <ArrowIcon className="w-5 h-5 -rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" />
        </PrismicNextLink>
        <footer className="gap-2 flex justify-between items-center h-9">
          <div className="flex items-center gap-1 text-sm">
            {isFilled.contentRelationship(website.data.website_technology) &&
              isFilled.image(website.data.website_technology.data.logotype) && (
                <SVG
                  className="w-4 h-4"
                  src={website.data.website_technology.data.logotype.url}
                />
              )}
            {website.data.website_technology.data &&
              isFilled.keyText(website.data.website_technology.data.title) &&
              website.data.website_technology.data.title}
          </div>
          {isFilled.contentRelationship(website.data.case_study) && (
            <Button
              as={Link}
              style="tertiary"
              size="xs"
              href={website.data.case_study.url}
              className="flex gap-1 items-center justify-between relative z-20 -mr-[16px]"
            >
              Read {asText(website.data.name)}&apos;s case study
            </Button>
          )}
        </footer>
      </div>
    </div>
  );
};

export const ShowcaseGrid = ({
  websites,
  technologies,
  industries
}: ShowcaseGridProps) => {
  const [pageNum, setPageNum] = useState(1);
  const loadMore = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [websiteList, setWebsiteList] = useState<
    WebsiteDocumentWithTechnology[]
  >(websites.results);
  const [technology, setTechnology] = useState<string[]>([]);
  const [technologyOptions, setTechnologyOptions] = useState<SelectOptions>([]);
  const [industry, setIndustry] = useState<string>("*");
  const [industryOptions, setIndustryOptions] = useState<SelectOptions>([]);
  const { segmentPageEvent } = usePrismicAnalytics();

  const technologiesArray = technologies.map((technology) => ({
    value: technology.id as string,
    label: technology.data.title as string
  }));

  const industriesArray = industries.map((industry) => ({
    value: industry.id as string,
    label: industry.data.name as string
  }));

  const onlyPage = websites.total_pages === 1;

  useEffect(() => {
    setTechnologyOptions(technologiesArray);
    setIndustryOptions(industriesArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMounted) {
      getResults("filter");
    } else {
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [industry, technology]);

  const getResults = async (type: "paginate" | "filter") => {
    const client = createClient();

    queryOptions.page = type === "paginate" ? pageNum + 1 : 1;

    const response = await client.get({
      filters: [
        filter.at("document.type", "website"),
        filter.at("my.website.showcase", true),
        filter.any("my.website.industry", industry === "*" ? [] : [industry]),
        filter.any("my.website.website_technology", technology)
      ],
      ...queryOptions,
      orderings: [
        {
          field: "my.website.showcase_featured",
          direction: "desc"
        },
        {
          field: "document.last_publication_date",
          direction: "desc"
        }
      ]
    });

    setPageNum(response.page);

    let results;

    if (type === "paginate") {
      results = [...websiteList, ...response.results];
    } else {
      results = response.results;
    }

    if (loadMore.current) {
      if (
        response.page === response.total_pages ||
        response.total_pages === 0
      ) {
        loadMore.current.classList.add("hidden");
      } else {
        loadMore.current.classList.remove("hidden");
      }
    }

    setWebsiteList(results as WebsiteDocumentWithTechnology[]);
  };

  return (
    <div className="container">
      <div className="flex flex-col gap-12 pb-20">
        <form
          className="sm:flex gap-6 flex-wrap flex-col sm:flex-row justify-between"
          onSubmit={(e) => e.preventDefault()}
        >
          <RadioGroup value={industry} onChange={setIndustry}>
            <RadioGroup.Label className="font-bold block">
              Industry
            </RadioGroup.Label>
            <div className="mt-3 relative">
              <div className="absolute top-0 bottom-0 right-0 w-4 bg-gradient-to-l from-white to-transparent min-[490px]:hidden" />
              <div className="flex gap-2 2xl:gap-4 overflow-auto pr-4">
                <RadioGroup.Option value="*">
                  {({ checked }) => (
                    <Button
                      as="button"
                      style="secondary"
                      className={clsx({
                        "bg-gray-15": checked
                      })}
                    >
                      <span
                        className={clsx({
                          "text-white": checked
                        })}
                      >
                        All
                      </span>
                    </Button>
                  )}
                </RadioGroup.Option>
                {industryOptions.map((industry, i) => (
                  <RadioGroup.Option value={industry.value} key={i}>
                    {({ checked }) => (
                      <Button
                        as="button"
                        style="secondary"
                        className={clsx({
                          "bg-gray-15": checked
                        })}
                      >
                        <span
                          className={clsx({
                            "text-white": checked
                          })}
                        >
                          {industry.label}
                        </span>
                      </Button>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </div>
          </RadioGroup>
          <FormMultiSelect
            label="Tech Stack used"
            options={technologyOptions}
            theme="light"
            onChange={setTechnology}
            placeholder="Any"
            className="sm:max-w-[192px] z-20 mt-6 sm:mt-0"
          />
        </form>
        {websiteList.length > 0 ? (
          <div className="grid gird-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-6">
            <AnimatePresence mode="popLayout">
              {websiteList.map((website, i) => (
                <motion.div
                  key={website.id}
                  layoutId={website.id}
                  layout="position"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="flex flex-col"
                  variants={{
                    hidden: { opacity: 0, scale: 0.7 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  transition={{
                    duration: 0.25
                  }}
                >
                  <ShowcaseCard website={website} key={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <NoResults />
        )}
        <div
          ref={loadMore}
          className={clsx("flex justify-center", {
            hidden: onlyPage
          })}
        >
          <Button
            as="button"
            style="secondary"
            onClick={() => getResults("paginate")}
          >
            Load more
          </Button>
        </div>
      </div>
    </div>
  );
};
