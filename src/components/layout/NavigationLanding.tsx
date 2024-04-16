import { CallToActions } from "@/components/modules/CallToActions";
import { Content } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

type NavigationLandingProps = {
  theme: SliceZoneContext["theme"];
  customNav?: Content.LandingPageDocumentData["header_ctas"];
};

export const NavigationLanding = ({
  theme,
  customNav
}: NavigationLandingProps) => {
  return (
    <div className="container lg:mx-0 lg:w-auto lg:max-w-none order-1 lg:order-2 flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 p-6 lg:p-0 bg-white dark:bg-gray-15 relative z-10">
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4 order-2 lg:order-1 mt-4 lg:mt-0 text-center lg:py-6">
        <CallToActions
          className="flex flex-col items-stretch lg:flex-row lg:items-center"
          buttonClasses="block w-full lg:w-auto text-center"
          items={
            customNav?.map((item) => {
              return {
                special_function: item.special_function,
                cta_type: item.type,
                link_style: item.style === "link" ? "tertiary" : item.style,
                link_label: item.label,
                link: item.link
              };
            }) || []
          }
          theme={theme}
          clickPosition="header"
        />
      </div>
    </div>
  );
};
