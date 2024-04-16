"use client";

import Script from 'next/script';

import { PrismicAnalytics } from '@/lib/context/analytics';
import { PrismicState } from '@/lib/context/prismic';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrismicState>
      <PrismicAnalytics
        usercentricsSettingId={process.env.NEXT_PUBLIC_USERCENTRICS_SETTING_ID!}
        segmentWriteKey={process.env.NEXT_PUBLIC_SEGMENT_WRITE_KEY!}
        debug={process.env.NODE_ENV === "development"}
      >
        {children}
        <Script id="detect-os">
          {`
            // Detect OS
            let OSName = "Unknown OS";
            if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) OSName="Windows 10";
            if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName="Windows 8";
            if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName="Windows 7";
            if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName="Windows Vista";
            if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName="Windows XP";
            if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName="Windows 2000";
            if (window.navigator.userAgent.indexOf("Mac")            != -1) OSName="Mac/iOS";
            if (window.navigator.userAgent.indexOf("X11")            != -1) OSName="UNIX";
            if (window.navigator.userAgent.indexOf("Linux")          != -1) OSName="Linux";
            
            if (OSName.startsWith("Windows")) {
                document.body.classList.add("windows");
            } else {
                document.body.classList.add("non-windows");
            }
          `}
        </Script>
      </PrismicAnalytics>
    </PrismicState>
  );
};
