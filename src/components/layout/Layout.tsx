import clsx from "clsx";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { layoutQuery } from "@/lib/queries";
import {
  GuideNavProps,
  LayoutDocumentWithMenuItems,
  SliceZoneContext
} from "@/lib/types";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";

import { Banners } from "./Banners";
import { NavigationCtas } from "./NavigationCtas";
import { NavigationHr } from "./NavigationHr";
import { NavigationLanding } from "./NavigationLanding";
import { NavigationShows } from "./NavigationShows";

interface LayoutProps {
  children: React.ReactNode;
  theme: SliceZoneContext["theme"];
  nav?: "landing" | "shows" | "blog" | "hr";
  customNav?: Content.LandingPageDocumentData["header_ctas"];
  noBanner?: boolean;
  guide?: GuideNavProps;
  pageId?: string;
}

export const Layout = async ({
  children,
  theme,
  nav,
  customNav,
  noBanner,
  guide,
  pageId
}: LayoutProps) => {
  const client = createClient();

  const layout = await client.getSingle<LayoutDocumentWithMenuItems>(
    "layout",
    layoutQuery
  );

  const banners = await client.getAllByType("banner");

  return (
    <div
      className={clsx(
        "font-copy font-medium antialiased selection:bg-primary-purple selection:text-white",
        theme === "dark" && "dark bg-gray-15 text-white"
      )}
    >
      <div className="relative z-10 flex flex-col min-h-screen">
        {pageId && !noBanner && banners && (
          <Banners banners={banners} page={pageId} theme={theme} />
        )}
        <Header layout={layout} theme={theme} nav={nav} guide={guide}>
          {nav === "shows" ? (
            <NavigationShows theme={theme ? theme : "light"} />
          ) : nav === "landing" ? (
            <NavigationLanding
              theme={theme ? theme : "light"}
              customNav={customNav}
            />
          ) : nav === "hr" ? (
            <NavigationHr theme={theme ? theme : "light"} />
          ) : (
            <NavigationCtas theme={theme ? theme : "light"} layout={layout} />
          )}
        </Header>
        <main className="grow flex flex-col">{children}</main>
        <Footer slices={layout.data.slices2} nav={nav} />
      </div>
    </div>
  );
};
