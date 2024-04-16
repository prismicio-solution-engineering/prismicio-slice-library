"use client";

import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Copy } from "@/components/modules/Copy";
import { Button } from "@/components/ui/Button";
import { FormSelect } from "@/components/ui/FormSelect";
import { FormTextArea } from "@/components/ui/FormTextArea";
import { FormTextField } from "@/components/ui/FormTextField";
import { Heading } from "@/components/ui/Heading";
import { Modal } from "@/components/ui/Modal";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { useFreeEmail } from "@/lib/hooks/useFreeEmail";
import { useHubspotErrors } from "@/lib/hooks/useHubspotErrors";

type FormEnterpriseConsultationProps = {
  isOpen: boolean;
  onClose: () => void;
  initialRequestType?: string;
};

const agencyOptions = [
  { label: "No", value: false },
  { label: "Yes", value: true }
];

const agencyTerritoryOptions = [
  { label: "Europe, the Middle East, Africa or APAC", value: "EMEA & APAC" },
  { label: "North America or South America", value: "NA & LATAM" }
];

const companySizeOptions = [
  { label: "1-10", value: 1 },
  { label: "11-50", value: 11 },
  { label: "50+", value: 50 }
];

const FormEnterpriseConsultation = ({
  isOpen,
  onClose,
  initialRequestType
}: FormEnterpriseConsultationProps) => {
  const [hubspotErrors, transformHubspotErrors] = useHubspotErrors();
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [domain, setDomain] = useState<string>("");
  const [companySize, setCompanySize] = useState<number>(0);
  const [agency, setAgency] = useState<boolean>(false);
  const [agencyTerritory, setAgencyTerritory] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const hutk = getCookie("hubspotutk");
  const [interacted, setInteracted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { segmentFormEvent } = usePrismicAnalytics();
  const [firstOpened, setFirstOpened] = useState(false);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  const isFreeEmail = useFreeEmail();

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
        form: "enterprise-consultation",
        email,
        mobile,
        domain,
        companySize,
        agency,
        message,
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
    setMobile("");
    setDomain("");
    setCompanySize(0);
    setAgency(false);
    setMessage("");
  };

  useEffect(() => {
    if (isOpen && !firstOpened) {
      segmentFormEvent("Form Viewed", {
        formName: "request enterprise"
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
        formName: "request enterprise"
      });
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, mobile, domain, companySize, agency, message]);

  useEffect(() => {
    if (data?.success === true && !loading) {
      clearForm();
      closeModal();
      segmentFormEvent("Form Submitted", {
        formName: "request enterprise"
      });
      segmentFormEvent("Demo Requested");
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
        Request a consultation with a Prismic Enterprise Solution Engineer
      </Heading>
      <Copy className="mt-6" muted theme="light">
        Please leave your contact information and we will get back to you as
        soon as possible.
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
          type="tel"
          label="Mobile phone number"
          placeholder="+"
          className="w-full mt-8"
          value={mobile}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMobile(e.target.value)
          }
        />
        {isFreeEmail(email) && (
          <FormTextField
            type="text"
            label="Website domain *"
            placeholder="example.com"
            className="w-full mt-8"
            required
            value={domain}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDomain(e.target.value)
            }
          />
        )}
        <FormSelect
          theme="light"
          options={companySizeOptions}
          label="Company size *"
          className="mt-4 relative z-30"
          onChange={setCompanySize}
          placeholder={"Select your company size"}
        />
        <FormSelect
          theme="light"
          options={agencyOptions}
          label="I work for an agency"
          className="mt-4 relative z-20"
          onChange={setAgency}
        />
        {agency && (
          <FormSelect
            theme="light"
            options={agencyTerritoryOptions}
            label="Where is your agency based?"
            className="mt-4 relative z-10"
            onChange={setAgencyTerritory}
          />
        )}
        <FormTextArea
          label="Message"
          className="mt-4"
          name="message"
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
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
          disabled={
            loading || !email || (isFreeEmail(email) && !domain) || !companySize
          }
        >
          Send request
        </Button>
      </form>
    </Modal>
  );
};

export default FormEnterpriseConsultation;
