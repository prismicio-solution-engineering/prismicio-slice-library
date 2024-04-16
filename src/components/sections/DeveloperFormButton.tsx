"use client";

import { useState } from "react";

import FormHireMe from "@/components/sections/FormHireMeModal";
import { Button } from "@/components/ui/Button";

import type { TitleField } from "@prismicio/client";

type DeveloperFormButtonProps = {
  developerName?: TitleField;
  developerEmail?: string;
  className?: string;
};

export const DeveloperFormButton = ({
  developerName,
  developerEmail,
  className
}: DeveloperFormButtonProps) => {
  const [FormhireMeOpen, setFormHireMeOpen] = useState(false);
  const [hireAnyoneOpen, setHireAnyoneOpen] = useState(false);

  return developerName && developerEmail ? (
    <>
      <Button
        style="primary"
        as="button"
        onClick={() => setFormHireMeOpen(true)}
        className={className}
      >
        Hire me
      </Button>
      <FormHireMe
        isOpen={FormhireMeOpen}
        onClose={() => setFormHireMeOpen(false)}
        developerName={developerName}
        developerEmail={developerEmail}
      />
    </>
  ) : (
    <>
      <Button
        as="button"
        className={className}
        onClick={() => setHireAnyoneOpen(true)}
      >
        Let&apos;s connect
      </Button>
      <FormHireMe
        isOpen={hireAnyoneOpen}
        onClose={() => setHireAnyoneOpen(false)}
      />
    </>
  );
};
