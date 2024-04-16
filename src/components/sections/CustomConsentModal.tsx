import { Copy } from "@/components/modules/Copy";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Modal } from "@/components/ui/Modal";

type CustomConsentProps = {
  isOpen: boolean;
  onClose: () => void;
  heading: string;
  copy: string;
  service: string;
};

const CustomConsent = ({
  isOpen,
  onClose,
  heading,
  copy,
  service
}: CustomConsentProps) => {
  const handleConsent = (accepted: boolean) => {
    if (accepted) {
      // @ts-ignore
      window.UC_UI.acceptService(service).then(() =>
        console.log(`${service} is accepted`)
      );
    } else {
      // @ts-ignore
      window.UC_UI.showSecondLayer(service);
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <Heading as="h2" size="xl" className="pr-8">
        {heading}
      </Heading>
      <Copy className="mt-6" muted theme="light">
        {copy}
      </Copy>
      <nav className="mt-8 float-right gap-2 flex">
        <Button
          as="button"
          type="button"
          style="secondary"
          onClick={() => handleConsent(false)}
        >
          More information
        </Button>
        <Button as="button" type="button" onClick={() => handleConsent(true)}>
          Accept
        </Button>
      </nav>
    </Modal>
  );
};

export default CustomConsent;
