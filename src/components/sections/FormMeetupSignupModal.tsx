"use client";

import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import ProductMeetup from "@/assets/svg/product-meetup.svg";
import { Copy } from "@/components/modules/Copy";
import { Button } from "@/components/ui/Button";
import { FormTextField } from "@/components/ui/FormTextField";
import { Heading } from "@/components/ui/Heading";
import { Modal } from "@/components/ui/Modal";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { useHubspotErrors } from "@/lib/hooks/useHubspotErrors";

type FormMeetupSignupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const FormMeetupSignup = ({ isOpen, onClose }: FormMeetupSignupProps) => {
  const [hubspotErrors, transformHubspotErrors] = useHubspotErrors();
  const [addToCal, setAddToCal] = useState(false);
  const [email, setEmail] = useState<string>("");
  const hutk = getCookie("hubspotutk");
  const [interacted, setInteracted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { segmentFormEvent } = usePrismicAnalytics();
  const [firstOpened, setFirstOpened] = useState(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

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
        form: "meetup-signup",
        email,
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
    if (isOpen && !firstOpened) {
      segmentFormEvent("Form Viewed", {
        formName: "meetup"
      });
      setFirstOpened(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstOpened, isOpen]);

  useEffect(() => {
    if (!mounted) return setMounted(true);

    if (!interacted) {
      setInteracted(true);
      segmentFormEvent("Form Started", {
        formName: "meetup"
      });
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  useEffect(() => {
    if (data?.success === true && !loading) {
      clearForm();
      setAddToCal(true);
      segmentFormEvent("Form Submitted", {
        formName: "meetup"
      });
    }

    if (data?.status === "error") {
      transformHubspotErrors(data.errors);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.success, loading]);

  const closeModal = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ProductMeetup className="w-44 mx-auto mb-10 h-auto" />
      {addToCal ? (
        <>
          <Heading as="h2" size="xl">
            Thank you for signing up!
          </Heading>
          <Copy muted className="mt-6" theme="light">
            Make sure to never miss an episode by adding the Google Calendar.
          </Copy>
          <nav className="flex float-right gap-4 mt-12">
            <Button
              as="button"
              className="inline-block"
              onClick={closeModal}
              style="secondary"
            >
              Close
            </Button>
            <Button
              className="inline-block"
              as="a"
              href="https://calendar.google.com/calendar/u/1?cid=Y181am03djNvc2tiNjd1NTE3cHJvMGE0dTEwY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t"
            >
              Add to Google Calendar
            </Button>
          </nav>
        </>
      ) : (
        <>
          <Heading as="h2" size="xl">
            Don&apos;t miss any Product Meetups
          </Heading>
          <Copy muted className="mt-6" theme="light">
            Join the Prismic community and stay tuned for the next Product
            Meetup.
          </Copy>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendForm();
            }}
            className="mt-12"
          >
            <FormTextField
              label="Email"
              className="mt-4"
              type="email"
              name="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            {hubspotErrors.length > 0 && (
              <div className="mt-6 rounded-lg bg-quaternary-orange border-2 border-primary-orange py-2 px-3">
                {hubspotErrors.map((err, i) => (
                  <p key={i} className="text-red-500">
                    {err}
                  </p>
                ))}
              </div>
            )}
            <Button
              style="primary"
              as="button"
              type="submit"
              className="mt-8 float-right"
              disabled={loading || !email}
            >
              Next
            </Button>
          </form>
        </>
      )}
    </Modal>
  );
};

export default FormMeetupSignup;
