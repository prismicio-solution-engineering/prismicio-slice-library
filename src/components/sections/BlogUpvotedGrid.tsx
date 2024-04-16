"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import Loader from "@/assets/svg/loader.svg";
import { BlogPostCard } from "@/components/modules/BlogPostCard";
import { supabase } from "@/lib/supabase/client";
import { createClient } from "@/prismicio";

import type { BlogDocumentWithExtras } from "@/lib/types";

export const BlogUpvotedGrid = () => {
  const [loadingUpvotes, setLoadingUpvotes] = useState(true);
  const [blogsWithVotes, setBlogsWithVotes] = useState<
    BlogDocumentWithExtras[]
  >([]);

  useEffect(() => {
    const getUpvotedBlogs = async () => {
      const client = createClient();
      const { data } = await supabase
        .from("posts")
        .select("pid, upvotes, downvotes");

      const mostUpvotedUids = data
        ?.map((item) => ({
          pid: item.pid,
          totalvotes: item.upvotes - item.downvotes
        }))
        .sort((a, b) => b.totalvotes - a.totalvotes)
        .slice(0, 6);

      const mostUpvoted = await client.getByIDs<BlogDocumentWithExtras>(
        mostUpvotedUids ? mostUpvotedUids.map((item) => item.pid) : [],
        {
          fetchLinks: [
            "blog_author.name",
            "blog_author.image",
            "blog_category.title",
            "blog_category.icon"
          ]
        }
      );

      const blogsWithUpvotes = mostUpvoted.results.map((blog) => {
        const upvotes = mostUpvotedUids?.find((item) => item.pid === blog.id);

        blog.data.vote_total = upvotes?.totalvotes || 0;

        return blog;
      });

      return blogsWithUpvotes;
    };

    getUpvotedBlogs().then((blogs) => {
      setBlogsWithVotes(blogs);
      setLoadingUpvotes(false);
    });
  }, []);

  const liveVote = (type: "up" | "down", uid: string) => {
    const blog = blogsWithVotes.find((blog) => blog.uid === uid);

    if (blog) {
      const index = blogsWithVotes.indexOf(blog);
      const newBlog = { ...blog };
      if (type === "up") {
        newBlog.data.vote_total!++;
      } else {
        newBlog.data.vote_total!--;
      }
      const newBlogs = [...blogsWithVotes];

      newBlogs[index] = newBlog;
      setBlogsWithVotes(
        newBlogs.sort((a, b) => b.data.vote_total! - a.data.vote_total!)
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:col-span-4 lg:col-span-1 border-2 border-gray-EE rounded-xl overflow-hidden">
      {loadingUpvotes && (
        <div className="flex items-center justify-center text-gray-15">
          <Loader />
        </div>
      )}
      {blogsWithVotes?.map((blog, index) => (
        <motion.div
          key={blog.id}
          layout="position"
          className={clsx("border-b-2 border-gray-EE last:border-b-0", {
            "hidden md:block": index === 3 || index === 4 || index === 5,
            "border-b-0 md:border-b-2": index === 2
          })}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 120,
            duration: 0.1
          }}
        >
          <BlogPostCard
            post={blog}
            key={index}
            onDownvote={() => liveVote("down", blog.uid)}
            onUpvote={() => liveVote("up", blog.uid)}
            upvotes
            layout="row"
            category={false}
            size="xs"
            padding
          />
        </motion.div>
      ))}
    </div>
  );
};
