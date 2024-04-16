import clsx from "clsx";
import Link from "next/link";

import BlogFallbackImage from "@/assets/svg/blog-fallback.svg";
import { Author } from "@/components/ui/Author";
import { Button } from "@/components/ui/Button";
import { Category } from "@/components/ui/Category";
import { CommentCount } from "@/components/ui/CommentCount";
import { Heading } from "@/components/ui/Heading";
import { TimeToRead } from "@/components/ui/TimeToRead";
import { ViewCount } from "@/components/ui/ViewCount";
import { Votes } from "@/components/ui/Votes";
import { getCategoryColor } from "@/lib/utils/categoryColor";
import { asText, isFilled } from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";

import type { BlogDocumentWithExtras } from "@/lib/types";

type BlogPostCardProps = {
  post: BlogDocumentWithExtras;
  theme?: "light" | "dark";
  layout?: "col" | "row" | "row-stacked";
  thumbnail?: boolean | "sm";
  size?: "xs" | "sm" | "md" | "lg";
  border?: boolean;
  separator?: {
    enabled: boolean;
    last?: boolean;
  };
  padding?: boolean;
  description?: boolean | "2xl";
  author?: boolean;
  comments?: boolean;
  upvotes?: boolean;
  views?: boolean;
  date?: boolean | "sm";
  category?: boolean | "sm";
  ttr?: boolean;
  cta?: {
    enabled: boolean;
    text?: string;
    style?: "primary" | "secondary" | "link";
  };
  titleOverride?: string;
  className?: string;
  onUpvote?: () => void;
  onDownvote?: () => void;
};

export const BlogPostCard = ({
  post,
  theme = "light",
  layout = "col",
  thumbnail,
  size = "md",
  border,
  separator = {
    enabled: false,
    last: true
  },
  padding = true,
  description = false,
  author = false,
  comments = false,
  upvotes = false,
  views = false,
  date = false,
  category = true,
  ttr = false,
  cta = {
    enabled: false,
    text: "Continue",
    style: "link"
  },
  className,
  titleOverride,
  onUpvote,
  onDownvote
}: BlogPostCardProps) => {
  if (!post.data) return null;

  const categoryColor =
    isFilled.contentRelationship(post.data.category) &&
    "data" in post.data.category &&
    getCategoryColor(asText(post.data.category.data.title));

  return (
    <article
      key={post.id}
      className={clsx("overflow-hidden flex w-full grow h-full relative", {
        "border-2": border,
        "rounded-xl": !separator.enabled,
        "py-6 px-8": border && layout !== "col",
        "border-b-2 pb-6": separator.enabled,
        "last:border-b-0 last:pb-0": !separator.last,
        "sm:flex-row": layout !== "col",
        "flex-col": !upvotes,
        "bg-white border-gray-EE text-gray-15": theme === "light",
        "bg-gray-30 border-gray-50 text-white": theme === "dark",
        className
      })}
    >
      {thumbnail && (
        <div
          className={clsx({
            "shrink-0 sm:w-[160px] xl:w-[260px] ":
              layout === "row" || layout === "row-stacked",
            "hidden sm:block": thumbnail === "sm"
          })}
        >
          {isFilled.image(post.data.image) ? (
            <div
              className={clsx("aspect-[258/145] overflow-hidden relative", {
                "rounded-md": layout !== "col"
              })}
            >
              <PrismicNextImage
                field={post.data.image}
                className="object-cover w-full h-full"
                width={post.data.image.dimensions.width}
                height={post.data.image.dimensions.height}
                alt=""
              />
            </div>
          ) : (
            <div
              className={clsx(
                `aspect-[258/145] bg-quaternary-${categoryColor}`,
                {
                  "rounded-md": layout === "row"
                }
              )}
            >
              <BlogFallbackImage />
            </div>
          )}
        </div>
      )}
      <div
        className={clsx("flex h-full gap-4 f", {
          "p-4": padding && (size === "sm" || size === "xs"),
          "p-8": padding && (size === "md" || size === "lg"),
          "justify-between w-full": layout !== "col",
          "mt-6 sm:mt-0": !upvotes && !padding && thumbnail !== "sm",
          "flex-col lg:flex-row": layout === "row-stacked",
          "flex-col": layout !== "row-stacked",
          "sm:ml-12":
            layout !== "col" && thumbnail && size !== "xs" && size !== "sm",
          "sm:ml-6":
            layout !== "col" && thumbnail && size !== "md" && size !== "lg"
        })}
      >
        {(category || date) && (
          <div
            className={clsx("flex", {
              "justify-between items-center gap-4 lg:order-2 lg:flex-col lg:justify-start lg:items-end lg:gap-2":
                layout === "row-stacked",
              "justify-between items-center gap-4": layout !== "row-stacked",
              "hidden sm:flex": category === "sm" && date === "sm"
            })}
          >
            {category && (
              <Category
                category={post.data.category}
                theme={theme}
                className={clsx("overflow-auto relative z-10", {
                  "hidden sm:block": category === "sm"
                })}
              />
            )}
            {date && post.data.date && (
              <span
                className={clsx("shrink-0", {
                  "text-gray-50": theme === "light",
                  "text-gray-A4": theme === "dark",
                  "mr-2": layout === "row",
                  "hidden sm:block": date === "sm"
                })}
              >
                {post.data.updated_date ? "Updated " : ""}
                {new Date(
                  post.data.updated_date
                    ? post.data.updated_date
                    : post.data.date
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric"
                })}
              </span>
            )}
          </div>
        )}
        <div
          className={clsx("flex flex-col gap-4 flex-grow", {
            "lg:max-w-[600px]": layout === "row-stacked"
          })}
        >
          <Link
            href={`/blog/${post.uid}`}
            className="after:absolute after:inset-0"
          >
            <Heading
              size={size}
              as="h2"
              className={clsx({
                "max-w-md": layout === "row"
              })}
            >
              {titleOverride ? titleOverride : asText(post.data.title)}
            </Heading>
          </Link>
          {description && (
            <p
              className={clsx({
                "text-gray-50": theme === "light",
                "text-gray-A4": theme === "dark",
                "hidden 2xl:block": description === "2xl"
              })}
            >
              {isFilled.richText(post.data.card_description)
                ? asText(post.data.card_description)
                : post.data.meta_description}
            </p>
          )}
        </div>
        {(author || comments || views || cta.enabled) && (
          <footer className="flex items-center">
            {cta.enabled && (
              <Button
                as={Link}
                size="md"
                style={cta.style === "link" ? "tertiary" : cta.style}
                className={clsx({
                  "-ml-2.5": cta.style === "link"
                })}
                href={`/blog/${post.uid}`}
              >
                {cta.text}
              </Button>
            )}
            {author && (
              <div className="relative z-10">
                <Author
                  author={post.data.author}
                  size={size === "lg" ? "lg" : "sm"}
                  theme={theme}
                />
              </div>
            )}
            {(comments || views || ttr) && (
              <div className="flex items-center justify-end grow text-sm-flat font-bold gap-3">
                {views && <ViewCount pid={post.id} />}
                {comments && <CommentCount count={post.data.comment_count} />}
                {ttr && <TimeToRead blog={post} />}
              </div>
            )}
          </footer>
        )}
      </div>
      {upvotes && (
        <Votes
          className="m-4"
          slug={post.uid}
          pid={post.id}
          onDownvote={() => onDownvote && onDownvote()}
          onUpvote={() => onUpvote && onUpvote()}
        />
      )}
    </article>
  );
};
