"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";

import CloseIcon from "@/assets/svg/close.svg";
import { getCategoryColor } from "@/lib/utils/categoryColor";
import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";

import type { BlogDocumentWithExtras } from "@/lib/types";

type BlogTagFilterProps = {
  tags: string[];
  categoryId?: string;
  categoryName: string;
  onUpdate: (response: prismic.Query<BlogDocumentWithExtras>) => void;
  onReset: () => void;
  updateTags?: (tags: string[]) => void;
  pageSize?: number;
  className?: string;
  slim?: boolean;
  title?: string;
};

export const BlogTagFilter = ({
  tags,
  categoryId,
  categoryName,
  pageSize = 5,
  onUpdate,
  onReset,
  updateTags,
  className,
  slim = true,
  title
}: BlogTagFilterProps) => {
  const [selectedTab, setSelectedTab] = useState(["All"]);

  const filterBlogs = async (tag: string) => {
    if (tag === "All") {
      onReset();
      setSelectedTab(["All"]);
      return;
    }

    setSelectedTab((prev) => {
      prev = prev.filter((t) => t !== "All");
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      }
      return [...prev, tag];
    });
  };

  useEffect(() => {
    updateTags && updateTags(selectedTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  const fetchBlogs = async () => {
    const client = createClient();

    if (selectedTab.includes("All")) {
      return;
    }

    const response = await client.get<BlogDocumentWithExtras>({
      pageSize: pageSize,
      page: 1,
      orderings: {
        field: "my.blog.date",
        direction: "desc"
      },
      fetchLinks: [
        "blog_author.name",
        "blog_author.image",
        "blog_category.title",
        "blog_category.icon"
      ],
      fetch: [
        "blog.title",
        "blog.category",
        "blog.author",
        "blog.date",
        "blog.image",
        "blog.updated_date",
        "blog.card_description"
      ],
      filters: [
        prismic.filter.at("document.type", "blog"),
        categoryId ? prismic.filter.any("my.blog.category", [categoryId]) : "",
        prismic.filter.any("document.tags", [
          ...selectedTab.filter((t) => t !== "All")
        ])
      ]
    });

    onUpdate(response);
  };

  useEffect(() => {
    fetchBlogs();

    if (selectedTab.length === 0) {
      setSelectedTab(["All"]);
      onReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  return (
    <nav className={clsx("mb-4 relative", className)}>
      {title && <h2 className="font-bold mb-3">{title}</h2>}
      <div className="w-6 bg-gradient-to-r from-transparent to-white absolute z-10 right-0 top-0 bottom-4" />
      <div className="overflow-auto">
        <div className="flex mb-4 text-sm font-semibold gap-2">
          <button
            key="All"
            onClick={() => filterBlogs("All")}
            className={clsx(
              "leading-4 whitespace-nowrap transition-all",
              !slim &&
                selectedTab.includes("All") &&
                `text-white bg-primary-${getCategoryColor(categoryName)}`,
              {
                "p-4 bg-gray-F7 rounded-xl": !slim,
                "border-r-2 border-gray-EE pr-2 last:pr-0 last:border-0": slim,
                "underline underline-offset-4":
                  selectedTab.includes("All") && slim,
                "text-primary-purple":
                  selectedTab.includes("All") &&
                  slim &&
                  getCategoryColor(categoryName) === "purple",
                "text-primary-green":
                  selectedTab.includes("All") &&
                  slim &&
                  getCategoryColor(categoryName) === "green",
                "text-primary-blue":
                  selectedTab.includes("All") &&
                  slim &&
                  getCategoryColor(categoryName) === "blue",
                "text-primary-orange":
                  selectedTab.includes("All") &&
                  slim &&
                  getCategoryColor(categoryName) === "orange"
              }
            )}
          >
            All
          </button>
          {tags.map((tag) => (
            <span className="last:pr-6" key={tag}>
              <button
                onClick={() => filterBlogs(tag)}
                className={clsx(
                  "leading-4 whitespace-nowrap transition-all",
                  selectedTab.includes(tag) &&
                    !slim &&
                    `text-white pr-8 bg-primary-${getCategoryColor(
                      categoryName
                    )}`,
                  {
                    "p-4 bg-gray-F7 rounded-xl flex items-center relative":
                      !slim,
                    "border-r-2 border-gray-EE pr-2 last:pr-0 last:border-0":
                      slim,
                    "underline underline-offset-4":
                      selectedTab.includes(tag) && slim,
                    "text-primary-purple":
                      selectedTab.includes(tag) &&
                      slim &&
                      getCategoryColor(categoryName) === "purple",
                    "text-primary-green":
                      selectedTab.includes(tag) &&
                      slim &&
                      getCategoryColor(categoryName) === "green",
                    "text-primary-blue":
                      selectedTab.includes(tag) &&
                      slim &&
                      getCategoryColor(categoryName) === "blue",
                    "text-primary-orange":
                      selectedTab.includes(tag) &&
                      slim &&
                      getCategoryColor(categoryName) === "orange"
                  }
                )}
              >
                {tag}
                {selectedTab.includes(tag) && !slim && (
                  <CloseIcon className="w-5 h-5 absolute right-2" />
                )}
              </button>
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
};
