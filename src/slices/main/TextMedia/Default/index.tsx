import { SliceLayout } from "@/components/layout/SliceLayout";
import { Copy } from "@/components/modules/Copy";
import { Content } from "@prismicio/client";

import type { SliceZoneContext } from "@/lib/types";

export type TextMediaDefaultProps = {
  slice: Content.MainTextMediaSliceDefault;
  theme: SliceZoneContext["theme"];
};

const TextMediaDefault = async ({ slice, theme }: TextMediaDefaultProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme} padding="small">
      <div className="container md:grid md:grid-cols-12 md:gap-6">
        <div className="md:col-span-10 md:col-start-2 lg:px-14">
          <Copy
            field={slice.primary.rich_text}
            muted
            slimExceptImages={true}
            theme={theme}
          />
        </div>
      </div>
    </SliceLayout>
  );
};

export default TextMediaDefault;
