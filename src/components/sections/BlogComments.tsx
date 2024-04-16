"use client";

import "react-quill/dist/quill.snow.css";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { ChangeEvent, FormEvent, useState } from "react";

import CloseIcon from "@/assets/svg/close.svg";
import Loader from "@/assets/svg/loader.svg";
import Logomark from "@/assets/svg/logomark.svg";
import ReplyIcon from "@/assets/svg/reply.svg";
import BlogCommentSubmitted from "@/components/sections/BlogCommentSubmittedModal";
import { Button } from "@/components/ui/Button";
import { FormTextField } from "@/components/ui/FormTextField";
import { Heading } from "@/components/ui/Heading";

import type { BlogComment } from "@/lib/types";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const formatCommentDate = (date: Date | string) => {
  const currentDate = new Date();
  const commentDate = new Date(date);

  const diff = currentDate.getTime() - commentDate.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const formatter = new Intl.RelativeTimeFormat("en-US", {
    numeric: "always"
  });

  if (years >= 1) {
    return formatter.format(-years, "year");
  } else if (months >= 1) {
    return formatter.format(-months, "month");
  } else if (days > 0) {
    return formatter.format(-days, "day");
  } else {
    return "Today";
  }
};

const ReplyBox = ({
  comments,
  inComment,
  replyOf,
  onClose
}: {
  comments: BlogComment[];
  inComment: boolean;
  replyOf?: string | null;
  onClose?: () => void;
  onHeightChange?: (height: number) => void;
}) => {
  return (
    <div className="bg-gray-F7 py-3 px-4 rounded-lg text-base">
      <p className="font-semibold">
        {inComment ? "This is a reply to " : "You are replying to "}
        <a href={`#${replyOf}`} className="underline">
          {comments.find((comment) => comment.id === replyOf)?.nickname +
            "'s comment" ?? ""}
        </a>
      </p>
      <p
        className="reply-to-comment italic text-gray-50 mt-1 whitespace-nowrap text-ellipsis overflow-hidden"
        dangerouslySetInnerHTML={{
          __html:
            comments.find((comment) => comment.id === replyOf)?.payload ?? ""
        }}
      />
      {!inComment && (
        <button
          className="absolute top-2 right-2 text-gray-15 w-8 h-8"
          onClick={() => onClose && onClose()}
          type="button"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export const BlogComments = ({
  uid,
  id,
  comments
}: {
  uid: string;
  id: string;
  comments: BlogComment[] | undefined;
}) => {
  const [comment, setComment] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [replyOf, setReplyOf] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const postData = async () => {
      setLoading(true);

      const response = await fetch(`/api/comments/${uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          uid: uid,
          nickname: nickname,
          email: email,
          comment: comment,
          reply: replyOf,
          pid: id
        })
      });
      return response.json();
    };

    postData().then((data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        setSubmitted(true);
        setLoading(false);
      }
    });
  };

  const closeModal = () => {
    setSubmitted(false);
    setComment("");
    setEmail("");
    setNickname("");
    setReplyOf(null);
  };

  return (
    <div className="mt-12">
      <Heading
        as="h2"
        size="lg"
        className="mt-12 scroll-mt-[120px]"
        id="commentsSection"
      >
        {comments?.length
          ? `${comments.length} comments`
          : "Join the discussion"}
      </Heading>
      <form onSubmit={onSubmit} className="flex gap-4 flex-col mt-6 relative">
        <AnimatePresence>
          {replyOf && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ReplyBox
                comments={comments ?? []}
                inComment={false}
                replyOf={replyOf}
                onClose={() => setReplyOf(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex flex-col gap-4 items-start">
          <div className="border-2 rounded-xl w-full relative z-10">
            <ReactQuill
              className="-m-px text-base"
              theme="snow"
              value={comment}
              onChange={setComment}
              modules={{
                toolbar: [
                  ["bold", "italic", "code"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                  ["clean"]
                ]
              }}
              formats={["bold", "italic", "code", "link", "list", "bullet"]}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 w-full">
            <FormTextField
              onChange={onEmailChange}
              type="email"
              placeholder="Your email"
              className="w-full"
              value={email}
            />
            <FormTextField
              onChange={onNicknameChange}
              type="nickname"
              placeholder="Your nickname"
              className="w-full"
              value={nickname}
            />
          </div>
          <Button type="submit" style="primary" as="button">
            {loading ? <Loader /> : "Send comment"}
          </Button>
        </div>
      </form>
      {comments && comments.length > 0 && (
        <div className="flex flex-col gap-8 mt-12 text-gray-15">
          {comments?.map((comment) => (
            <div
              id={comment.id}
              key={comment.id}
              className="border-gray-EE border-b scroll-mt-[120px] dark-copy"
            >
              <div className="flex items-center gap-2">
                {comment.email === "marketing@prismic.io" && (
                  <div className="w-6 h-6 text-primary-purple">
                    <Logomark />
                  </div>
                )}
                <Heading as="h4" size="md">
                  {comment.nickname}
                </Heading>
              </div>
              {comment.reply_of && (
                <div className="mt-6">
                  <ReplyBox
                    comments={comments}
                    inComment={true}
                    replyOf={comment.reply_of}
                  />
                </div>
              )}
              <div
                dangerouslySetInnerHTML={{ __html: comment.payload }}
                className="comment-text mt-6 text-base 2xl:text-md font-medium copy-muted"
              />
              <div className="flex text-base gap-2 mt-6 mb-8">
                <a
                  onClick={() => setReplyOf(comment.id)}
                  href="#commentsSection"
                  className="flex items-center gap-1.5"
                >
                  <ReplyIcon />
                  Reply
                </a>
                ·
                <span className="text-gray-A4 first-letter:uppercase">
                  {formatCommentDate(comment.created_at)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      <BlogCommentSubmitted
        nickName={nickname}
        isOpen={submitted}
        onClose={() => closeModal()}
      />
    </div>
  );
};
