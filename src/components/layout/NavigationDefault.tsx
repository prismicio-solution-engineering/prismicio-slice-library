"use client";

import { MenuItem } from '@/slices/menu';
import { Content } from '@prismicio/client';

import type { MenuItemSliceWithSubMenu, SliceZoneContext } from "@/lib/types";

type NavigationDefaultProps = {
  theme: SliceZoneContext["theme"];
  layout: Content.LayoutDocument;
  openMenuItem: number | null;
  onSubMenuClose: () => void;
  onSubMenuOpen: (index: number) => void;
};

export const NavigationDefault = ({
  theme,
  layout,
  openMenuItem,
  onSubMenuClose,
  onSubMenuOpen
}: NavigationDefaultProps) => {
  return (
    <div className="order-2 grow lg:order-1 container lg:px-0 lg:mx-0 lg:w-auto">
      <ul className="flex flex-col lg:items-center lg:flex-row lg:justify-center">
        {layout.data.slices1.map((item, index) => {
          if (item.variation === "default") {
            return (
              <MenuItem
                key={index}
                slice={item}
                context={{ theme: theme } as SliceZoneContext}
              />
            );
          } else {
            return (
              <MenuItem
                key={index}
                slice={item as any as MenuItemSliceWithSubMenu}
                index={index}
                context={{ theme: theme } as SliceZoneContext}
                onOpenSubMenu={() => onSubMenuOpen(index)}
                openSubMenu={openMenuItem === index}
                onCloseSubMenu={() => onSubMenuClose()}
              />
            );
          }
        })}
      </ul>
    </div>
  );
};
