"use client";

import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { usePrismicContext } from "@/lib/context/prismic";
import { Content } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

type NavigationCtasProps = {
  theme: SliceZoneContext["theme"];
  layout: Content.LayoutDocument;
};

export const NavigationCtas = ({ theme, layout }: NavigationCtasProps) => {
  const { loggedIn } = usePrismicContext();
  const { segmentCtaEvent } = usePrismicAnalytics();

  return (
    <div className="container lg:mx-0 lg:w-auto lg:max-w-none justify-end order-1 lg:order-2 flex flex-col sm:flex-row sm:items-center sm:gap-x-4 p-6 lg:p-0 bg-white dark:bg-gray-15 relative z-10">
      <div className="flex flex-col-reverse gap-y-2 sm:flex-row lg:space-y-0 sm:gap-x-4 order-2 sm:order-1 mt-4 sm:mt-0 text-left lg:py-9">
        {!loggedIn && (
          <a
            href="https://prismic.io/dashboard/login"
            onClick={() =>
              segmentCtaEvent("CTA Clicked", {
                ctaType: "tertiary link",
                ctaPosition: "header",
                ctaText: layout.data.login_cta_label || "Login",
                ctaUrl: "https://prismic.io/dashboard/login"
              })
            }
          >
            {layout.data.login_cta_label || "Login"}
          </a>
        )}
        <Link
          href="/demo"
          onClick={() =>
            segmentCtaEvent("CTA Clicked", {
              ctaType: "tertiary link",
              ctaPosition: "header",
              ctaText: layout.data.demo_cta_label || "Get a demo",
              ctaUrl: "https://prismic.io/demo"
            })
          }
          data-intellimize-id="demo-cta"
        >
          {layout.data.demo_cta_label || "Get a demo"}
        </Link>
      </div>
      <Button
        as="a"
        style="primary"
        theme={theme}
        href={
          loggedIn
            ? "https://prismic.io/dashboard"
            : "https://prismic.io/dashboard/signup"
        }
        className="order-1 lg:order-2 block text-center"
        data-intellimize-id={loggedIn ? "dashboard-cta" : "signup-cta"}
        onClick={() => {
          segmentCtaEvent("CTA Clicked", {
            ctaType: "primary link",
            ctaPosition: "header",
            ctaText: loggedIn
              ? layout.data.dashboard_cta_label || "Dashboard"
              : layout.data.sign_up_cta_label || "Start Building",
            ctaUrl: loggedIn
              ? "https://prismic.io/dashboard"
              : "https://prismic.io/dashboard/signup"
          });
        }}
      >
        {loggedIn
          ? layout.data.dashboard_cta_label || "Dashboard"
          : layout.data.sign_up_cta_label || "Start Building"}
      </Button>
    </div>
  );
};
