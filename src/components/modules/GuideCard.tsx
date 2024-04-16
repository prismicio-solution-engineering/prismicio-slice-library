import clsx from "clsx";
import Link from "next/link";

import BlogFallbackImage from "@/assets/svg/blog-fallback.svg";
import { Copy } from "@/components/modules/Copy";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Content } from "@prismicio/client";
import { isFilled } from "@prismicio/helpers";
import { PrismicNextImage } from "@prismicio/next";

type GuideCardProps = {
  guide: Content.BlogGuideDocument;
};

export const GuideCard = ({ guide }: GuideCardProps) => {
  if (!guide) return null;

  return (
    <article
      className={clsx(
        "rounded-2xl overflow-hidden relative flex flex-col justify-between",
        {
          "bg-quaternary-purple": guide.data.color === "purple",
          "bg-quaternary-blue": guide.data.color === "blue",
          "bg-quaternary-green": guide.data.color === "green",
          "bg-quaternary-orange": guide.data.color === "orange",
          "bg-quaternary-pink": guide.data.color === "pink"
        }
      )}
    >
      <div className="p-8">
        {guide.data.featured && (
          <div
            className={clsx(
              "py-1 px-2 rounded-md text-white inline-block text-xs font-bold absolute bottom-8 left-8",
              {
                "bg-primary-purple": guide.data.color === "purple",
                "bg-primary-blue": guide.data.color === "blue",
                "bg-primary-green": guide.data.color === "green",
                "bg-primary-orange": guide.data.color === "orange",
                "bg-primary-pink": guide.data.color === "pink"
              }
            )}
          >
            Featured
          </div>
        )}
        <Link
          href={`/guides/${guide.uid}`}
          className="after:absolute after:inset-0"
        >
          <Heading field={guide.data.title} size="md" />
          <Copy
            field={guide.data.description}
            className="mt-4"
            size="sm"
            muted
            theme="light"
          />
        </Link>
        <Button
          size="xs"
          className="inline-block mt-6 relative z-10"
          style="primary"
          as={Link}
          href={`/guides/${guide.uid}`}
        >
          Read the guide
        </Button>
      </div>
      {isFilled.image(guide.data.image) ? (
        <PrismicNextImage
          field={guide.data.image}
          alt=""
          priority
          className="w-full"
          width={guide.data.image.dimensions.width}
          height={guide.data.image.dimensions.height}
        />
      ) : (
        <div className={`overflow-hidden bg-quaternary-${guide.data.color}`}>
          <BlogFallbackImage />
        </div>
      )}
    </article>
  );
};
