"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { DeveloperCard } from "@/components/modules/DeveloperCard";
import { NoResults } from "@/components/sections/NoResults";
import { Button } from "@/components/ui/Button";
import { FormMultiSelect } from "@/components/ui/FormMultiSelect";
import { createClient } from "@/prismicio";
import { Content, filter, Query } from "@prismicio/client";

import type { DeveloperDocumentWithWebsites } from "@/lib/types";

type DeveloperListProps = {
  developers: Query<DeveloperDocumentWithWebsites>;
  countries: Content.CountryDocument[];
  technologies: Content.TechnologyDocument[];
};

type SelectOptions = {
  value: string;
  label: string;
}[];

export const DeveloperList = ({
  developers,
  countries,
  technologies
}: DeveloperListProps) => {
  const [developerList, setDeveloperList] = useState<
    DeveloperDocumentWithWebsites[]
  >(developers.results);

  const [pageNum, setPageNum] = useState(1);
  const loadMore = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState(false);
  const resultList = useRef<HTMLDivElement>(null);

  const onlyPage = developers.total_pages === 1;

  const [partnerLevel, setPartnerLevel] = useState<string[]>([]);
  const [country, setCountry] = useState<string[]>([]);
  const [technology, setTechnology] = useState<string[]>([]);

  const [partnerOptions, setPartnerOptions] = useState<SelectOptions>([]);
  const [countryOptions, setCountryOptions] = useState<SelectOptions>([]);
  const [technologyOptions, setTechnologyOptions] = useState<SelectOptions>([]);

  const countriesArray = countries.map((country) => ({
    value: country.id as string,
    label: country.data.name as string
  }));

  const technologiesArray = technologies.map((technology) => ({
    value: technology.id as string,
    label: technology.data.title as string
  }));

  useEffect(() => {
    setPartnerOptions([
      { value: "1 bronze", label: "Bronze" },
      { value: "2 silver", label: "Silver" },
      { value: "3 gold", label: "Gold" }
    ]);
    setCountryOptions(countriesArray);
    setTechnologyOptions(technologiesArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isMounted) {
      getResults("filter");
    } else {
      setIsMounted(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partnerLevel, country, technology]);

  const getResults = async (type: "paginate" | "filter") => {
    const client = createClient();

    const response = await client.get<DeveloperDocumentWithWebsites>({
      filters: [
        filter.at("document.type", "developer"),
        filter.any("my.developer.partner_level", partnerLevel),
        filter.any("my.developer.country", country),
        filter.any("my.developer.technologies.technology", technology)
      ],
      orderings: [
        {
          field: "my.developer.occupation",
          direction: "asc"
        },
        {
          field: "my.developer.featured",
          direction: "desc"
        },
        {
          field: "my.developer.partner_level",
          direction: "desc"
        },
        {
          field: "my.developer.name",
          direction: "asc"
        }
      ],
      fetchLinks: ["website.name", "website.screenshot", "country.name"],
      pageSize: 40,
      page: type === "paginate" ? pageNum + 1 : 1
    });

    setPageNum(response.page);

    let results;

    if (type === "paginate") {
      results = [...developerList, ...response.results];
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

    setDeveloperList(results);
  };

  return (
    <div className="container relative z-10" id="developers">
      <div className="flex flex-col xl:grid xl:grid-cols-5 gap-12 pb-20 relative">
        <form className="xl:col-span-1 z-10 xl:z-auto">
          <div className="flex gap-6 flex-col md:flex-row xl:flex-col sticky xl:top-[120px]">
            <FormMultiSelect
              label="Located in"
              options={countryOptions}
              theme="light"
              onChange={setCountry}
              placeholder="Any country"
              className="z-20"
            />
            <FormMultiSelect
              label="Using"
              options={technologyOptions}
              theme="light"
              onChange={setTechnology}
              placeholder="Any technology"
              className="z-10"
            />
            {/* <FormMultiSelect
            label="Partner level"
            options={partnerOptions}
            theme="light"
            onChange={setPartnerLevel}
            placeholder="Any level"
          /> */}
          </div>
        </form>
        <div
          className="xl:col-span-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          ref={resultList}
        >
          {developerList.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {developerList.map((developer, index) => (
                <motion.div
                  key={developer.id}
                  layoutId={developer.id}
                  layout="position"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="flex flex-col"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 }
                  }}
                  transition={{
                    duration: 0.25
                  }}
                >
                  <DeveloperCard key={index} developer={developer} />
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <NoResults className="col-span-4" />
          )}
        </div>
      </div>
      <div
        ref={loadMore}
        className={clsx("flex justify-center mb-20", {
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
  );
};
