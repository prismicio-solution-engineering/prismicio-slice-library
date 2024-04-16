"use client";

import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Copy } from "@/components/modules/Copy";
import { Button } from "@/components/ui/Button";
import { FormTextField } from "@/components/ui/FormTextField";
import { Heading } from "@/components/ui/Heading";
import { Modal } from "@/components/ui/Modal";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { useHubspotErrors } from "@/lib/hooks/useHubspotErrors";

type FormAiRequestProps = {
  isOpen: boolean;
  onClose: () => void;
};

const FormAiRequest = ({ isOpen, onClose }: FormAiRequestProps) => {
  const [hubspotErrors, transformHubspotErrors] = useHubspotErrors();
  const [email, setEmail] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [repository, setRepository] = useState<string>("");
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
        form: "request-ai",
        email,
        domain,
        repository,
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
    setDomain("");
    setRepository("");
  };

  useEffect(() => {
    if (isOpen && !firstOpened) {
      segmentFormEvent("Form Viewed", {
        formName: "request ai"
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
        formName: "request ai"
      });
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, domain, repository]);

  useEffect(() => {
    if (data?.success === true && !loading) {
      clearForm();
      closeModal();
      segmentFormEvent("Form Submitted", {
        formName: "request ai"
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
        Request Access
      </Heading>
      <Copy className="mt-6" muted theme="light">
        Please leave your information and we will enable it for you.
      </Copy>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendForm();
        }}
        className="mt-12"
      >
        <FormTextField
          label="Email *"
          className="mt-4"
          type="email"
          name="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <FormTextField
          label="Company domain *"
          className="mt-4"
          type="text"
          name="domain"
          value={domain}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDomain(e.target.value)
          }
        />
        <FormTextField
          label="Repository name *"
          className="mt-4"
          type="text"
          name="repository"
          value={repository}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRepository(e.target.value)
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
          disabled={loading || !email || !domain || !repository}
        >
          Send request
        </Button>
      </form>
    </Modal>
  );
};

export default FormAiRequest;
