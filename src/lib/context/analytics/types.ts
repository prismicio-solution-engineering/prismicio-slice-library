export type PrismicAnalyticsProps = {
  usercentricsSettingId: string;
  segmentWriteKey: string;
  children: React.ReactNode;
  debug?: boolean;
};

export type SegmentContentGroup = "Website" | "Blog" | "Docs" | "Academy";

export type SegmentPageProps = {
  pageType:
    | "blog_home"
    | "blog"
    | "blog_category"
    | "blog_author"
    | "blog_guide"
    | "blog_latest"
    | "developer"
    | "developers"
    | "landing_page"
    | "legal"
    | "legal_home"
    | "page"
    | "showcase"
    | "shows"
    | "error"
    | "case_study"
    | "blog_guides_home"
    | "competitor"
    | "case_studies"
    | "use_case"
    | "use_cases"
    | "feature"
    | "features"
    | "updates"
    | "";
  pageUid?: string;
  pageId?: string;
  pageCategory?: string;
  pageTags?: string[] | "";
  contentGroup: SegmentContentGroup;
};

export type SegmentCtaEventName = "CTA Clicked";

export type SegmentCtaEventContext = {
  ctaType: string;
  ctaPosition: string;
  ctaText: string;
  ctaUrl?: string;
  ctaCodeLanguage?: string;
  ctaCodeCategory?: string;
};

export type SegmentFormEventName =
  | "Form Viewed"
  | "Form Started"
  | "Form Submitted"
  | "Demo Requested";

export type SegmentFormEventContext = {
  formName: string;
};
