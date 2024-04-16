"use client";

// Server Components cannot use hooks. This Client Component can be used in Server Components with the required client-side hooks.

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { usePrismicAnalytics } from "@/lib/context/analytics";
import { BlogDocumentWithExtras } from "@/lib/types";
import { asText, Content, isFilled } from "@prismicio/client";

import type { SegmentContentGroup } from "@/lib/context/analytics/types";

export const PageView = ({
  contentGroup = "Website",
  page,
  pageType
}: {
  contentGroup: SegmentContentGroup;
  page?:
    | Content.PageDocument
    | Content.ShowcaseDocument
    | Content.ShowsDocument
    | Content.LegalDocument
    | Content.LandingPageDocument
    | Content.DevelopersDocument
    | Content.DeveloperDocument
    | Content.BlogHomeDocument
    | BlogDocumentWithExtras
    | Content.BlogCategoryDocument
    | Content.BlogAuthorDocument
    | Content.BlogLatestDocument
    | Content.CaseStudyDocument
    | Content.BlogGuideDocument
    | Content.BlogGuidesHomeDocument
    | Content.CompetitorDocument
    | Content.CaseStudiesDocument
    | Content.UseCaseDocument
    | Content.UseCasesDocument
    | Content.FeatureDocument
    | Content.FeaturesDocument
    | Content.LegalHomeDocument
    | Content.UpdatesDocument;
  pageType?: string;
}) => {
  const { segmentPageEvent } = usePrismicAnalytics();
  const pathname = usePathname();

  useEffect(() => {
    if (page === undefined) return;

    const pageCategory = () => {
      switch (page.type) {
        case "blog":
          if (
            isFilled.contentRelationship(page.data.category) &&
            page.data.category.data?.title
          ) {
            return asText(page.data.category.data?.title);
          }
          break;
        case "blog_category":
          if (isFilled.richText(page.data.title)) {
            return asText(page.data.title);
          }
          break;
        default:
          return "";
      }
    };

    segmentPageEvent({
      contentGroup,
      pageType: page.type,
      pageUid: page.uid ? page.uid : "",
      pageId: page.id,
      pageTags: page.tags.length ? page.tags : "",
      pageCategory: pageCategory()
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (pageType === undefined) return;

    if (pageType === "error") {
      const contentGroup =
        pathname.includes("/blog/") || pathname.includes("/guides/")
          ? "Blog"
          : "Website";

      segmentPageEvent({
        contentGroup,
        pageType
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageType]);

  return <div />;
};
