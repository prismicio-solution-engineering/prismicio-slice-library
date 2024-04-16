"use client";

import clsx from 'clsx';
import Link from 'next/link';
import SVG from 'react-inlinesvg';

import { getCategoryColor } from '@/lib/utils/categoryColor';
import { asText, Content, isFilled } from '@prismicio/client';

type CategoryProps = {
  category: {
    uid: string;
    data: Pick<Content.BlogCategoryDocumentData, "title" | "icon">;
  };
  theme?: "light" | "dark";
  className?: string;
};

export const Category = ({
  category,
  theme = "light",
  className
}: CategoryProps) => {
  return (
    <span
      className={clsx(
        "flex tracking-tight items-center gap-1.5 relative h-6 font-bold text-sm-flat",
        className,
        {
          "text-gray-15": theme === "light",
          "text-white": theme === "dark"
        }
      )}
    >
      {category.uid ? (
        <Link
          href={`/blog/category/${category.uid}`}
          className={clsx(
            "flex items-center gap-1.5 focus:outline-none focus:ring-2 ring-offset-2 rounded-sm max-w-full",
            {
              "ring-offset-white ring-gray-EE": theme === "light",
              "ring-offset-gray-15 ring-gray-50": theme === "dark"
            }
          )}
        >
          {isFilled.image(category.data?.icon) && (
            <SVG
              src={category.data?.icon.url as string}
              className={clsx(
                "w-5 h-5 shrink-0",
                `text-primary-${getCategoryColor(asText(category.data?.title))}`
              )}
            />
          )}
          <span className="whitespace-nowrap overflow-ellipsis overflow-hidden">
            {asText(category.data?.title)}
          </span>
        </Link>
      ) : (
        <>
          <SVG
            src="https://prismic-main.cdn.prismic.io/prismic-main/c2c3ce40-2431-4f65-905b-bba7cc09c8dc_icon__information.svg"
            className="w-5 h-5 text-gray-A4"
          />
          Uncategorized
        </>
      )}
    </span>
  );
};
