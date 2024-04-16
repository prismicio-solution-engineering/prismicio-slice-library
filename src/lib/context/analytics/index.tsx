"use client";

import { AnalyticsBrowser } from "@segment/analytics-next";
import { useMemo, useState, createContext, useContext, useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

import {
  PrismicAnalyticsProps,
  SegmentPageProps,
  SegmentCtaEventName,
  SegmentCtaEventContext,
  SegmentFormEventName,
  SegmentFormEventContext,
} from "./types";

// Context
const AnalyticsContext = createContext<{
  analytics: AnalyticsBrowser;
  segmentPageEvent: (props: SegmentPageProps) => void;
  segmentTrackEvent: (name: string, context: any) => void;
  segmentCtaEvent: (
    name: SegmentCtaEventName,
    context?: SegmentCtaEventContext
  ) => void;
  segmentFormEvent: (
    name: SegmentFormEventName,
    context?: SegmentFormEventContext
  ) => void;
  consentData?: any;
}>(undefined!);

// Provider
export const PrismicAnalytics = ({
  children,
  usercentricsSettingId,
  segmentWriteKey,
  debug = false,
}: PrismicAnalyticsProps) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const analytics = useMemo(() => new AnalyticsBrowser(), [segmentWriteKey]);
  const currentPath = usePathname();
  const isSimulator = currentPath?.startsWith("/slice-simulator");
  const [segmentLoaded, setSegmentLoaded] = useState(false);
  const [firstPageViewSent, setFirstPageViewSent] = useState(false);
  const [pageViewData, setPageViewData] = useState<any>(null);
  const [consentData, setConsentData] = useState<
    {
      id: string;
      status: boolean;
    }[]
  >([]);

  // Store page view data to send to Segment trough page view events and track events
  const segmentPageEvent = (props: SegmentPageProps) => {
    setPageViewData(props);
  };

  // Basic track event to send data to Segment
  const segmentTrackEvent = (name: string, context: any) => {
    if (segmentLoaded) {
      analytics.track(name, {
        session_id: localStorage.getItem("analytics_session_id"),
        ...context,
        ...pageViewData,
      });

      // If context.ctaUrl contains "signup", send additional signup event to segment
      if (context) {
        if (context.ctaUrl && context.ctaUrl.includes("signup")) {
          analytics.track("Sign Up CTA Clicked", {
            session_id: localStorage.getItem("analytics_session_id"),
            ...context,
            ...pageViewData,
          });

          // Send specific event to LinkedIn since we cant send trough Segment
          // @ts-ignore
          if (window.lintrk) {
            // @ts-ignore
            window.lintrk("track", { conversion_id: 12947916 });
          }
        }
      }

      if (name === "Demo Requested") {
        // Send specific event to LinkedIn since we cant send trough Segment
        // @ts-ignore
        if (window.lintrk) {
          // @ts-ignore
          window.lintrk("track", { conversion_id: 12947924 });
        }
      }

      // If debug prop is enabled on the component, log the event
      debug && console.log("trackEvent called", name, context);
    }
  };

  // Send cta event to Segment
  const segmentCtaEvent = (
    name: SegmentCtaEventName,
    context?: SegmentCtaEventContext
  ) => {
    if (context?.ctaUrl) {
      if (context.ctaUrl.startsWith("/")) {
        context.ctaUrl = "https://prismic.io" + context.ctaUrl;
      }
    }

    segmentTrackEvent(name, context);
  };

  // Send form event to Segment
  const segmentFormEvent = (
    name: SegmentFormEventName,
    context?: SegmentFormEventContext
  ) => {
    segmentTrackEvent(name, context);
  };

  // Aggregate service statuses from Usercentrics to send to Segment
  const aggregateServiceStatuses = (
    services: { id: string; status: boolean }[]
  ): { [key: string]: boolean } => {
    const serviceStatuses: { [key: string]: boolean } = services.reduce<{
      [key: string]: boolean;
    }>((statuses, service) => {
      statuses[service.id] = service.status;
      return statuses;
    }, {});

    const result: { [key: string]: boolean } = {};

    const getStatus = (id: string): boolean => serviceStatuses[id] ?? false;

    const segment = getStatus("O97xcRJFR"); // Segment.io Id from UC
    result["Segment.io"] = segment;

    const youtube = getStatus("BJz7qNsdj-7"); // Youtube Video Id from UC
    result["Youtube Video"] = youtube;

    const hubspot =
      segment && // Segment.io Id from UC
      getStatus("ry0QcNodoWQ"); // Hubspot Web Id from UC
    result["Hubspot Web (Actions)"] = hubspot;

    const intercom =
      segment && // Segment.io Id from UC
      getStatus("ryDQcVoOoZQ"); // Intercom Web Id from UC
    result["Intercom Web (Actions)"] = intercom;

    const hotjar =
      segment && // Segment.io Id from UC
      getStatus("S1kgcNo_j-m"); // Hotjar Id from UC
    result["Hotjar"] = hotjar;

    const amplitude =
      segment && // Segment.io Id from UC
      getStatus("Sk9kb5VoOi-7"); // Amplitude Actions Id from UC
    result["Amplitude (Actions)"] = amplitude;

    const facebookPixel =
      segment && // Segment.io Id from UC
      getStatus("ko1w5PpFl") && // Facebook Pixel Id from UC
      getStatus("XYQZBUojc"); // Facebook Social Plugins Id from UC
    result["Facebook Pixel"] = facebookPixel;

    const linkedInInsightTag =
      segment && // Segment.io Id from UC
      getStatus("Hkx754i_iWm") && // LinkedIn Plugin Id from UC
      getStatus("rk-nqEj_o-m") && // LinkedIn Ads Id from UC
      getStatus("JQ2XQxIk"); // LinkedIn Insight Tag Id from UC
    result["LinkedIn Insight Tag"] = linkedInInsightTag;

    const googleAdwordsNew =
      segment && // Segment.io Id from UC
      getStatus("rJ99c4oOo-X") && // Google AdServices Id from UC
      getStatus("S1_9Vsuj-Q") && // Google Ads Id from UC
      getStatus("SkPc5EjOsWm") && // Google Syndication Id from UC
      getStatus("BJ59EidsWQ") && // Google Tag Manager Id from UC
      getStatus("9V8bg4D63"); // DoubleClick Ad Id from UC
    result["Google AdWords New"] = googleAdwordsNew;

    return result;
  };

  // Load Segment
  const loadSegment = () => {
    const ucSettings = JSON.parse(localStorage.getItem("uc_settings")!);
    const services = aggregateServiceStatuses(ucSettings.services);

    // If debug prop is enabled on the component, log the event
    debug && console.log("Consent:", services);

    analytics
      .load(
        { writeKey: segmentWriteKey },
        {
          integrations: {
            All: false,
            ...services,
          },
        }
      )
      .catch((e) => {
        console.log(e);
      });

    // Dummy event to trigger session id creation in LocalStorage
    analytics.track(
      "Initial Event",
      {},
      {
        integrations: {
          All: false,
          "Segment.io": false,
        },
      }
    );

    if (services["Segment.io"]) {
      setSegmentLoaded(true);
      // If debug prop is enabled on the component, log what happens
      debug && console.log("Segment loaded, and active.");
    } else {
      setSegmentLoaded(false);
      // If debug prop is enabled on the component, log what happens
      debug && console.log("Segment loaded, but not active.");
    }
  };

  // Set up consent and tracking
  useEffect(() => {
    let ucInteracted = localStorage.getItem("uc_user_interaction");

    if (isSimulator) {
      debug && console.log("Slice simulator detected, not loading analytics.");
      return;
    }

    if (ucInteracted === "true") {
      debug && console.log("User has interacted before, loading segment.");
      loadSegment();
    }

    // On consent change in usercentrics, call load function, if not run already
    window.addEventListener("ucEvent", (event: any) => {
      ucInteracted = localStorage.getItem("uc_user_interaction");
      setConsentData(event.detail);

      if (
        event.detail.action === "onAcceptAllServices" ||
        event.detail.action === "onUpdateServices"
      ) {
        if (ucInteracted === "false") {
          debug && console.log("Users first interaction, loading segment");
          loadSegment();
        } else {
          // Here browser should be reloaded, but we don't want to do that on every consent change since it will be annoying for the user.
          debug &&
            console.log(
              "User has interacted before, preferences will change when user reaload or revisits the page."
            );
          loadSegment();
        }
      } else if (event.detail.action === "onDenyAllServices") {
        // If the user denies all services, reset analytics and set segmentLoaded to false
        analytics.reset();
        setSegmentLoaded(false);
      }
    });

    return () => {
      // Clean up event listener
      window.removeEventListener("ucEvent", () => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Basic page view function
  const pageView = (prevPath: string | null) => {
    analytics.page({
      session_id: localStorage.getItem("analytics_session_id"),
      referrer: firstPageViewSent
        ? "https://prismic.io" + prevPath
        : document.referrer,
      ...pageViewData,
    });

    // If debug prop is enabled on the component, log the event
    debug && console.log("trackPageView called", pageViewData);
  };

  // Send page view to Segment
  useEffect(() => {
    // Set previous path in sessionStorage
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    const prevPath = storage.getItem("currentPath");
    storage.setItem("prevPath", prevPath || "");

    if (segmentLoaded && pageViewData) {
      // If this is the first page view, wait for the session id to be set, then send the page view. Otherwise, send the page view.
      if (!firstPageViewSent) {
        const interval = setInterval(() => {
          if (localStorage.getItem("analytics_session_id")) {
            pageView(prevPath);
            setFirstPageViewSent(true);
            clearInterval(interval);
          }
        }, 1000);
      } else {
        pageView(prevPath);
      }
    }

    // Set current path in sessionStorage
    storage.setItem("currentPath", globalThis.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segmentLoaded, pageViewData]);

  // Dont load scripts if we're in slice simulator
  if (isSimulator) {
    debug && console.log("Slice simulator detected, not loading provider.");
    return <div>{children}</div>;
  }

  return (
    <AnalyticsContext.Provider
      value={{
        analytics,
        segmentPageEvent,
        segmentTrackEvent,
        segmentCtaEvent,
        segmentFormEvent,
        consentData,
      }}
    >
      <>
        <Script
          id="usercentrics-cmp"
          data-settings-id={usercentricsSettingId}
          // Check NEXT_PUBLIC_NODE_ENV
          data-version={
            process.env.NEXT_PUBLIC_NODE_ENV === "development" ? "preview" : ""
          }
          src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
          async
        />
        <Script
          type="application/javascript"
          src="https://privacy-proxy.usercentrics.eu/latest/uc-block.bundle.js"
        />
        {children}
      </>
    </AnalyticsContext.Provider>
  );
};

// Create an analytics hook that we can use with other components.
export const usePrismicAnalytics = () => {
  const result = useContext(AnalyticsContext);
  const currentPath = usePathname();

  const isSimulator = currentPath?.startsWith("/slice-simulator");

  if (isSimulator) {
    return {
      analytics: null,
      segmentPageEvent: () => {},
      segmentTrackEvent: () => {},
      segmentCtaEvent: () => {},
      segmentFormEvent: () => {},
      consentData: null,
    };
  }

  if (!result) {
    throw new Error("Context used outside of its Provider!");
  }

  return result;
};
