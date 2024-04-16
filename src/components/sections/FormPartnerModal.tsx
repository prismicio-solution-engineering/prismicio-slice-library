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

type FormPartnerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const agencyOptions = [
  { label: "Yes", value: true },
  { label: "No", value: false }
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

const buildingWithPrismicOptions = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" }
];

const FormPartner = ({ isOpen, onClose }: FormPartnerProps) => {
  const [hubspotErrors, transformHubspotErrors] = useHubspotErrors();
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [companySize, setCompanySize] = useState<number>(0);
  const [agency, setAgency] = useState<boolean>(true);
  const [agencyTerritory, setAgencyTerritory] = useState<string>("");
  const [buildingWithPrismic, setBuildingWithPrismic] = useState<string>("");
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
        form: "partner",
        email,
        mobile,
        website,
        companySize,
        agency,
        agencyTerritory,
        buildingWithPrismic,
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
    setWebsite("");
    setCompanySize(0);
    setAgency(true);
    setBuildingWithPrismic("");
  };

  useEffect(() => {
    if (isOpen && !firstOpened) {
      segmentFormEvent("Form Viewed", {
        formName: "become a partner"
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
        formName: "become a partner"
      });
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, mobile, website, companySize, agency, buildingWithPrismic]);

  useEffect(() => {
    if (data?.success === true && !loading) {
      clearForm();
      closeModal();
      segmentFormEvent("Form Submitted", {
        formName: "become a partner"
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
        Become a partner
      </Heading>
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
          className="w-full mt-4"
          value={mobile}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMobile(e.target.value)
          }
        />
        <FormTextField
          label="Website URL *"
          className="mt-4"
          name="website"
          value={website}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWebsite(e.target.value)
          }
        />
        <FormSelect
          theme="light"
          options={companySizeOptions}
          label="Number of Employees *"
          onChange={setCompanySize}
          className="relative z-40 mt-4"
          placeholder="Please select"
        />
        <FormSelect
          theme="light"
          options={agencyOptions}
          label="I work for an agency"
          className="mt-4 relative z-30"
          onChange={setAgency}
        />
        {agency && (
          <FormSelect
            theme="light"
            options={agencyTerritoryOptions}
            label="Where is your agency based? *"
            className="mt-4 relative z-20"
            onChange={setAgencyTerritory}
            placeholder="Please select"
          />
        )}
        <FormSelect
          theme="light"
          options={buildingWithPrismicOptions}
          label="Are you currently building with Prismic? *"
          onChange={setBuildingWithPrismic}
          className="relative z-10 mt-4"
          placeholder="Please select"
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
            loading ||
            !email ||
            !website ||
            !companySize ||
            !buildingWithPrismic ||
            (agency && !agencyTerritory)
          }
        >
          Send request
        </Button>
      </form>
    </Modal>
  );
};

export default FormPartner;
