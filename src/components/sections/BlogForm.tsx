"use client";

import clsx from "clsx";
import { getCookie } from "cookies-next";
import { useInView } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import EmailIcon from "@/assets/svg/email.svg";
import Loader from "@/assets/svg/loader.svg";
import { Copy } from "@/components/modules/Copy";
import { Button } from "@/components/ui/Button";
import { FormTextField } from "@/components/ui/FormTextField";
import { Heading } from "@/components/ui/Heading";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { useHubspotErrors } from "@/lib/hooks/useHubspotErrors";
import { isFilled } from "@prismicio/client";
import { PrismicImage } from "@prismicio/react";

import type { ImageField, RichTextField } from "@prismicio/client";

export type BlogFormProps = {
  form: {
    data: {
      hubspot_form_id: string;
      image: ImageField;
      title: RichTextField;
      description: RichTextField;
    };
  };
  style: "row" | "row-container" | "col";
};

export const BlogForm = ({ form, style }: BlogFormProps) => {
  const hubSpotFormId = form.data.hubspot_form_id;
  const [hubspotErrors, transformHubspotErrors] = useHubspotErrors();
  const [email, setEmail] = useState<string>("");
  const hutk = getCookie("hubspotutk");
  const [interacted, setInteracted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { segmentFormEvent } = usePrismicAnalytics();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, {
    once: true,
    amount: 0.5
  });

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
        form: "signup",
        email,
        hubSpotFormId,
        contextObject
      })
    });

    const data = await res.json();

    setData(data);
    setLoading(false);
  };

  const clearForm = () => {
    transformHubspotErrors([]);
    setEmail("");
  };

  useEffect(() => {
    if (!mounted) return setMounted(true);

    if (!interacted) {
      setInteracted(true);
      segmentFormEvent("Form Started", {
        formName: "blog signup"
      });
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    if (data?.success === true && !loading) {
      clearForm();
      segmentFormEvent("Form Submitted", {
        formName: "blog signup"
      });
    }

    if (data?.status === "error") {
      transformHubspotErrors(data.errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.success, loading]);

  useEffect(() => {
    if (isInView) {
      segmentFormEvent("Form Viewed", {
        formName: "blog signup"
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <div
      className={clsx({
        container: style === "row-container"
      })}
    >
      <div
        ref={formRef}
        className={clsx("flex justify-between items-center gap-12 relative", {
          "flex-col": style === "col",
          "p-12 rounded-xl": style !== "col",
          "bg-gray-1F": style === "row-container",
          "border-2 border-gray-EE": style === "row"
        })}
      >
        <div
          className={clsx("flex flex-col light-copy max-w-xl", {
            "order-2": style === "col",
            "light-copy": style === "col" || style === "row-container",
            "dark-copy": style === "row"
          })}
        >
          <div className="text-primary-blue w-12 h-12">
            <EmailIcon />
          </div>
          {isFilled.richText(form.data?.title) && (
            <Heading
              field={form.data?.title}
              size="md"
              className={clsx("mt-6", {
                "sm:max-w-sm": style === "row"
              })}
            />
          )}
          {isFilled.richText(form.data?.description) && (
            <Copy
              field={form.data?.description}
              className="mt-3"
              muted
              theme={style === "row-container" ? "dark" : "light"}
            />
          )}
          <div className="mt-6 text-white">
            <form
              className="flex flex-wrap"
              onSubmit={(e) => {
                e.preventDefault();
                sendForm();
              }}
            >
              <label htmlFor="email" className="sr-only">
                Email Address <span>*</span>
              </label>
              <FormTextField
                type="email"
                name="email"
                id="email"
                theme={style === "row" ? "light" : "dark"}
                placeholder="mail@example.com"
                className={clsx("min-w-[260px] mr-4 mt-4", {
                  "dark-copy": style === "row"
                })}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                value={email}
              />
              <Button
                as="button"
                type="submit"
                name="subscribe"
                theme={style === "row" ? "light" : "dark"}
                className="mt-4"
                disabled={loading || !email}
              >
                {loading ? <Loader /> : "Subscribe"}
              </Button>
            </form>
          </div>
          {hubspotErrors.length > 0 && (
            <div className="font-bold mt-4 text-primary-orange">
              {hubspotErrors.map((err, i) => (
                <p key={i} className="text-red-500">
                  {err}
                </p>
              ))}
            </div>
          )}
          {data?.success === true && (
            <div className="font-bold mt-4 text-primary-green">
              <p>Thanks for subscribing!</p>
            </div>
          )}
        </div>
        <PrismicImage
          field={form.data?.image}
          className={clsx("grow max-w-sm min-w-[300px]", {
            "absolute -top-6 -right-6": style === "row",
            "hidden lg:block": style === "col" || style === "row-container",
            "hidden sm:block": style === "row"
          })}
        />
      </div>
    </div>
  );
};
