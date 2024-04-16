import clsx from "clsx";
import Link from "next/link";

import { Heading } from "@/components/ui/Heading";
import { PartnerBadge } from "@/components/ui/PartnerBadge";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { asText, Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

import type { DeveloperDocumentWithWebsites } from "@/lib/types";

const Website = ({
  screenshot
}: {
  screenshot: Content.DeveloperDocument["data"]["image"];
}) => {
  return (
    <div className="relative aspect-w-16 aspect-h-9 rounded-md overflow-hidden">
      <PrismicNextImage
        field={screenshot}
        fill
        sizes="(max-width: 639px) 70vw, 33vw"
        className="object-cover object-top"
      />
    </div>
  );
};

export const DeveloperCard = ({
  developer,
  theme = "light"
}: {
  developer: DeveloperDocumentWithWebsites;
  theme?: "light" | "dark";
}) => {
  return (
    <div
      className={clsx(
        "border-2 p-4 rounded-2xl relative grow flex flex-col transition-colors",
        {
          "border-primary-purple bg-quaternary-purple hover:bg-tertiary-purple":
            developer.data.featured,
          "border-gray-EE hover:bg-gray-EE":
            !developer.data.featured && theme === "light",
          "border-gray-30 hover:bg-gray-1F":
            !developer.data.featured && theme === "dark"
        }
      )}
    >
      {developer.data.featured && (
        <svg
          className="absolute -top-[70px] -right-[16px] w-16"
          width="166"
          height="162"
          viewBox="0 0 166 162"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.33964 31.3945L30.0774 8.99744L157.722 132.884L135.989 155.276C135.426 155.856 134.573 156.047 133.817 155.763L106.628 145.56C105.811 145.253 104.889 145.503 104.338 146.18L92.8817 160.251C92.1082 161.201 90.6763 161.256 89.8326 160.368L66.9737 136.306C66.328 135.626 65.4672 135.191 64.5372 135.073L38.8201 131.82C36.5758 131.536 34.7897 129.803 34.4389 127.568L30.4317 102.04C30.2787 101.065 29.7761 100.179 29.0179 99.5475L5.38395 79.8614C4.36132 79.0095 4.27966 77.4677 5.20661 76.5126L18.673 62.6378C19.0931 62.2049 19.2184 61.565 18.9925 61.0057L7.91358 33.5707C7.61242 32.8249 7.77947 31.9717 8.33964 31.3945Z"
            fill="#151515"
            stroke="#151515"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8.28347 31.4532L30.0821 8.99341L93.7773 70.8136L35.9168 130.429C35.9168 130.429 34.6159 129.166 34.2811 126.529L30.199 100.523L3.41597 78.3584L1.81331 77.0083C0.801664 76.1561 0.722234 74.6257 1.64023 73.6734L16.1843 58.5846L7.81416 33.5119C7.57378 32.7919 7.75478 31.9979 8.28347 31.4532Z"
            fill="#B382F2"
          />
          <path
            d="M16.1843 58.5846L7.81416 33.5119C7.57378 32.7919 7.75478 31.9979 8.28347 31.4532L30.0821 8.99341L93.7773 70.8136L35.9168 130.429C35.9168 130.429 34.6159 129.166 34.2811 126.529L30.199 100.523M16.1843 58.5846L1.64023 73.6734C0.722234 74.6257 0.801664 76.1561 1.81331 77.0083L3.41597 78.3584M16.1843 58.5846L23.9426 50.591M30.199 100.523L51.5036 78.5726M30.199 100.523L3.41597 78.3584M3.41597 78.3584L25.1567 55.9582"
            stroke="#151515"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M163.569 91.5739C165.276 90.4879 164.356 87.2501 161.721 85.0697L137.948 65.3991C136.51 64.2094 135.489 62.6004 135.277 61.1903L131.762 37.8759C131.373 35.2917 128.414 32.4205 125.82 32.1083L102.411 29.2921C100.995 29.1217 99.3562 28.1488 98.1241 26.7473L77.7522 3.57261C75.4941 1.00387 72.2302 0.181236 71.1957 1.92012L61.8632 17.608C61.2988 18.5568 60.0026 18.7899 58.4727 18.2178L33.1766 8.75834C30.3728 7.70983 28.7152 9.41766 29.847 12.189L40.0579 37.1912C40.6754 38.7033 40.4811 40.0059 39.5496 40.5985L24.1475 50.3954C22.4403 51.4813 23.36 54.7192 25.9951 56.8995L49.7679 76.5702C51.2057 77.7598 52.2271 79.3689 52.4396 80.7789L55.9538 104.093C56.3434 106.678 59.3017 109.549 61.8964 109.861L85.3053 112.677C86.7211 112.847 88.3599 113.82 89.592 115.222L109.964 138.397C112.222 140.965 115.486 141.788 116.52 140.049L125.853 124.361C126.417 123.412 127.714 123.179 129.243 123.751L154.54 133.211C157.343 134.259 159.001 132.552 157.869 129.78L147.658 104.778C147.041 103.266 147.235 101.963 148.167 101.371L163.569 91.5739Z"
            fill="#8E44EC"
            stroke="#151515"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <header className="flex gap-4 justify-between items-center relative grow">
        <div className="flex items-start sm:items-center gap-3">
          <Link
            href={`/hire-a-developer/${developer.uid}`}
            className="shrink-0 after:absolute after:inset-0"
          >
            <PrismicNextImage
              field={developer.data.image}
              className="rounded-full w-12 h-12"
            />
          </Link>
          <div className="flex flex-col gap-0.5 mt-2 sm:mt-0">
            <div className="flex flex-wrap gap-x-3 items-baseline">
              <Heading size="md" as="h2">
                {asText(developer.data.name)}
              </Heading>
            </div>
            <div
              className={clsx(
                "flex flex-col text-xs-flat gap-x-3 gap-y-1 whitespace-nowrap text-ellipsis",
                {
                  "text-gray-A4": theme === "dark",
                  "text-gray-50": theme === "light"
                }
              )}
            >
              <span className="flex items-center">
                <MapPinIcon className="w-4 h-4 mr-1" />
                {developer.data.city}
                {isFilled.contentRelationship(developer.data.country) &&
                  `, ${developer.data.country.data?.name}`}
              </span>
            </div>
          </div>
        </div>
      </header>
      <Link href={`/hire-a-developer/${developer.uid}`} className="mt-4 block">
        <Website screenshot={developer.data.website_screenshot} />
      </Link>
      {
        // developer.data.partner_level !== null ||
        developer.data.featured && (
          <footer className="mt-4 flex gap-1 flex-wrap text-xs font-bold">
            {developer.data.featured && (
              <div className="bg-primary-purple py-1 px-2 rounded-md text-white">
                Featured
              </div>
            )}
            {developer.data.partner_level !== null && (
              <PartnerBadge
                level={developer.data.partner_level}
                featured={developer.data.featured}
              />
            )}
          </footer>
        )
      }
    </div>
  );
};
