import clsx from "clsx";

import {
  BlogSocialShare,
  BlogSocialShareProps
} from "@/components/sections/BlogSocialShare";
import {
  BlogTableOfContents,
  BlogTableOfContentsProps
} from "@/components/sections/BlogTableOfContents";

interface BlogSidebarProps {
  blog: BlogSocialShareProps["blog"];
  slices: BlogTableOfContentsProps["slices"];
  blogId: string;
  hasGuide?: boolean;
}

export const BlogSidebar = ({
  blog,
  slices,
  blogId,
  hasGuide
}: BlogSidebarProps) => {
  return (
    <div
      className={clsx("sticky pb-6", {
        "top-[120px]": !hasGuide,
        "top-[172px]": hasGuide
      })}
    >
      <BlogTableOfContents
        key={blogId}
        slices={slices}
        objective={blog.data.learning_objective}
        blogId={blogId}
      />
      <BlogSocialShare blog={blog} />
    </div>
  );
};
