import { Content, KeyTextField, SelectField } from "@prismicio/client";

export type MenuItemSliceWithSubMenu = Content.MenuItemSliceWithSubMenu & {
  primary: {
    sub_menu: Content.SubMenuDocument;
  };
};

export type LayoutDocumentWithMenuItems = Content.LayoutDocument & {
  data: {
    slices1: MenuItemSliceWithSubMenu[] | Content.MenuItemSliceDefault[];
    slices2: Content.FooterColumnSliceDefault[];
  };
};

export type PageDocumentWithWebsites = Content.PageDocument & {
  data: {
    website: {
      data: Pick<Content.WebsiteDocumentData, "name" | "screenshot">;
    };
  };
};

export type WebsiteDocumentWithTechnology = Content.WebsiteDocument & {
  data: {
    website_technology: {
      data: Pick<Content.TechnologyDocumentData, "title" | "logotype">;
    };
  };
};

export type AuthorDocumentWithTechnology = Content.BlogAuthorDocument & {
  data: {
    tags: {
      tag: Pick<Content.TechnologyDocumentData, "title" | "link">;
    };
  };
};

export type PrismicColors = SelectField<
  "green" | "orange" | "purple" | "blue" | "pink"
>;

export type GuideNavProps = {
  guide?: Content.BlogGuideDocument | null;
  uid: string;
  blog?: {
    name?: KeyTextField;
    uid: string;
  };
} | null;

export type DeveloperDocumentWithWebsites = Content.DeveloperDocument & {
  data: {
    country: {
      data: Pick<Content.CountryDocumentData, "name">;
    };
    websites: {
      website: Pick<Content.WebsiteDocumentData, "name" | "screenshot">;
    };
  };
};

export type SliceZoneContext = {
  theme: "light" | "dark";
  updated?: string;
  monthly?: boolean;
  changeMonthly?: (monthly: boolean) => void;
  shiki?: any;
  blogs?: BlogDocumentWithExtras[];
  pageType?: string;
  category?: string;
  sliceIds?: string[];
  slug?: string;
  uid?: string;
};

export interface BlogDocumentWithExtras extends Content.BlogDocument {
  data: Content.BlogDocumentData & {
    comment_count: number | null | undefined;
    vote_total: number | null | undefined;
    view_count?: number | null | undefined;
    author: {
      uid: string;
      data: Pick<
        Content.BlogAuthorDocumentData,
        "name" | "image" | "description"
      >;
    };
    category: {
      uid: string;
      data: Pick<Content.BlogCategoryDocumentData, "title" | "icon">;
    };
  };
}

export interface BlogComment {
  id: string;
  created_at: string;
  updated_at?: string;
  nickname: string;
  email: string;
  payload: string;
  reply_of?: string;
}
