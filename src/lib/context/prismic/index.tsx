"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PrismicContext = createContext({
  loggedIn: false,
  pricingMonthly: true,
  changePricingMonthly: () => {},
});

export const setCookie = (name: string, value: number, exp: number) => {
  const d = new Date();
  d.setTime(d.getTime() + exp * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

export const getCookie = (name: string) => {
  function escape(s: string) {
    return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, "\\$1");
  }
  let match = document.cookie.match(
    RegExp("(?:^|;\\s*)" + escape(name) + "=([^;]*)")
  );
  return match ? match[1] : null;
};

export function PrismicState({ children }: { children: React.ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pricingMonthly, setPricingMonthly] = useState(false);

  const changePricingMonthly = () => {
    setPricingMonthly(!pricingMonthly);
  };

  useEffect(() => {
    const loggedInCookie = getCookie("is-logged-in");
    setLoggedIn(loggedInCookie === "1");
  }, []);

  return (
    <PrismicContext.Provider
      value={{ loggedIn, pricingMonthly, changePricingMonthly }}
    >
      {children}
    </PrismicContext.Provider>
  );
}

export function usePrismicContext() {
  return useContext(PrismicContext);
}
