import localFont from "next/font/local";

/**
 * @license
 * MyFonts Webfont Build ID 150298
 *
 * The fonts listed in this notice are subject to the End User License
 * Agreement(s) entered into by the website owner. All other parties are
 * explicitly restricted from using the Licensed Webfonts(s).
 *
 * You may obtain a valid license from one of MyFonts official sites.
 * http://www.fonts.com
 * http://www.myfonts.com
 * http://www.linotype.com
 *
 */

export const headingsFont = localFont({
  src: [
    {
      path: "../../assets/fonts/rationaldisplay-semibold-webfont.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../assets/fonts/rationaldisplay-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-headings",
  display: "swap",
});

export const copyFont = localFont({
  src: [
    {
      path: "../../assets/fonts/Satoshi-Variable.woff2",
      style: "normal",
      weight: "125 950",
    },
  ],
  variable: "--font-copy",
  display: "swap",
  declarations: [
    {
      prop: "font-stretch",
      value: "75% 125%",
    },
  ],
});

export const monoFont = localFont({
  src: [
    {
      path: "../../assets/fonts/IBMPlexMono-Medium.woff2",
      style: "normal",
      weight: "500",
    },
  ],
  display: "swap",
  variable: "--font-mono",
});
