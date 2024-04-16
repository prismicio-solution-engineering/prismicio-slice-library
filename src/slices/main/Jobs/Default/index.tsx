"use client";

import clsx from "clsx";

import ArrowIcon from "@/assets/svg/arrow.svg";
import { SliceLayout } from "@/components/layout/SliceLayout";
import { CallToActions } from "@/components/modules/CallToActions";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { Content } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

export type JobsDefaultProps = {
  slice: Content.MainJobsSliceDefault;
  theme: SliceZoneContext["theme"];
  jobs: JobResponseProps[];
};

export type JobResponseProps = {
  id: string;
  position: string;
  team: string;
  location: string;
};

export type JobProps = {
  data: JobResponseProps;
  theme: SliceZoneContext["theme"];
};

const Job = ({ data, theme }: JobProps) => {
  return (
    <a
      className={clsx(
        "w-full flex flex-col sm:flex-row sm:items-start gap-6 rounded-xl p-8 transition-all relative",
        {
          "bg-gray-1F hover:bg-white hover:text-gray-15": theme === "dark",
          "bg-gray-F7 hover:bg-gray-15 hover:text-white": theme === "light"
        }
      )}
      href={`https://jobs.lever.co/prismic/${data.id}`}
    >
      <div className="sm:w-3/5">
        <span className="opacity-50">Position</span>
        <h3 className="text-lg font-medium mt-2">{data.position}</h3>
      </div>
      <div className="sm:w-1/5">
        <span className="opacity-50">Team</span>
        <p className="text-lg font-medium mt-2">{data.team}</p>
      </div>
      <div className="sm:w-1/5">
        <span className="opacity-50">Location</span>
        <p className="text-lg font-medium mt-2 capitalize">{data.location}</p>
      </div>
      <ArrowIcon className="w-8 h-8 absolute bottom-7 right-7 sm:relative sm:bottom-auto sm:right-auto shrink-0 self-center" />
    </a>
  );
};

const JobsDefault = ({ slice, theme, jobs }: JobsDefaultProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container" id="jobs">
        <SliceHeader heading={slice.primary.heading} theme={theme} />
        <div className="flex flex-col items-end gap-6 mt-10">
          <div className="w-full flex flex-col gap-4 2xl:gap-6">
            {jobs &&
              jobs
                .filter((job) => job.team !== "General")
                .map((job, i) => <Job data={job} key={job.id} theme={theme} />)}
          </div>
          <CallToActions items={slice.items} theme={theme} />
        </div>
      </div>
    </SliceLayout>
  );
};

export default JobsDefault;
