import clsx from "clsx";
import Link from "next/link";

import BlogFallbackImage from "@/assets/svg/blog-fallback.svg";
import { Heading } from "@/components/ui/Heading";
import { getCategoryColor } from "@/lib/utils/categoryColor";
import { asText, isFilled } from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";

import type { BlogDocumentWithExtras } from "@/lib/types";

type GuidePostCardProps = {
  post: BlogDocumentWithExtras;
  className?: string;
  numbered: boolean;
  number?: number;
  color: string;
};

export const GuidePostCard = ({
  post,
  className,
  numbered,
  number,
  color
}: GuidePostCardProps) => {
  if (!post.data) return null;

  let categoryColor = "";

  if (isFilled.contentRelationship(post.data.category)) {
    categoryColor = getCategoryColor(asText(post.data.category.data.title));
  }

  return (
    <article
      key={post.id}
      className={clsx(
        "h-full relative border-2 rounded-xl bg-white border-gray-EE hover:bg-gray-F7 transition-colors ease-in-out duration-200 text-gray-15 group",
        {
          className
        }
      )}
    >
      <div className="flex gap-4 p-6 justify-between items-center">
        <div className="flex gap-4 items-center">
          <span
            className={clsx(
              "w-10 h-10 rounded-lg shrink-0 font-bold text-md flex items-center justify-center group-hover:bg-gray-F7 transition-colors ease-in-out duration-200",
              {
                "bg-quaternary-purple text-primary-purple": color === "purple",
                "bg-quaternary-blue text-primary-blue": color === "blue",
                "bg-quaternary-green text-primary-green": color === "green",
                "bg-quaternary-orange text-primary-orange": color === "orange",
                "bg-quaternary-pink text-primary-pink": color === "pink"
              }
            )}
          >
            {numbered ? (
              number
            ) : (
              <svg
                width="641"
                height="449"
                viewBox="0 0 641 449"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition-colors ease-in-out duration-200"
              >
                <path
                  d="M320.015 0C311.915 0 303.915 1.4 296.315 4.1L15.8154 105.4C6.31539 108.9 0.0153923 117.9 0.0153923 128C0.0153923 138.1 6.31539 147.1 15.8154 150.6L73.7154 171.5C57.3154 197.3 48.0154 227.8 48.0154 259.9V288C48.0154 316.4 37.2154 345.7 25.7154 368.8C19.2154 381.8 11.8154 394.6 3.21539 406.4C0.0153923 410.7 -0.884608 416.3 0.915392 421.4C2.71539 426.5 6.91539 430.3 12.1154 431.6L76.1154 447.6C80.3154 448.7 84.8154 447.9 88.5154 445.6C92.2154 443.3 94.8154 439.5 95.6154 435.2C104.215 392.4 99.9154 354 93.5154 326.5C90.3154 312.3 86.0154 297.8 80.0154 284.5V259.9C80.0154 229.7 90.2154 201.2 107.915 178.4C120.815 162.9 137.515 150.4 157.115 142.7L314.115 81C322.315 77.8 331.615 81.8 334.815 90C338.015 98.2 334.015 107.5 325.815 110.7L168.815 172.4C156.415 177.3 145.515 184.8 136.615 194L296.215 251.6C303.815 254.3 311.815 255.7 319.915 255.7C328.015 255.7 336.015 254.3 343.615 251.6L624.215 150.6C633.715 147.2 640.015 138.1 640.015 128C640.015 117.9 633.715 108.9 624.215 105.4L343.715 4.1C336.115 1.4 328.115 0 320.015 0ZM128.015 376C128.015 411.3 214.015 448 320.015 448C426.015 448 512.015 411.3 512.015 376L496.715 230.6L354.515 282C343.415 286 331.715 288 320.015 288C308.315 288 296.515 286 285.515 282L143.315 230.6L128.015 376Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </span>
          <Link
            href={`/blog/${post.uid}`}
            className="after:absolute after:inset-0"
          >
            <Heading size="xs" as="h2" className="max-w-[320px]">
              {asText(post.data.title)}
            </Heading>
          </Link>
        </div>
        {isFilled.image(post.data.image) ? (
          <PrismicNextImage
            className="rounded-lg -mr-2 -my-2"
            field={post.data.image}
            alt=""
            width={100}
            height={100}
          />
        ) : (
          <div
            className={`rounded-lg -mr-2 -my-2 bg-quaternary-${categoryColor}`}
          >
            <BlogFallbackImage className="w-[100px]" />
          </div>
        )}
      </div>
    </article>
  );
};
