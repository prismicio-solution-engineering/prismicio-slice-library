"use client";

import Script from 'next/script';
import { useEffect, useState } from 'react';

import { usePrismicAnalytics } from '@/lib/context/analytics';

export const Intellimize = () => {
  const { consentData } = usePrismicAnalytics();
  const [intellimizeConsent, setIntellimizeConsent] = useState(false);

  // Check for consent data on mount
  useEffect(() => {
    if (!consentData) {
      return;
    }

    if (consentData.Intellimize) {
      setIntellimizeConsent(true);
    } else {
      setIntellimizeConsent(false);
    }
  }, [consentData]);

  // Load Intellimize without consent if coming from Intellimize
  useEffect(() => {
    if (globalThis?.self !== globalThis?.top) {
      if (document.referrer.includes("https://app.intellimize.com/")) {
        setIntellimizeConsent(true);
        console.log("Intellimize loaded without consent.");
      }
    }
  }, []);

  return (
    intellimizeConsent && (
      <>
        <style id="intellimize-style">
          {`
            .anti-flicker, .anti-flicker * {visibility: hidden !important; display: none !important; opacity: 0 !important;}
          `}
        </style>
        <Script
          id="intellimize1"
          dangerouslySetInnerHTML={{
            __html: `(function(e,t,p){var n=document.documentElement,s={p:[],r:[]},u={p:s.p,r:s.r,push:function(e){s.p.push(e)},ready:function(e){s.r.push(e)}};e.intellimize=u,n.className+=" "+p,setTimeout(function(){n.className=n.className.replace(RegExp(" ?"+p),"")},t)})(window, 4000, 'anti-flicker')`
          }}
        />
        <link
          rel="preload"
          href="https://cdn.intellimize.co/snippet/117996323.js"
          as="script"
        />
        <Script
          id="intellimize2"
          src="https://cdn.intellimize.co/snippet/117996323.js"
          async
          onError={() => {
            document.documentElement.className =
              document.documentElement.className.replace(
                RegExp(" ?anti-flicker"),
                ""
              );
          }}
        />
        <link
          rel="preconnect"
          href="https://api.intellimize.co"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://117996323.intellimizeio.com" />
        <link
          rel="preconnect"
          href="https://log.intellimize.co"
          crossOrigin=""
        />
      </>
    )
  );
};
