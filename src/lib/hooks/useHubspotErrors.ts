import { useState } from "react";

export const useHubspotErrors = () => {
  const [hubspotErrors, setHubspotErrors] = useState<string[]>([]);

  const transformHubspotErrors = (errs: { errorType: string }[]) => {
    setHubspotErrors([]);

    if (errs) {
      errs.forEach((err) => {
        if (err.errorType === "BLOCKED_EMAIL") {
          if (!hubspotErrors.includes("Only company email providers allowed")) {
            setHubspotErrors([
              ...hubspotErrors,
              "Only company email providers allowed",
            ]);
          }
        } else {
          setHubspotErrors([
            ...hubspotErrors,
            "Something went wrong. Please try again.",
          ]);
        }
      });
    }
  };

  return [hubspotErrors, transformHubspotErrors] as const;
};
