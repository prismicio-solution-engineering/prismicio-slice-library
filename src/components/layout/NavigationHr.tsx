import { MenuItem } from "@/slices/menu";

import type { SliceZoneContext } from "@/lib/types";

type NavigationHrProps = {
  theme: SliceZoneContext["theme"];
};

export const NavigationHr = ({ theme }: NavigationHrProps) => {
  const menuItems = [
    {
      label: "About Prismic",
      link: "/hr/about-prismic"
    },
    {
      label: "My Onboarding",
      link: "/hr/my-onboarding"
    },
    {
      label: "Office",
      link: "/hr/office"
    },
    {
      label: "Policies",
      link: "/hr/policies"
    },
    {
      label: "Well-Being",
      link: "/hr/well-being"
    },
    {
      label: "Team Building",
      link: "/hr/team-building"
    },
    {
      label: "Organisational Chart",
      link: "/hr/organisational-chart"
    },
    {
      label: "Paris Guide",
      link: "/hr/paris-guide"
    }
  ];

  return (
    <div className="order-2 grow lg:order-1 container lg:px-0 lg:mx-0 lg:w-auto">
      <ul className="flex flex-col lg:items-center lg:flex-row lg:justify-end text-sm lg:text-xs xl:text-base">
        {menuItems.map((item, index) => (
          <MenuItem
            key={index}
            slice={{
              version: "latest",
              items: [],
              variation: "default",
              primary: {
                label: item.label,
                link: {
                  link_type: "Web",
                  url: item.link
                }
              }
            }}
            context={{ theme: theme } as SliceZoneContext}
          />
        ))}
      </ul>
    </div>
  );
};
