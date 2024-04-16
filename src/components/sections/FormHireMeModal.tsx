"use client";

import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Copy } from "@/components/modules/Copy";
import { Button } from "@/components/ui/Button";
import { FormTextArea } from "@/components/ui/FormTextArea";
import { FormTextField } from "@/components/ui/FormTextField";
import { Heading } from "@/components/ui/Heading";
import { Modal } from "@/components/ui/Modal";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { useHubspotErrors } from "@/lib/hooks/useHubspotErrors";
import { asText, RichTextField } from "@prismicio/client";

type FormHireMeProps = {
  isOpen: boolean;
  onClose: () => void;
  developerEmail?: string | null;
  developerName?: RichTextField;
};

const FormHireMe = ({
  isOpen,
  onClose,
  developerEmail,
  developerName
}: FormHireMeProps) => {
  const [hubspotErrors, transformHubspotErrors] = useHubspotErrors();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
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

  const heading = developerName
    ? `Hire ${asText(developerName)} for your next Prismic project`
    : "Not sure who to hire?";

  const description = developerName
    ? ``
    : "Contact us and we’ll help you find the right partner for your business.";

  const sendForm = async () => {
    setLoading(true);

    const res = await fetch("/api/hubspot", {
      method: "POST",
      body: JSON.stringify({
        form: "hire-me",
        firstName,
        lastName,
        email,
        details,
        startDate,
        developerEmail: developerEmail ? developerEmail : "partners@prismic.io",
        contextObject
      })
    });

    const data = await res.json();

    setData(data);
    setLoading(false);
  };

  const clearForm = () => {
    transformHubspotErrors([]);
    setFirstName("");
    setLastName("");
    setEmail("");
    setDetails("");
    setStartDate("");
  };

  useEffect(() => {
    if (isOpen && !firstOpened) {
      segmentFormEvent("Form Viewed", {
        formName: "hire a developer"
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
        formName: "hire a developer"
      });
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, email, details, startDate]);

  useEffect(() => {
    if (data?.success === true && !loading) {
      clearForm();
      closeModal();
      segmentFormEvent("Form Submitted", {
        formName: "hire a developer"
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
      <Heading as="h2" size="xl" className="pr-8">
        {heading}
      </Heading>
      <Copy className="mt-6" muted theme="light">
        {description}
      </Copy>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendForm();
        }}
        className="mt-12"
      >
        <div className="flex flex-col md:gap-6 md:flex-row">
          <FormTextField
            label="First name (optional)"
            className="w-full"
            name="firstname"
            value={firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFirstName(e.target.value)
            }
          />
          <FormTextField
            label="Last name (optional)"
            className="mt-4 md:mt-0 w-full"
            name="lastname"
            value={lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLastName(e.target.value)
            }
          />
        </div>
        <FormTextField
          label="Email (required)"
          className="mt-4"
          type="email"
          name="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <FormTextArea
          label="Project description (required)"
          className="mt-4"
          name="details"
          value={details}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDetails(e.target.value)
          }
        />
        <FormTextField
          label="Estimated project start date (required)"
          className="mt-4"
          type="date"
          name="start_date"
          value={startDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStartDate(e.target.value)
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
          disabled={loading || !email || !details || !startDate}
        >
          Send request
        </Button>
      </form>
    </Modal>
  );
};

export default FormHireMe;
