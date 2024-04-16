"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Loader from "@/assets/svg/loader.svg";
import { BlogPostCard } from "@/components/modules/BlogPostCard";
import { BlogTagFilter } from "@/components/sections/BlogTagFilter";
import { Button } from "@/components/ui/Button";
import { getCommentsForPosts } from "@/lib/supabase/getCommentCount";
import { createClient } from "@/prismicio";
import { asText, Content, filter, Query } from "@prismicio/client";

import type { BlogDocumentWithExtras } from "@/lib/types";

type BlogLatestPostsWithTagsProps = {
  category?: Content.BlogCategoryDocument | undefined;
  blogs: Query<BlogDocumentWithExtras>;
  tags: string[];
};

export const BlogLatestPostsWithTags = ({
  blogs,
  category,
  tags
}: BlogLatestPostsWithTagsProps) => {
  const [loading, updateLoading] = useState(false);
  const [end, updateEnd] = useState(false);
  const [pageNumber, updatePageNumber] = useState(2);
  const perPage = 20;
  const [selectedTabs, setSelectedTabs] = useState(["All"]);

  const [filteredBlogs, setFilteredBlogs] = useState<BlogDocumentWithExtras[]>(
    blogs.results
  );

  useEffect(() => {
    setFilteredBlogs(blogs.results);

    if (blogs.page === blogs.total_pages) {
      updateEnd(true);
    } else {
      updateEnd(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const resetFilter = () => {
    setFilteredBlogs(blogs.results);

    if (blogs.page === blogs.total_pages) {
      updateEnd(true);
    } else {
      updateEnd(false);
    }
  };

  const loadMore = async () => {
    const client = createClient();
    updateLoading(true);

    const blogs = await client.get<BlogDocumentWithExtras>({
      pageSize: perPage,
      page: pageNumber,
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
        filter.at("document.type", "blog"),
        category?.id ? filter.any("my.blog.category", [category.id]) : "",
        filter.any("document.tags", [
          ...selectedTabs.filter((t) => t !== "All")
        ])
      ]
    });

    const blogsWithComments = await getCommentsForPosts(blogs.results);

    if (blogs.page === blogs.total_pages) {
      updateEnd(true);
    }

    updateLoading(false);
    setFilteredBlogs((prev) => [...prev, ...blogsWithComments]);

    updatePageNumber(pageNumber + 1);
  };

  const filterChanged = (result: Query<BlogDocumentWithExtras>) => {
    setFilteredBlogs(result.results);
    updatePageNumber(2);

    if (result.page === result.total_pages) {
      updateEnd(true);
    } else {
      updateEnd(false);
    }
  };

  return (
    <div className="container pt-12 pb-20">
      <BlogTagFilter
        tags={tags}
        categoryId={category?.id}
        categoryName={category ? asText(category.data.title) : "none"}
        pageSize={perPage}
        onUpdate={filterChanged}
        onReset={resetFilter}
        updateTags={setSelectedTabs}
        slim={false}
        className="mb-12"
        title="Filter by tag"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredBlogs.map((blog, index) => {
            return (
              index <= 1 && (
                <motion.div
                  key={blog.id}
                  layoutId={blog.id}
                  layout="position"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="flex w-full"
                  variants={{
                    hidden: { opacity: 0, scale: 0.7 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  transition={{
                    duration: 0.25
                  }}
                >
                  <BlogPostCard
                    key={blog.id}
                    post={blog}
                    size="lg"
                    border
                    thumbnail
                    date
                    author
                    views
                    comments
                  />
                </motion.div>
              )
            );
          })}
        </AnimatePresence>
      </div>
      <div className="col-span-12 md:col-span-10 md:col-start-2 grid grid-cols-1 gap-6 mt-12">
        <AnimatePresence mode="popLayout">
          {filteredBlogs.map((blog, index) => {
            return (
              index >= 2 && (
                <motion.div
                  key={blog.id}
                  layoutId={blog.id}
                  layout="position"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="flex w-full"
                  variants={{
                    hidden: { opacity: 0, scale: 0.7 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  transition={{
                    duration: 0.25
                  }}
                >
                  <BlogPostCard
                    key={index}
                    post={blog}
                    thumbnail
                    border
                    padding={false}
                    layout="row"
                    author
                    views
                    date
                    comments
                  />
                </motion.div>
              )
            );
          })}
        </AnimatePresence>
      </div>
      {!end && (
        <Button
          type="button"
          as="button"
          className={clsx("mt-12 mx-auto block border transition-all", {
            "pr-3 pl-3 rounded-full": loading
          })}
          onClick={() => loadMore()}
        >
          {loading ? <Loader /> : "Load more"}
        </Button>
      )}
    </div>
  );
};
