import clsx from "clsx";
import Link from "next/link";
import { connectStateResults, Highlight } from "react-instantsearch-dom";

import BlogFallback from "@/assets/svg/blog-fallback.svg";
import { Icon } from "@/components/ui/Icon";
import { getCategoryColor } from "@/lib/utils/categoryColor";
import { PrismicNextImage } from "@prismicio/next";

type SearchHitsProps = {
  searchState: any;
  searchResults: any;
};

const SearchHits = ({ searchState, searchResults }: SearchHitsProps) => {
  const validQuery = searchState.query?.length >= 3;
  return searchState.query && validQuery ? (
    <div className="relative w-full text-left font-headings">
      <div className="bg-white border border-gray-EE rounded-xl absolute top-1 right-0 left-0 shadow-2xl max-h-[70vh] overflow-auto">
        {searchResults?.hits.length === 0 && (
          <div className="py-3 px-6">No results found!</div>
        )}
        {searchResults?.hits.length > 0 &&
          searchResults.hits.map((hit: any) => {
            return (
              <Link
                key={hit.objectID}
                className={clsx(
                  "flex leading-tight gap-4 border-t border-gray-EE first:rounded-t-xl last:rounded-b-xl first:border-0 py-3 px-3 focus:outline-none focus:ring-4 ring-inset ring-tertiary-purple transition-colors hover:bg-gray-F7",
                  {
                    "items-start": hit.type === "post",
                    "items-center": hit.type !== "post"
                  }
                )}
                href={
                  hit.type === "post"
                    ? `/blog/${hit.slug}`
                    : hit.type === "author"
                      ? `/blog/authors/${hit.slug}`
                      : `/blog/category/${hit.slug}`
                }
              >
                {hit.type === "post" && (
                  <div
                    className={`w-1/4 aspect-[16/9] rounded-md bg-gray-EE overflow-hidden relative shrink-0 bg-quaternary-${getCategoryColor(
                      hit.category
                    )}`}
                  >
                    {hit.image.url ? (
                      <PrismicNextImage
                        field={hit.image}
                        fill
                        className="w-full h-auto block"
                      />
                    ) : (
                      <BlogFallback className="w-full h-auto block" />
                    )}
                  </div>
                )}
                {hit.type === "author" && (
                  <PrismicNextImage
                    field={hit.image}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                {hit.type === "category" && (
                  <Icon
                    src={hit.image.url}
                    size="md"
                    color={getCategoryColor(hit.title)}
                    className="shrink-0"
                  />
                )}
                <div className="flex flex-col">
                  {hit.type !== "post" && (
                    <span className="uppercase text-gray-A4 text-xs font-semibold tracking-wide">
                      {hit.type}
                    </span>
                  )}
                  <span className="lg:text-md">
                    <Highlight attribute="title" hit={hit} tagName="mark" />
                  </span>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  ) : (
    <></>
  );
};
export default connectStateResults(SearchHits);
