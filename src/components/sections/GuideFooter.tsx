import clsx from "clsx";

import { GuideFooterSlider } from "@/components/sections/GuideFooterSlider";
import { Heading } from "@/components/ui/Heading";
import { createClient } from "@/prismicio";
import { asText, isFilled } from "@prismicio/client";

import type { BlogDocumentWithExtras, GuideNavProps } from "@/lib/types";

type Props = {
  data?: GuideNavProps;
};

export const GuideFooter = async ({ data }: Props) => {
  if (!data || !data.guide) return null;

  const client = createClient();

  const guideBlogIds: string[] = [];

  data.guide.data.blogs.forEach((blog) => {
    isFilled.contentRelationship(blog.blog) && guideBlogIds.push(blog.blog.id);
  });

  const guideBlogs = await client.getByIDs<BlogDocumentWithExtras>(
    guideBlogIds,
    {
      fetchLinks: ["blog_category.title", "blog_category.icon"],
      fetch: [
        "blog.title",
        "blog.category",
        "blog.author",
        "blog.date",
        "blog.image",
        "blog.updated_date",
        "blog.card_description"
      ]
    }
  );

  return (
    <div
      className={clsx("rounded-xl", {
        "bg-quaternary-purple": data.guide.data.color === "purple",
        "bg-quaternary-blue": data.guide.data.color === "blue",
        "bg-quaternary-green": data.guide.data.color === "green",
        "bg-quaternary-orange": data.guide.data.color === "orange",
        "bg-quaternary-pink": data.guide.data.color === "pink"
      })}
    >
      <div className="container p-8 my-12">
        <Heading as="h2" size="md" className="mb-8">
          This article is part of the{" "}
          <span className="italic">
            &apos;{asText(data.guide.data.title)}&apos;
          </span>{" "}
          guide
        </Heading>
        <GuideFooterSlider blogs={guideBlogs.results} currentUid={data.uid} />
      </div>
    </div>
  );
};
