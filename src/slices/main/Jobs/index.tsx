import { encode } from "base-64";
import dynamic from "next/dynamic";

import { getTheme } from "@/lib/utils/getTheme";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

import type { SliceZoneContext } from "@/lib/types";

const JobsDefault = dynamic(() => import("./Default"));

/**
 * Props for `MainJobs`.
 */
export type MainJobsProps = SliceComponentProps<
  Content.MainJobsSlice,
  SliceZoneContext
>;

/**
 * Component for "MainJobs" Slices.
 */
const MainJobs = async ({
  slice,
  context
}: MainJobsProps): Promise<JSX.Element> => {
  const theme = getTheme(slice.primary.theme, context.theme);

  const data = await fetch("https://api.lever.co/v1/postings", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + encode(process.env.LEVER_API_KEY + ":" + "")
    }
  }).then((res) => res.json());

  const jobs = data.data
    .filter((posting: any) => posting.state === "published")
    .map((posting: any) => ({
      id: posting.id,
      position: posting.text,
      team: posting.categories.team,
      location: posting.workplaceType
    }));

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      data-theme={theme}
    >
      {slice.variation === "default" && (
        <JobsDefault jobs={jobs} slice={slice} theme={theme} />
      )}
    </section>
  );
};

export default MainJobs;
