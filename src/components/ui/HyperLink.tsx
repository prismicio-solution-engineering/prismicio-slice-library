"use client";

import { usePrismicAnalytics } from '@/lib/context/analytics';
import { isLinkToWebField } from '@/lib/utils/linkFieldTypeChecker';
import { PrismicNextLink } from '@prismicio/next';

const checkUrl = (url: string) => {
  const parsedUrl = new URL(url);
  const params = new URLSearchParams(parsedUrl.search);

  const ctaUrls = [
    "https://prismic.io/dashboard/signup",
    "https://prismic.io/try",
    "https://prismic.io/demo"
  ];

  if (ctaUrls.includes(url)) {
    return true;
  }

  if (params.has("cta") && params.get("cta") === "true") {
    return true;
  }

  return false;
};

// remove cta param from url
const removeCtaParam = (url: string) => {
  if (url.includes("?cta=true&")) {
    return url.replace("?cta=true", "&");
  }

  if (url.includes("?cta=true")) {
    return url.replace("?cta=true", "");
  }

  if (url.includes("&cta=true")) {
    return url.replace("&cta=true", "");
  }

  return url;
};

type HyperLinkProps = {
  props: any;
  position: string;
};

export const HyperLink = ({ props, position }: HyperLinkProps) => {
  const { segmentCtaEvent } = usePrismicAnalytics();

  const target = isLinkToWebField(props.node.data)
    ? props.node.data.target
    : "";

  const rel = isLinkToWebField(props.node.data)
    ? props.node.data.target === "_blank"
      ? "noopener"
      : ""
    : "";

  const url = isLinkToWebField(props.node.data)
    ? removeCtaParam(props.node.data.url)
    : undefined;

  return (
    <PrismicNextLink
      href={url || props.node.data.url}
      {...(target && { target })}
      {...(rel && { rel })}
      className="text-primary-purple hover:text-secondary-purple underline underline-offset-4"
      onClick={() => {
        if (checkUrl(props.node.data.url)) {
          segmentCtaEvent("CTA Clicked", {
            ctaType: "tertiary link",
            ctaPosition: position,
            ctaText: props.node.text,
            ctaUrl: url
          });
        }
      }}
    >
      {props.children}
    </PrismicNextLink>
  );
};
