import clsx from "clsx";

import { Heading } from "@/components/ui/Heading";

export const NoResults = ({ className }: { className?: string }) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-12 border-2 rounded-2xl px-12 py-20 border-gray-EE",
        className
      )}
    >
      <div className="flex flex-col gap-4 text-center">
        <Heading as="h2" size="xl">
          No results found
        </Heading>
        <p className="text-base lg:text-md font-medium text-gray-50">
          Try to change your search criteria
        </p>
      </div>
    </div>
  );
};
