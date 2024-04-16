"use client";

import clsx from 'clsx';
import { motion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

type VotesProps = {
  slug: string;
  pid: string;
  onUpvote?: () => void;
  onDownvote?: () => void;
  onMaxVotes?: () => void;
  className?: string;
};

const fetcher = async (input: RequestInfo) => {
  const res: Response = await fetch(input);
  return await res.json();
};

export const Votes = ({
  slug,
  pid,
  onUpvote,
  onDownvote,
  onMaxVotes,
  className
}: VotesProps) => {
  const { data } = useSWR(`/api/votes/${pid}`, fetcher);
  const [votesState, setVotesState] = useState(data?.total || 0);
  const [hasVoted, setHasVoted] = useState(0);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    setVotesState(data?.total || 0);
    setHasVoted(parseInt(localStorage.getItem(slug) || "0"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const vote = (dir: "up" | "down") => {
    fetch(`/api/votes/${pid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ dir })
    });

    setClicked(true);

    if (dir === "up") {
      setVotesState(votesState + 1);
      onUpvote && onUpvote();
      localStorage.setItem(slug, (hasVoted + 1).toString());
      setHasVoted((hasVoted) => hasVoted + 1);
    } else {
      setVotesState(votesState - 1);
      onDownvote && onDownvote();
      localStorage.setItem(slug, (hasVoted - 1).toString());
      setHasVoted((hasVoted) => hasVoted - 1);
    }
  };

  const height = useSpring(0);

  useEffect(() => {
    if (hasVoted > 4 && clicked) {
      onMaxVotes && onMaxVotes();
    }

    height.set(hasVoted * 12.8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasVoted]);

  return (
    <div
      className={clsx(
        "w-14 h-16 relative rounded-lg shrink-0 bg-gray-F7 font-headings flex flex-col items-center justify-center overflow-hidden",
        className
      )}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-quaternary-green"
        style={{
          height
        }}
      />
      <button
        className="w-full h-8 relative before:border-gray-15 before:border-opacity-50 before:content-[''] before:border-4 before:border-r-transparent before:border-b-transparent before:w-2 before:h-2 before:-mt-2 before:rotate-45 before:-translate-x-1/2 before:block before:absolute before:top-5 before:left-1/2 disabled:opacity-20"
        onClick={() => {
          vote("up");
        }}
        disabled={hasVoted > 4}
      >
        <span className="sr-only">Upvote post</span>
      </button>
      <span className="relative z-10">{votesState >= 0 ? votesState : 0}</span>
      <button
        className="rotate-180 w-full h-8 relative before:border-gray-15 before:border-opacity-50 before:content-[''] before:border-4 before:border-r-transparent before:border-b-transparent before:w-2 before:h-2 before:-mt-2 before:rotate-45 before:-translate-x-1/2 before:block before:absolute before:top-5 before:left-1/2 disabled:opacity-20"
        onClick={() => {
          votesState > 0 && vote("down");
        }}
        disabled={hasVoted <= -1}
      >
        <span className="sr-only">Downvote post</span>
      </button>
    </div>
  );
};
