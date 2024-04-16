"use client";

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const IntellimizeListener = () => {
  const pathname = usePathname();

  // Activate Intellimize on route change
  useEffect(() => {
    // @ts-ignore
    if (!window.intellimize) {
      return;
    }
    // @ts-ignore
    intellimize.ready(function () {
      // @ts-ignore
      intellimize.activate();
      console.log("Intellimize activated");
    });
  }, [pathname]);

  return <></>;
};
