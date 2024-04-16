"use client";

import { useState } from "react";

import Envelope from "@/assets/svg/envelope.svg";
import LinkedIn from "@/assets/svg/linkedin.svg";
import Twitter from "@/assets/svg/twitter.svg";
import AskForComment from "@/components/sections/AskForCommentModal";
import { Votes } from "@/components/ui/Votes";
import { asText, Content } from "@prismicio/client";

export type BlogSocialShareProps = {
  blog: Content.BlogDocument;
};

export const BlogSocialShare = ({ blog }: BlogSocialShareProps) => {
  const [askForCommentOpen, setAskForCommentOpen] = useState(false);

  const closeMoal = (action?: boolean) => {
    setAskForCommentOpen(false);

    if (action) {
      const commentSection = document.getElementById("commentsSection");
      const commentBox = document.getElementById(
        "commentBox"
      ) as HTMLTextAreaElement;

      scrollTo({
        top: commentSection?.offsetTop
      });

      setTimeout(() => {
        commentBox?.focus();
      }, 1000);
    }
  };

  return (
    <div className="mt-6 flex items-center justify-between">
      <nav className="flex gap-2.5 items-center flex-wrap">
        <h4 className="font-semibold leading-tight">Share article</h4>
        <div className="flex gap-2.5 items-center">
          <a
            className="block cursor-pointer w-10 h-10 hover:text-gray-50 p-2"
            href={encodeURI(
              `http://twitter.com/share?text=Enjoyed reading ${asText(
                blog.data.title
              )}, from the Prismic blog.\nCheck it out 👉&url=https://prismic.io/blog/${
                blog.uid
              }`
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on Twitter"
          >
            <Twitter className="w-6 h-6 mx-auto pointer-events-none" />
          </a>
          <a
            className="block cursor-pointer w-10 h-10 hover:text-gray-50 p-2"
            href={encodeURI(
              `https://www.linkedin.com/sharing/share-offsite/?url=https://prismic.io/blog/${blog.uid}`
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share on LinkedIn"
          >
            <LinkedIn className="w-6 h-6 mx-auto pointer-events-none -mt-0.5" />
          </a>
          <a
            className="block cursor-pointer w-10 h-10 hover:text-gray-50 p-2"
            href={encodeURI(
              `mailto:?subject=${asText(
                blog.data.title
              )}&body=Hey!\nCheck out this article on ${asText(
                blog.data.title
              )} from the Prismic Blog: https://prismic.io/blog/${blog.uid}`
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share by email"
          >
            <Envelope className="w-6 h-6 mx-auto pointer-events-none" />
          </a>
        </div>
      </nav>
      <Votes
        slug={blog.uid}
        pid={blog.id}
        onMaxVotes={() => setAskForCommentOpen(true)}
      />
      <AskForComment
        isOpen={askForCommentOpen}
        onClose={(action) => closeMoal(action)}
      />
    </div>
  );
};
