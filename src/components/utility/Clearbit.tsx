"use client";

import Script from 'next/script';
import { useEffect, useState } from 'react';

import { usePrismicAnalytics } from '@/lib/context/analytics';

export const Clearbit = () => {
  const { consentData } = usePrismicAnalytics();
  const [clearbitConsent, setClearbitConsent] = useState(false);

  // Check for consent data on mount
  useEffect(() => {
    if (!consentData) {
      return;
    }

    if (consentData.Clearbit) {
      setClearbitConsent(true);
    } else {
      setClearbitConsent(false);
    }
  }, [consentData]);

  return (
    clearbitConsent && (
      <>
        <Script
          src="https://tag.clearbitscripts.com/v1/pk_75fa667d37168e9ba8403df2040a579e/tags.js"
          referrerPolicy="strict-origin-when-cross-origin"
          async
        />
      </>
    )
  );
};
