"use client";

// Server Components cannot use hooks. This Client Component can be used in Server Components with the required client-side hooks.

import { useEffect } from 'react';

export const HideIntercom = ({ hidden }: { hidden: boolean }) => {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `.intercom-lightweight-app { display: none !important; }; }`;

    if (hidden) {
      document.head.appendChild(style);
    } else {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    }
  }, [hidden]);

  return null;
};
