"use client";

import { SpeedInsights } from '@vercel/speed-insights/next';

export const SpeedInsightsClient = () => {
  return (
    <SpeedInsights
      debug
      beforeSend={(data) => {
        if (data.url.includes("/slice-simulator")) {
          return null;
        }
        return data;
      }}
    />
  );
};
