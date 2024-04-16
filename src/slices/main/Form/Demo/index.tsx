"use client";

import clsx from "clsx";
import { getCookie } from "cookies-next";
import { useInView } from "framer-motion";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";

import { SliceLayout } from "@/components/layout/SliceLayout";
import { Copy } from "@/components/modules/Copy";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FormSelect } from "@/components/ui/FormSelect";
import { FormTextField } from "@/components/ui/FormTextField";
import { Heading } from "@/components/ui/Heading";
import { Modal } from "@/components/ui/Modal";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { useFreeEmail } from "@/lib/hooks/useFreeEmail";
import { useHubspotErrors } from "@/lib/hooks/useHubspotErrors";
import { Content, isFilled } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

declare var intellimize: any;

type FormDemoProps = {
  slice: Content.MainFormSliceDemo;
  theme: SliceZoneContext["theme"];
};

type FirstScreenProps = {
  theme: SliceZoneContext["theme"];
  slice: Content.MainFormSliceDemo;
  hubspotErrors: string[];
  email: string;
  mobile: string;
  domain: string;
  companySize: number | null;
  onEmailChange: (email: string) => void;
  onMobileChange: (mobile: string) => void;
  onDomainChange: (domain: string) => void;
  onCompanySizeChange: (companySize: number) => void;
  agency: boolean;
  onAgencyChange: (agency: boolean) => void;
  agencyTerritory: string;
  onAgencyTerritoryChange: (agencyTerritory: string) => void;
  loading: boolean;
};

type SmallScreenProps = {
  theme: SliceZoneContext["theme"];
  hubspotErrors: string[];
  email: string;
  onDemoProjectChange: (demoProject: boolean) => void;
  loading: boolean;
};

type LargeScreenProps = {
  theme: SliceZoneContext["theme"];
  email: string;
  agency: boolean;
  agencyTerritory: string;
};

type ThanksScreenProps = {
  theme: SliceZoneContext["theme"];
};

const PopupVideo = ({ item }: { item: any }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <button
        className="flex flex-col sm:flex-row lg:flex-col gap-x-6 gap-y-2 sm:items-center"
        onClick={() => setModalOpen(true)}
        type="button"
      >
        <div className="sm:w-1/2 lg:w-full">
          <img
            className="rounded-md"
            src={`https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg`}
            alt={item.title}
          />
        </div>
        <div className="sm:w-1/2 lg:w-full flex items-start gap-4 sm:flex-col">
          <h3 className="text-base lg:text-md 2xl:text-xl font-medium text-left max-w-sm">
            {item.preTitle}
          </h3>
          {/* with a small CTA to try editing a page  */}
        </div>
      </button>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type="youtube"
      >
        <YouTubeEmbed videoId={item.id} instantVideo />
      </Modal>
    </div>
  );
};

const FirstScreen = ({
  theme,
  hubspotErrors,
  email,
  mobile,
  domain,
  companySize,
  onEmailChange,
  onMobileChange,
  onDomainChange,
  onCompanySizeChange,
  agency,
  onAgencyChange,
  onAgencyTerritoryChange,
  loading
}: FirstScreenProps) => {
  const companySizeOptions = [
    { label: "1-10", value: 1 },
    { label: "11-50", value: 11 },
    { label: "50+", value: 50 }
  ];

  const agencyOptions = [
    { label: "No", value: false },
    { label: "Yes", value: true }
  ];

  const agencyTerritoryOptions = [
    { label: "Europe, the Middle East, Africa or APAC", value: "EMEA & APAC" },
    { label: "North America or South America", value: "NA & LATAM" }
  ];

  const isFreeEmail = useFreeEmail();

  return (
    <div>
      <div
        className={clsx("flex flex-col rounded-2xl p-8 lg:p-14", {
          "bg-gray-F7": theme === "light",
          "bg-gray-1F": theme === "dark"
        })}
      >
        <Copy muted theme={theme} className="mb-8">
          Please share a few details with us so that we can take you to the demo
          that’s right for you.
        </Copy>
        <FormTextField
          type="email"
          label="Work email (required)"
          placeholder="mail@example.com"
          className="w-full"
          name="email"
          autoComplete="email"
          required
          value={email}
          theme={theme}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onEmailChange(e.target.value)
          }
        />
        {isFreeEmail(email) && (
          <>
            <FormTextField
              type="text"
              label="Website URL (required)"
              placeholder="example.com"
              className="w-full mt-4"
              required
              value={domain}
              theme={theme}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onDomainChange(e.target.value)
              }
            />
            <Copy muted size="sm" className="mt-2" theme={theme}>
              Looks like you're using a personal email. To continue, please
              enter your website URL"
            </Copy>
          </>
        )}
        <FormSelect
          options={companySizeOptions}
          label="Company size (required)"
          onChange={onCompanySizeChange}
          theme={theme}
          className="mt-4 relative z-30"
          placeholder="Select your company size"
        />
        <FormSelect
          options={agencyOptions}
          label="I work for an agency (required)"
          onChange={onAgencyChange}
          theme={theme}
          className="mt-4 relative z-20"
        />
        {agency && (
          <FormSelect
            options={agencyTerritoryOptions}
            label="Where is your agency based? (required)"
            onChange={onAgencyTerritoryChange}
            theme={theme}
            className="mt-4 relative z-10"
          />
        )}
        <FormTextField
          type="tel"
          label="Mobile phone number (optional)"
          placeholder="+"
          className="w-full mt-4"
          value={mobile}
          theme={theme}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onMobileChange(e.target.value)
          }
        />
        {hubspotErrors.length > 0 && (
          <div
            className={clsx(
              "mt-6 rounded-lg bg-quaternary-orange border-2 border-primary-orange py-2 px-3",
              {
                "text-gray-15": theme === "dark"
              }
            )}
          >
            {hubspotErrors.map((err, i) => (
              <p key={i} className="text-red-500">
                {err}
              </p>
            ))}
          </div>
        )}
        <div className="flex justify-end mt-6">
          <Button
            as="button"
            theme={theme}
            type="submit"
            disabled={
              loading ||
              !email ||
              !companySize ||
              (!domain && isFreeEmail(email))
            }
          >
            Send request
          </Button>
        </div>
      </div>
    </div>
  );
};

const SmallScreen = ({
  theme,
  hubspotErrors,
  onDemoProjectChange
}: SmallScreenProps) => {
  const { segmentCtaEvent } = usePrismicAnalytics();

  const videos = [
    {
      href: "https://www.youtube.com/watch?v=U7rOe5SGe58",
      image: "https://img.youtube.com/vi/U7rOe5SGe58/0.jpg",
      preTitle: "How do I build a website with Prismic?",
      title: "Slice Machine Demo",
      id: "U7rOe5SGe58"
    },
    {
      href: "https://www.youtube.com/watch?v=yChjqbQOyRM",
      image: "https://img.youtube.com/vi/yChjqbQOyRM/0.jpg",
      preTitle: "How do I create pages with Prismic?",
      title: "Page Builder Demo",
      id: "yChjqbQOyRM"
    },
    {
      href: "https://www.youtube.com/watch?v=xfHlwBv7BSA",
      image: "https://img.youtube.com/vi/xfHlwBv7BSA/0.jpg",
      preTitle: "What is a headless page builder?",
      title: "Headless CMS Explained",
      id: "xfHlwBv7BSA"
    }
  ];

  useEffect(() => {
    onDemoProjectChange(true);
  }, []);

  return (
    <div>
      <div
        className={clsx(
          "flex flex-col rounded-2xl overflow-hidden p-8 lg:p-14",
          {
            "bg-gray-F7": theme === "light",
            "bg-gray-1F": theme === "dark"
          }
        )}
      >
        <Heading className="mb-4" size="lg" as="h2">
          Prismic Demo
        </Heading>
        <Copy muted theme={theme}>
          Prismic is free to start for individual users. You can start your
          project in minutes. Watch these quick intro videos to learn how
          Prismic works.
        </Copy>
        <div className="flex flex-col gap-4 mt-8">
          <div className="flex flex-col lg:flex-row gap-y-6 sm:gap-y-3 md:gap-y-6 lg:gap-y-3 lg:gap-x-6 w-full">
            {videos.map((item, i) => {
              return <PopupVideo key={i} item={item} />;
            })}
          </div>

          <div className="mt-12 text-center bg-gray-30 -mx-8 -mb-8 lg:-mx-14 lg:-mb-14 py-12">
            <Heading size="lg" as="h2">
              Take Prismic for a spin
            </Heading>
            <div className="flex items-center flex-wrap gap-4 justify-center mt-6">
              <Button
                as="a"
                href="https://prismic.io/dashboard/signup"
                theme="dark"
                onClick={() => {
                  segmentCtaEvent("CTA Clicked", {
                    ctaType: "primary link",
                    ctaPosition: "demo form",
                    ctaText: "Get started"
                  });
                }}
              >
                Get started
              </Button>
              <Button
                as="a"
                href="https://prismic.io/try"
                theme="dark"
                style="secondary"
                onClick={() => {
                  segmentCtaEvent("CTA Clicked", {
                    ctaType: "secondary link",
                    ctaPosition: "demo form",
                    ctaText: "Try editing a page with Prismic"
                  });
                }}
              >
                Try editing a page with Prismic
              </Button>
            </div>
          </div>
        </div>
        {hubspotErrors.length > 0 && (
          <div
            className={clsx(
              "mt-6 rounded-lg bg-quaternary-orange border-2 border-primary-orange py-2 px-3",
              {
                "text-gray-15": theme === "dark"
              }
            )}
          >
            {hubspotErrors.map((err, i) => (
              <p key={i} className="text-red-500">
                {err}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const LargeScreen = ({
  theme,
  email,
  agency,
  agencyTerritory
}: LargeScreenProps) => {
  return (
    <div>
      <div
        className={clsx("flex flex-col rounded-2xl p-8 lg:p-14", {
          "bg-gray-F7": theme === "light",
          "bg-gray-1F": theme === "dark"
        })}
      >
        <div className="flex flex-col gap-4">
          <Heading className="mb-4" size="lg" as="h2">
            Great — you're almost there!
          </Heading>
          <Copy muted className="max-w-lg" theme={theme}>
            Let’s find a time to meet. Select a time below to book your
            personalized demo.
          </Copy>
          <div
            className="meetings-iframe-container"
            data-src={
              agency
                ? agencyTerritory === "NA & LATAM"
                  ? `https://meetings.hubspot.com/charles-parry?embed=true&email=${email}`
                  : `https://meetings.hubspot.com/noor-simreekheea?embed=true&email=${email}`
                : `https://meetings.hubspot.com/andrea-peralta/sdr?embed=true&email=${email}`
            }
          ></div>
          <Script
            type="text/javascript"
            src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
          />
        </div>
      </div>
    </div>
  );
};

const ThanksScreen = ({ theme }: ThanksScreenProps) => {
  return (
    <div>
      <div
        className={clsx("flex flex-col rounded-2xl p-8 lg:p-14", {
          "bg-gray-F7 dark-copy": theme === "light",
          "bg-gray-1F light-copy": theme === "dark"
        })}
      >
        <div className="flex flex-col gap-4">
          <Heading size="lg" as="h2">
            Your demo project is on&nbsp;its&nbsp;way!
          </Heading>
          <Copy muted theme={theme}>
            We will reach out soon to give you access to the demo project you
            requested.
          </Copy>
        </div>
      </div>
    </div>
  );
};

const FormDemo = ({ slice, theme }: FormDemoProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";
  const [screen, setScreen] = useState("DEFAULT");
  const [hubspotErrors, transformHubspotErrors] = useHubspotErrors();
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [agency, setAgency] = useState<boolean>(false);
  const [agencyTerritory, setAgencyTerritory] = useState<string>("");
  const [companySize, setCompanySize] = useState<null | number>(null);
  const [demoProject, setDemoProject] = useState<null | boolean>(null);
  const hutk = getCookie("hubspotutk");
  const [interacted, setInteracted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { segmentFormEvent } = usePrismicAnalytics();
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(formRef);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const hideOtherSlices = () => {
    const formSlice = document.querySelector(".form-slice");
    const otherSlices =
      formSlice?.parentElement?.querySelectorAll(":scope > section");

    if (otherSlices) {
      otherSlices.forEach((slice) => {
        slice === formSlice ? null : slice.classList.add("hidden");
      });
    }
  };

  let contextObject: {
    hutk: string | null | undefined | boolean;
    pageUri: string;
  } = {
    hutk: hutk,
    pageUri: usePathname() || ""
  };

  const sendForm = async () => {
    setLoading(true);

    const res = await fetch("/api/hubspot", {
      method: "POST",
      body: JSON.stringify({
        form: "demo",
        email,
        mobile,
        domain,
        agency,
        agencyTerritory,
        companySize,
        demoProject,
        contextObject
      })
    });

    const data = await res.json();

    setData(data);
    setLoading(false);
  };

  const clearForm = () => {
    transformHubspotErrors([]);
  };

  useEffect(() => {
    if (isInView && !formSubmitted) {
      segmentFormEvent("Form Viewed", {
        formName: "book a demo"
      });
    }
  }, [isInView]);

  useEffect(() => {
    if (!mounted) return setMounted(true);

    if (!interacted) {
      setInteracted(true);
      segmentFormEvent("Form Started", {
        formName: "book a demo"
      });
    } else {
      return;
    }
  }, [email, mobile, domain, companySize, agency]);

  useEffect(() => {
    if (data?.success === true && !loading) {
      clearForm();

      if (email !== "test@test.com") {
        if (!formSubmitted) {
          segmentFormEvent("Form Submitted", {
            formName: "book a demo"
          });
          segmentFormEvent("Demo Requested");

          if (typeof intellimize !== "undefined") {
            intellimize.ready(function () {
              intellimize.sendEvent("demoFormSubmit");
            });
          }
        }
        setFormSubmitted(true);
      }

      switch (screen) {
        case "DEFAULT":
          hideOtherSlices();
          if (!agency) {
            if (companySize === 1 || companySize === 11) {
              setScreen("SMALL");
            } else {
              setScreen("LARGE");
            }
          } else {
            if (companySize === 50 || companySize === 11) {
              setScreen("LARGE");
            } else {
              setScreen("SMALL");
            }
          }
          break;
        case "SMALL":
          hideOtherSlices();
          setScreen("THANKS");
          break;
        default:
          break;
      }
    }

    if (data?.status === "error") {
      transformHubspotErrors(data.errors);
    }
  }, [data?.success, loading]);

  return (
    <SliceLayout theme={theme} sliceTheme={themeFromSlice}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendForm();
        }}
        ref={formRef}
        className="container flex flex-col md:flex-row gap-12 justify-center"
      >
        <div
          className={clsx("order-2", {
            "md:w-1/2": screen !== "SMALL",
            "w-full lg:w-2/3": screen === "SMALL"
          })}
        >
          {screen === "DEFAULT" && (
            <FirstScreen
              theme={theme}
              hubspotErrors={hubspotErrors}
              email={email}
              onEmailChange={setEmail}
              mobile={mobile}
              onMobileChange={setMobile}
              domain={domain}
              onDomainChange={setDomain}
              companySize={companySize}
              onCompanySizeChange={setCompanySize}
              agency={agency}
              onAgencyChange={setAgency}
              agencyTerritory={agencyTerritory}
              onAgencyTerritoryChange={setAgencyTerritory}
              loading={loading}
              slice={slice}
            />
          )}
          {screen === "SMALL" && (
            <SmallScreen
              theme={theme}
              hubspotErrors={hubspotErrors}
              email={email}
              onDemoProjectChange={setDemoProject}
              loading={loading}
            />
          )}
          {screen === "LARGE" && (
            <LargeScreen
              theme={theme}
              email={email}
              agency={agency}
              agencyTerritory={agencyTerritory}
            />
          )}
          {screen === "THANKS" && <ThanksScreen theme={theme} />}
        </div>
        <div
          className={clsx("md:w-1/2 order-1 lg:pr-12", {
            hidden: screen !== "DEFAULT"
          })}
        >
          {isFilled.keyText(slice.primary.eyebrow) && (
            <Eyebrow
              text={slice.primary.eyebrow}
              color={slice.primary.eyebrow_color}
            />
          )}
          <Heading size="2xl" field={slice.primary.heading} />
          <Copy
            size="lg"
            className="mt-6"
            field={slice.primary.subheading}
            muted
            theme={theme}
          />
          <Heading
            size="md"
            className="mt-12"
            field={slice.primary.logo_heading}
          />
          <div className="flex flex-wrap justify-start items-center gap-y-6 gap-x-6 mt-8">
            {slice.items.map(
              (item, index) =>
                isFilled.image(item.logo) && (
                  <div
                    key={index}
                    className="h-8 flex items-center justify-center max-w-[100px]"
                  >
                    <SVG src={item.logo.url} className="w-full h-auto" />
                  </div>
                )
            )}
          </div>
        </div>
      </form>
    </SliceLayout>
  );
};

export default FormDemo;
