import clsx from 'clsx';
import Link from 'next/link';

import { asText, Content } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';

type AuthorProps = {
  author: {
    uid: string;
    data: Pick<Content.BlogAuthorDocumentData, "name" | "image">;
  };
  size?: "sm" | "lg";
  theme: "light" | "dark";
};

export const Author = ({
  author,
  size = "sm",
  theme = "light"
}: AuthorProps) => {
  return (
    <div className="flex items-center gap-2 text-sm-flat">
      {author ? (
        <Link
          href={`/blog/authors/${author.uid}`}
          className={clsx(
            "flex items-center gap-2 text-sm-flat focus:outline-none focus:ring-2 ring-offset-4 rounded-2xl",
            {
              "ring-offset-white ring-gray-EE": theme === "light",
              "ring-offset-gray-15 ring-gray-50": theme === "dark"
            }
          )}
        >
          <PrismicNextImage
            field={author.data.image}
            width="64"
            height="64"
            className={clsx("rounded-full", {
              "w-8 h-8": size === "lg",
              "w-6 h-6": size === "sm"
            })}
          />
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            By {asText(author.data.name)}
          </span>
        </Link>
      ) : (
        <>
          <div
            className={clsx("rounded-full bg-gray-EE", {
              "w-8 h-8": size === "lg",
              "w-6 h-6": size === "sm"
            })}
          />
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">
            By Anonymous
          </span>
        </>
      )}
    </div>
  );
};
