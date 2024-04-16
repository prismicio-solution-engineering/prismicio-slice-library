"use client";

import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Copy } from "@/components/modules/Copy";
import { Button } from "@/components/ui/Button";
import { FormSelect } from "@/components/ui/FormSelect";
import { FormTextField } from "@/components/ui/FormTextField";
import { Heading } from "@/components/ui/Heading";
import { Modal } from "@/components/ui/Modal";
import { usePrismicAnalytics } from "@/lib/context/analytics";
import { useHubspotErrors } from "@/lib/hooks/useHubspotErrors";

type FormGetListedProps = {
  isOpen: boolean;
  onClose: () => void;
  initialRequestType?: string;
};

const prismicOptions = [
  { label: "No", value: false },
  { label: "Yes", value: true }
];

const typeOptions = [
  { label: "Agency", value: "agency" },
  { label: "Freelancer", value: "freelancer" }
];
const FormGetListed = ({ isOpen, onClose }: FormGetListedProps) => {
  const [hubspotErrors, transformHubspotErrors] = useHubspotErrors();
  const [email, setEmail] = useState<string>("");
  const [prismicProject, setPrismicProject] = useState<null | boolean>(null);
  const [type, setType] = useState(false);
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
        form: "get-listed",
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
    setPrismicProject(null);
    setType(false);
  };

  useEffect(() => {
    if (isOpen && !firstOpened) {
      segmentFormEvent("Form Viewed", {
        formName: "get listed"
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
        formName: "get listed"
      });
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prismicProject]);

  useEffect(() => {
    if (data?.success === true && !loading) {
      clearForm();
      closeModal();
      segmentFormEvent("Form Submitted", {
        formName: "get listed"
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
        Get listed as an agency or freelancer in our catalog
      </Heading>
      <Copy className="mt-6" muted theme="light">
        We are looking for talented developers to join our community. If you
        have experience with Prismic and want to be listed on our Hire a
        developer page, please fill out the form below.
      </Copy>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendForm();
        }}
        className="mt-12"
      >
        <FormSelect
          theme="light"
          options={prismicOptions}
          label="Did you already build one or more projects with Prismic?"
          onChange={setPrismicProject}
          className="relative z-20"
          placeholder="Please select"
        />
        {prismicProject === null && (
          <p className="mt-6 text-base lg:text-md font-medium">
            First, we would like to know if you have previous experience in
            building real world projects with Prismic. Please provide your
            answer above.
          </p>
        )}
        {prismicProject === false && (
          <p className="mt-6 text-base lg:text-md font-medium">
            Sorry we won’t be able to list you on this page yet. Please reach
            out to us again, in a few weeks, when your first Prismic project is
            live.
          </p>
        )}
        {prismicProject && (
          <>
            <p className="mt-6 text-base lg:text-md font-medium">
              Awesome. Just fill out the details below and our team will reach
              out soon to know more about your work. Looking forward to meeting
              you!
            </p>
            <FormSelect
              theme="light"
              options={typeOptions}
              label="Are your an Agency or a Freelancer?"
              onChange={setType}
              className="relative z-10 mt-16"
              placeholder="Please select"
            />
          </>
        )}
        {type && prismicProject && (
          <FormTextField
            label="Email"
            type="email"
            placeholder="mail@example.com"
            className="mt-6"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
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
          disabled={loading || !email || !prismicProject || !type}
        >
          Send request
        </Button>
      </form>
    </Modal>
  );
};

export default FormGetListed;
