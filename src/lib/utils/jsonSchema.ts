import {
  BlogPosting,
  CollectionPage,
  Organization,
  Person,
  Review,
  SoftwareApplication,
  WebPage,
  WebSite,
  WithContext
} from "schema-dts";

import { BlogHomeDocument } from "@/prismicio-types";
import {
  asText,
  Content,
  isFilled,
  KeyTextField,
  LinkField
} from "@prismicio/client";

import type {
  AuthorDocumentWithTechnology,
  BlogDocumentWithExtras
} from "@/lib/types";

const PRISMIC_URL = "https://prismic.io";
const PRISMIC_ID = `${PRISMIC_URL}/#`;
const PRISMIC_BLOG_ID = `${PRISMIC_URL}/blog/#`;

type PrismicDocument =
  | AuthorDocumentWithTechnology
  | BlogDocumentWithExtras
  | BlogHomeDocument
  | Content.PageDocument
  | Content.BlogCategoryDocument
  | Content.BlogLatestDocument
  | Content.CaseStudiesDocument
  | Content.FeatureDocument
  | Content.FeaturesDocument
  | Content.BlogGuidesHomeDocument
  | Content.BlogGuideDocument
  | Content.DevelopersDocument
  | Content.DeveloperDocument
  | Content.LegalDocument
  | Content.LandingPageDocument
  | Content.ShowcaseDocument
  | Content.ShowsDocument
  | Content.UseCasesDocument
  | Content.UseCaseDocument
  | Content.CompetitorDocument
  | Content.LegalHomeDocument
  | Content.UpdatesDocument;

const reviews: Review[] = [
  {
    "@type": "Review",
    author: {
      "@type": "Person",
      name: "Pablo O."
    },
    datePublished: "2023-07-03",
    name: "Gives power to the whole team",
    reviewBody:
      "It maintains the efficiency of the development of the projects, giving the flexibility related to the content and the necessary structure to be able to reuse the components/sections.",
    reviewRating: {
      "@type": "Rating",
      bestRating: "5",
      ratingValue: "5",
      worstRating: "1"
    }
  },
  {
    "@type": "Review",
    author: {
      "@type": "Person",
      name: "Daniel H."
    },
    datePublished: "2023-11-03",
    name: "Easy to use CMS for content writers",
    reviewBody:
      "Building content pages using slices and organising everything into sections and subsections couldn't be simpler for content writers. It really doesn't take long to familiarise yourself with how the CMS works and there's plenty of functionality for creating a variety of page types depending on your main goals. Overall, it's the best CMS I've come across for editors.",
    reviewRating: {
      "@type": "Rating",
      bestRating: "5",
      ratingValue: "4.5",
      worstRating: "1"
    }
  }
];

const createWebSite = (): WebSite => ({
  "@type": "WebSite",
  url: PRISMIC_URL,
  "@id": `${PRISMIC_ID}website`,
  headline: "Prismic: Headless Page Builder - Launch and Iterate Faster",
  description:
    "Prismic is the headless page builder that lets developers and marketers ship and iterate faster, and build sites that just keep getting better.",
  audience: {
    "@type": "Audience",
    name: ["Developers", "Marketers", "Agencies"]
  },
  publisher: {
    "@id": `${PRISMIC_ID}organization`
  },
  mainEntity: {
    "@id": `${PRISMIC_ID}software`
  }
});

const createBlogHomeWebSite = (): WebSite => ({
  "@type": "WebSite",
  "@id": `${PRISMIC_BLOG_ID}website`,
  url: `${PRISMIC_URL}/blog/`,
  name: "Prismic Blog",
  publisher: {
    "@id": `${PRISMIC_URL}/#organization`
  }
});

const createWebPage = (data?: PrismicDocument): WebPage => {
  const title = (data?: PrismicDocument) => {
    switch (data?.type) {
      case "page":
        return data.data.meta_title;
      case "blog_category":
        return asText(data.data.title);
      case "blog_latest":
        return asText(data.data.title);
      case "case_studies":
        return data.data.meta_title;
      case "feature":
        return data.data.meta_title;
      case "blog_guides_home":
        return asText(data.data.title);
      case "blog_guide":
        return asText(data.data.title);
      case "developers":
        return data.data.meta_title;
      case "developer":
        return asText(data.data.name);
      case "legal":
        return data.data.meta_title;
      case "landing_page":
        return data.data.meta_title;
      case "showcase":
        return data.data.meta_title;
      case "shows":
        return asText(data.data.title);
      case "use_cases":
        return data.data.meta_title;
      case "updates":
        return data.data.meta_title;
      case "use_case":
        return asText(data.data.title);
      case "competitor":
        return data.data.meta_title;
      default:
        return "Prismic";
    }
  };

  return {
    "@type": "WebPage",
    "@id": `${PRISMIC_ID}webpage`,
    url: PRISMIC_URL + data?.url,
    headline: title(data) || "Prismic",
    isPartOf: {
      "@id": `${PRISMIC_ID}website`
    }
  };
};

const createBlogHomeWebPage = (page: BlogHomeDocument): CollectionPage => ({
  // schema-dts doesn't support multiple types yet
  // @ts-ignore
  "@type": ["WebPage", "CollectionPage"],
  "@id": `${PRISMIC_BLOG_ID}webpage`,
  url: `${PRISMIC_URL}/blog/`,
  name: "Prismic Blog",
  isPartOf: {
    "@id": "https://prismic.io/blog/#website"
  },
  datePublished: new Date(page.first_publication_date)
    .toISOString()
    .split("T")[0],
  dateModified: new Date(page.last_publication_date)
    .toISOString()
    .split("T")[0],
  ...(isFilled.keyText(page.data.meta_description) && {
    description: page.data.meta_description
  }),
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://prismic.io/"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://prismic.io/blog/"
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Performance and UX",
        item: "https://prismic.io/blog/category/performance-and-ux"
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Tech Stack",
        item: "https://prismic.io/blog/category/tech-stack"
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Developer Workflow",
        item: "https://prismic.io/blog/category/developer-workflow"
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Prismic Announcements",
        item: "https://prismic.io/blog/category/announcements"
      },
      {
        "@type": "ListItem",
        position: 7,
        name: "Business of web development",
        item: "https://prismic.io/blog/category/developer-business"
      }
    ]
  }
});

const createOrganization = (): Organization => ({
  "@type": "Organization",
  "@id": `${PRISMIC_ID}organization`,
  name: "Prismic",
  url: PRISMIC_URL,
  sameAs: [
    "https://twitter.com/prismicio",
    "https://www.linkedin.com/company/prismic-io",
    "https://youtube.com/@Prismic"
  ],
  location: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris, France",
      postalCode: "F-75011",
      streetAddress: "9 Rue de la Pierre Levée"
    }
  },
  founder: {
    "@type": "Person",
    jobTitle: "CEO",
    name: "Sadek Drobi",
    sameAs: [
      "https://fr.linkedin.com/in/drobi",
      "https://x.com/Sadache?s=20",
      "https://www.crunchbase.com/person/sadek-drobi",
      `${PRISMIC_URL}/blog/authors/sadekdrobi`
    ]
  }
});

const createSoftwareApplication = (): SoftwareApplication => ({
  "@type": "SoftwareApplication",
  "@id": `${PRISMIC_ID}software`,
  name: "Prismic Headless Page Builder",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.3,
    reviewCount: 169,
    bestRating: 5,
    worstRating: 1
  },
  review: reviews,
  offers: {
    "@type": "Offer",
    price: "0"
  },
  sameAs: [`${PRISMIC_URL}/slice-machine`, `${PRISMIC_URL}/page-builder`],
  operatingSystem: ["MacOS", "Windows", "Linux"],
  applicationCategory: ["DeveloperApplication", "WebApplication"],
  applicationSubCategory: ["Headless page builder", "Headless CMS"]
});

const createAuthorPerson = (author: AuthorDocumentWithTechnology): Person => {
  return {
    "@type": "Person",
    "@id": `https://prismic.io/blog/authors/${author?.uid}/#author`,
    name: asText(author.data.name),
    ...(isFilled.image(author?.data.image) && {
      image: author?.data.image.url
    }),
    jobTitle: isFilled.keyText(author.data.job_title)
      ? author.data.job_title
      : "Freelance technical writer",
    ...(isFilled.group(author.data.tags) && {
      knowsAbout: author.data.tags.map((item) => {
        const knowsAboutItem = item as {
          tag: {
            data: {
              title: KeyTextField;
              link: LinkField;
            };
          };
        };

        return {
          "@type": "Thing",
          ...(isFilled.keyText(knowsAboutItem.tag.data.title) && {
            name: knowsAboutItem.tag.data.title
          }),
          ...(isFilled.link(knowsAboutItem.tag.data.link) && {
            url: knowsAboutItem.tag.data.link.url
          })
        };
      })
    })
  };
};

const createAuthorWebpage = (author: AuthorDocumentWithTechnology): WebPage => {
  return {
    "@type": "WebPage",
    "@id": `https://prismic.io/blog/authors/${author.uid}/#webpage`,
    url: `https://prismic.io/blog/authors/${author.uid}`,
    mainEntity: {
      "@id": `https://prismic.io/blog/authors/${author.uid}/#author`
    },
    isPartOf: {
      "@id": "https://prismic.io/#website"
    }
  };
};

const createBlogPosting = (
  blog: BlogDocumentWithExtras
): WithContext<BlogPosting> => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://prismic.io${blog?.url}`
    },
    headline: asText(blog?.data.title) || "",
    description:
      blog?.data.meta_description || asText(blog?.data.card_description) || "",
    image: isFilled.image(blog?.data.image) ? blog?.data.image.url : "",
    author: {
      "@type": "Person",
      name: asText(blog?.data.author.data.name) || "",
      url: `https://prismic.io/blog/authors/${blog?.data.author.uid}`
    },
    publisher: createOrganization(),
    datePublished: isFilled.date(blog?.data.date)
      ? new Date(blog?.data.date!).toISOString().split("T")[0]
      : "",
    dateModified: isFilled.date(blog?.data.updated_date)
      ? new Date(blog?.data.updated_date!).toISOString().split("T")[0]
      : "",
    interactionStatistic: [
      {
        "@type": "InteractionCounter",
        interactionType: { "@type": "LikeAction" },
        userInteractionCount: blog.data.vote_total ?? 0
      },
      {
        "@type": "InteractionCounter",
        interactionType: { "@type": "ViewAction" },
        userInteractionCount: blog.data.view_count ?? 0
      },
      {
        "@type": "InteractionCounter",
        interactionType: { "@type": "CommentAction" },
        userInteractionCount: blog.data.comment_count ?? 0
      }
    ]
  };
};

export const jsonSchema = (data?: PrismicDocument) => {
  let schemaObject;

  if (data?.type === "blog_author") {
    schemaObject = {
      "@context": "https://schema.org",
      "@graph": [
        createOrganization(),
        createAuthorPerson(data),
        createAuthorWebpage(data),
        createWebSite()
      ]
    };
  } else if (data?.type === "blog") {
    schemaObject = createBlogPosting(data);
  } else if (data?.type === "blog_home") {
    schemaObject = {
      "@context": "https://schema.org",
      "@graph": [
        createOrganization(),
        createBlogHomeWebSite(),
        createBlogHomeWebPage(data)
      ]
    };
  } else {
    schemaObject = {
      "@context": "http://schema.org",
      "@graph": [
        createWebSite(),
        createWebPage(data),
        createOrganization(),
        createSoftwareApplication()
      ]
    };
  }

  return {
    __html: JSON.stringify(schemaObject)
  };
};
