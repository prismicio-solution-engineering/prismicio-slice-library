import { Accordion } from "react-accessible-accordion";

export type AccordionWrapperProps = {
  children: React.ReactNode;
  allowZeroExpanded?: boolean;
  preExpanded?: string[];
};

export const AccordionWrapper = ({
  children,
  allowZeroExpanded = false,
  preExpanded = ["0"]
}: AccordionWrapperProps) => {
  return (
    <Accordion
      className="flex flex-col gap-4"
      allowZeroExpanded={allowZeroExpanded}
      preExpanded={preExpanded}
    >
      {children}
    </Accordion>
  );
};
