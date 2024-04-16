import type { Metadata } from "next";
import "@/styles/globals.css";
import clsx from "clsx";

import { copyFont, headingsFont, monoFont } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Prismic - Slice Library",
  description: "Browse Prismic Slices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body
        className={clsx(
          "font-copy font-medium antialiased selection:bg-primary-purple selection:text-white",
          `${headingsFont.variable} ${copyFont.variable} ${monoFont.variable}`
        )}
      >
        {/* <IntellimizeListener /> */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* <Providers> */}
            {/* <Intellimize /> */}
            {children}
          {/* </Providers> */}
        </div>
        {/* <PrismicPreview repositoryName={repositoryName} /> */}
      </body>
    </html>
  );
}
