"use client";

import { Copy } from "@/components/modules/Copy";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import {
  isFilled,
  KeyTextField,
  LinkField,
  RichTextField,
  SelectField,
  TitleField
} from "@prismicio/client";

type CaseStudySidebarCtaProps = {
  data: {
    cta_title: TitleField;
    cta_description: RichTextField;
    cta_link: LinkField;
    cta_style: SelectField;
    cta_label: KeyTextField;
    cta_type: SelectField;
  };
};

export const CaseStudySidebarCta = ({ data }: CaseStudySidebarCtaProps) => {
  const { segmentCtaEvent } = usePrismicAnalytics();

  return (
    <div className="bg-gray-F7 p-6 rounded-xl pt-12 sticky top-[120px]">
      <svg
        width="145"
        height="162"
        viewBox="0 0 145 162"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -top-16 right-8 w-16 sm:w-24 lg:w-16 xl:w-24"
      >
        <path
          d="M143.851 100.479L143.853 100.479L143.853 125.272C143.853 133.055 136.904 140.987 122.948 148.999C115.194 153.451 106.101 156.664 96.4128 158.638V139.133C106.095 137.142 115.183 133.905 122.933 129.422C136.762 121.424 143.735 110.962 143.851 100.479Z"
          fill="#B382F2"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M96.4121 139.133C71.2463 144.31 42.0646 141.073 21.9212 129.422C8.09193 121.424 1.11908 110.962 1.00267 100.479L1.00049 100.479V125.272C1.00049 133.055 8.05302 140.987 22.0095 148.999C42.1292 160.55 71.2723 163.763 96.4121 158.638V139.133Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M122.933 129.421C95.0394 145.554 49.8153 145.554 21.922 129.421C-5.97139 113.289 -5.97139 87.1332 21.922 71.0009C49.8153 54.8685 95.0394 54.8685 122.933 71.0009C150.826 87.1332 150.826 113.289 122.933 129.421ZM106.35 119.998C87.6156 130.927 57.2412 130.927 38.5068 119.998C19.7725 109.07 19.7725 91.3514 38.5068 80.4231C57.2412 69.4947 87.6156 69.4947 106.35 80.4231C125.084 91.3514 125.084 109.07 106.35 119.998Z"
          fill="#8E44EC"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M25.3272 105.544C27.0804 100.247 31.4728 95.1882 38.5046 91.0863C57.2389 80.1579 87.6133 80.1579 106.348 91.0863C113.379 95.1882 117.772 100.247 119.525 105.544C122.443 96.7282 118.05 87.2523 106.348 80.4258C87.6133 69.4974 57.2389 69.4974 38.5046 80.4258C26.802 87.2523 22.4096 96.7282 25.3272 105.544Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M25.3272 105.544C27.0803 100.247 31.4728 95.1882 38.5046 91.0863C54.1919 81.9354 78.0407 80.447 96.3828 86.6212V75.9607C78.0407 69.7865 54.1919 71.2749 38.5046 80.4258C26.802 87.2523 22.4096 96.7282 25.3272 105.544Z"
          fill="#B382F2"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M106.351 79.7117C87.6165 90.5469 57.2421 90.5469 38.5078 79.7117C29.1452 74.2968 24.4616 67.2005 24.457 60.1034V83.8772C24.457 89.1043 29.1938 94.4317 38.5676 99.8132C57.2882 110.561 87.6404 110.561 106.361 99.8132C115.735 94.4317 120.402 89.1043 120.402 83.8772L120.402 60.0654C120.414 67.1752 115.73 74.2872 106.351 79.7117Z"
          fill="#F39A68"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M88.5419 86.234C71.6397 89.7104 52.0405 87.5363 38.5115 79.7118C29.1323 74.2872 24.4487 67.1752 24.4608 60.0654L24.4595 60.0654V83.8772C24.4595 89.1043 29.1963 94.4317 38.57 99.8132C52.0832 107.571 71.657 109.729 88.5419 106.287V86.234Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M106.35 79.5883C87.6155 90.5167 57.2412 90.5167 38.5068 79.5883C19.7725 68.6599 19.7725 50.9415 38.5068 40.0132C57.2412 29.0848 87.6155 29.0848 106.35 40.0132C125.084 50.9415 125.084 68.6599 106.35 79.5883ZM89.3893 69.7889C80.0222 75.3051 64.835 75.3051 55.4678 69.7889C46.1006 64.2727 46.1006 55.3291 55.4678 49.8129C64.835 44.2967 80.0222 44.2967 89.3893 49.8129C98.7565 55.3291 98.7565 64.2727 89.3893 69.7889Z"
          fill="#ED6B22"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M50.2089 65.131C51.3798 63.4362 53.1327 61.8482 55.4676 60.4732C64.8348 54.957 80.022 54.957 89.3892 60.4732C91.7241 61.8482 93.477 63.4362 94.6479 65.131C98.1743 60.0268 96.4214 53.9539 89.3892 49.8127C80.022 44.2965 64.8348 44.2965 55.4676 49.8127C48.4354 53.9539 46.6825 60.0268 50.2089 65.131Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M50.209 65.131C51.3799 63.4362 53.1328 61.8482 55.4677 60.4732C60.1513 57.7151 66.2899 56.336 72.4285 56.336V45.6755C66.2899 45.6755 60.1513 47.0546 55.4677 49.8127C48.4355 53.9539 46.6825 60.0268 50.209 65.131Z"
          fill="#F39A68"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M89.3891 24.834C80.0219 30.2516 64.8347 30.2516 55.4676 24.834C50.778 22.1218 48.4362 18.5658 48.4422 15.011L48.4421 37.1892C48.4421 39.8027 50.8105 42.4664 55.4974 45.1572C64.8577 50.5309 80.0338 50.5309 89.3942 45.1572C94.0811 42.4664 96.4144 39.8027 96.4144 37.1892L96.4144 15.0483C96.4041 18.5907 94.0623 22.1313 89.3891 24.834Z"
          fill="#75DCC0"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M80.4833 28.0955C72.0322 29.8337 62.2327 28.7466 55.4683 24.8344C50.7786 22.1221 48.4368 18.5661 48.4429 15.0112L48.4421 15.0112V37.1894C48.4421 39.803 50.8105 42.4667 55.4974 45.1574C62.254 49.0364 72.0409 50.1154 80.4833 48.3944V28.0955Z"
          fill="#151515"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M55.4674 25.1137C64.8346 30.6299 80.0218 30.6299 89.3889 25.1137C98.7561 19.5975 98.7561 10.6539 89.3889 5.13766C80.0218 -0.378568 64.8346 -0.378568 55.4674 5.13766C46.1002 10.6539 46.1002 19.5975 55.4674 25.1137Z"
          fill="#3BBB96"
          stroke="#151515"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>

      <Heading field={data.cta_title} size="md" className="max-w-[240px]" />
      <Copy
        size="sm"
        field={data.cta_description}
        muted
        className="mt-2 max-w-[280px]"
        theme="light"
      />
      <Button
        field={data.cta_link}
        className="mt-6 inline-block"
        size="md"
        variant={data.cta_style}
        onClick={() => {
          segmentCtaEvent("CTA Clicked", {
            ctaType: `${data.cta_style?.replace("link", "tertiary")} ${
              data.cta_type
            }`,
            ctaPosition: "Case study sidebar",
            ctaText: data.cta_label ? data.cta_label : "",
            ctaUrl: isFilled.link(data.cta_link) ? data.cta_link.url : ""
          });
        }}
      >
        {data.cta_label}
      </Button>
    </div>
  );
};
