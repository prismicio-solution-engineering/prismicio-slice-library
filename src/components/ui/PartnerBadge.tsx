"use client";

import clsx from "clsx";

import CrownIcon from "@/assets/svg/crown.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/Tooltip";

export const PartnerBadge = ({
  level,
  featured,
  size = "sm",
  className
}: {
  level: "1 bronze" | "2 silver" | "3 gold";
  featured?: boolean;
  size?: "sm" | "lg";
  className?: string;
}) => {
  return (
    <Tooltip placement="top">
      <TooltipTrigger>
        <div
          className={clsx(
            "p-1 px-2 rounded-md flex bg-gray-F7 items-center",
            className,
            {
              "bg-primary-purple text-white": featured
            }
          )}
        >
          <CrownIcon
            className={clsx("mr-1 inline-block", {
              "text-[#EE8950]": level === "1 bronze",
              "text-gray-A4": level === "2 silver",
              "text-[#FFD600]": level === "3 gold",
              "w-4 h-4 mr-1": size === "sm",
              "w-6 h-6 mr-2": size === "lg"
            })}
          />
          {level === "1 bronze" && "Bronze Partner"}
          {level === "2 silver" && "Silver Partner"}
          {level === "3 gold" && "Gold Partner"}
        </div>
      </TooltipTrigger>
      <TooltipContent>
        {level === "1 bronze" && (
          <span>
            Agencies that have been trained through our enablement program and
            completed a full Prismic implementation.
          </span>
        )}
        {level === "2 silver" && (
          <span>
            Demonstrated mastery by implementing at least three projects using
            Prismic, ensuring quality and expertise.
          </span>
        )}
        {level === "3 gold" && (
          <span>
            Our elite partners, showcasing unparalleled skill by executing
            complex projects and having completed more than five Prismic
            implementations.
          </span>
        )}
      </TooltipContent>
    </Tooltip>
  );
};
