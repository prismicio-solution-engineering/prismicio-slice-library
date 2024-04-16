import type { BlogDocumentWithExtras } from "@/lib/types";

interface SliceReduced {
  slice_type: string;
  primary: {
    content: { text: string }[];
  };
}

interface BlogDataReduced {
  data: {
    slices: SliceReduced[];
  };
}

type TimeToReadProps = {
  blog: BlogDocumentWithExtras;
};

export const TimeToRead = ({ blog }: TimeToReadProps) => {
  const calculateTtr = (blog: BlogDataReduced): number => {
    const words = blog.data.slices.reduce(
      (acc: number, slice: SliceReduced) => {
        if (slice.slice_type === "text_content") {
          const sliceWordCount = slice.primary.content.reduce(
            (acc: number, content: { text: string }) => {
              if (content.text) {
                return acc + content.text.split(" ").length;
              }
              return acc;
            },
            0
          );
          return acc + sliceWordCount;
        }
        return acc;
      },
      0
    );

    return Math.ceil(words / 265);
  };

  return <span>{calculateTtr(blog as any as BlogDataReduced)} min read</span>;
};
