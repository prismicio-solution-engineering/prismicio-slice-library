"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Heading } from "@/components/ui/Heading";
import { Content, KeyTextField } from "@prismicio/client";

const RollingTitlePart = ({
  part,
  play
}: {
  part: KeyTextField;
  play: boolean;
}) => {
  const words = part?.split(" ");

  const partVariants = {
    visible: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.3
      }
    }
  };

  const wordVariants = {
    hidden: {
      y: -20,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        mass: 0.3
      }
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        mass: 0.3
      }
    }
  };

  return (
    <motion.div
      variants={partVariants}
      initial="hidden"
      animate={play ? "visible" : "hidden"}
    >
      {words?.map((word, i) => (
        <motion.span variants={wordVariants} className="inline" key={i}>
          {word + " "}
        </motion.span>
      ))}
    </motion.div>
  );
};

export const BlogHomeHeading = ({
  data
}: {
  data: Content.BlogHomeDocumentData;
}) => {
  const [isPlaying, setIsPlaying] = useState(0);

  useEffect(() => {
    if (!data.rolling_title.length) return;

    const delay = data.rolling_title_interval
      ? data.rolling_title_interval * 1000
      : 3000;

    const interval = setInterval(() => {
      setIsPlaying((prev) => (prev + 1) % data.rolling_title.length);
    }, delay);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container my-12">
      {data.pre_title && (
        <h1
          className={clsx("font-bold text-base md:text-md mb-4 block", {
            "text-primary-green": data.pre_title_color === "green",
            "text-primary-orange": data.pre_title_color === "orange",
            "text-primary-purple": data.pre_title_color === "purple",
            "text-primary-blue": data.pre_title_color === "blue",
            "text-primary-pink": data.pre_title_color === "pink",
            "opacity-50": !data.pre_title_color
          })}
        >
          {data.pre_title}
        </h1>
      )}
      {data.rolling_title ? (
        <span className="relative font-headings font-bold text-6xl lg:text-7xl 2xl:text-8xl">
          <AnimatePresence mode="wait">
            {data.rolling_title.map(
              (item, index) =>
                isPlaying === index && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <RollingTitlePart
                      play={index === isPlaying}
                      part={item.title_part}
                    />
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </span>
      ) : (
        <Heading field={data.title} size="3xl" />
      )}
    </div>
  );
};
