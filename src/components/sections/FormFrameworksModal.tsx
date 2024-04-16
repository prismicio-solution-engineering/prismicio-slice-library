"use client";

import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { FormSelect } from "@/components/ui/FormSelect";
import { FormTextField } from "@/components/ui/FormTextField";
import { Heading } from "@/components/ui/Heading";
import { Modal } from "@/components/ui/Modal";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { useHubspotErrors } from "@/lib/hooks/useHubspotErrors";

type FormFrameworksProps = {
  isOpen: boolean;
  onClose: () => void;
};

const frameWorkOptions = [
  { label: "Gatsby", value: "Gatsby" },
  { label: "Remix", value: "Remix" },
  { label: "Astro", value: "Astro" },
  { label: "Other", value: "Other" }
];

const FormFrameworks = ({ isOpen, onClose }: FormFrameworksProps) => {
  const [hubspotErrors, transformHubspotErrors] = useHubspotErrors();
  const [email, setEmail] = useState<string>("");
  const [framework, setFramework] = useState<string>("");
  const [frameworkOther, setFrameworkOther] = useState<string>("");
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
        form: "frameworks",
        email,
        framework,
        frameworkOther,
        contextObject
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();

    setData(data);
    setLoading(false);
  };

  const clearForm = () => {
    transformHubspotErrors([]);
    setEmail("");
    setFramework("");
    setFrameworkOther("");
  };

  useEffect(() => {
    if (isOpen && !firstOpened) {
      segmentFormEvent("Form Viewed", {
        formName: "request frameworks"
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
        formName: "request frameworks"
      });
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, framework, frameworkOther]);

  useEffect(() => {
    if (data?.success === true && !loading) {
      clearForm();
      closeModal();
      segmentFormEvent("Form Submitted", {
        formName: "request frameworks"
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
        Notify me about frameworks
      </Heading>
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
        <FormSelect
          theme="light"
          options={frameWorkOptions}
          label="Framework"
          onChange={setFramework}
          className="relative z-10 mt-4"
          placeholder="Please select a framework"
        />
        {framework === "Other" && (
          <FormTextField
            label="Please specify which framework"
            className="mt-4"
            type="text"
            name="jobtitle"
            value={frameworkOther}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFrameworkOther(e.target.value)
            }
          />
        )}
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
          disabled={
            loading ||
            !email ||
            !framework ||
            (framework === "Other" && !frameworkOther)
          }
        >
          Send request
        </Button>
      </form>
    </Modal>
  );
};

export default FormFrameworks;
