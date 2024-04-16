"use client";

import { useEffect, useRef, useState } from "react";

import FormMeetupSignup from "@/components/sections/FormMeetupSignupModal";
import { Button } from "@/components/ui/Button";
import { usePrismicAnalytics } from "@/lib/context/analytics";

import type { SliceZoneContext } from "@/lib/types";

type NavigationShowsProps = {
  theme: SliceZoneContext["theme"];
};

export const NavigationShows = ({ theme }: NavigationShowsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const headerSubscribe = useRef<HTMLDivElement>(null);
  const { segmentCtaEvent } = usePrismicAnalytics();

  const getPosition = () => {
    const subButton = document.querySelector("#subscribeToTheCalendar");

    if (subButton && headerSubscribe.current) {
      const { top } = subButton.getBoundingClientRect();

      if (top < 20) {
        headerSubscribe.current.classList.remove("opacity-0");
      } else {
        headerSubscribe.current.classList.add("opacity-0");
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", getPosition);
    getPosition();

    return () => {
      window.removeEventListener("scroll", getPosition);
    };
  }, []);

  return (
    <div className="order-1 lg:order-2 flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 p-6 lg:p-0 bg-white dark:bg-gray-15 relative z-10">
      <div ref={headerSubscribe} className="transition-opacity opacity-0">
        <Button
          as="button"
          style="primary"
          theme={theme}
          onClick={() => {
            setModalOpen(true);
            segmentCtaEvent("CTA Clicked", {
              ctaType: "primary form",
              ctaPosition: "header",
              ctaText: "Subscribe to the calendar",
              ctaUrl: ""
            });
          }}
          className="block text-center"
        >
          Subscribe to the calendar
        </Button>
        <FormMeetupSignup
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </div>
  );
};
