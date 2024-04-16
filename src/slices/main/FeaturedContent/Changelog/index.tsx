import { SliceLayout } from "@/components/layout/SliceLayout";
import { CallToActions } from "@/components/modules/CallToActions";
import { SliceHeader } from "@/components/modules/SliceHeader";
import { SliceZoneContext } from "@/lib/types";
import { Content } from "@prismicio/client";

import { GithubChangelogSwiper } from "./GithubChangelogSwiper";

type FeaturedPartnerProps = {
  slice: Content.MainFeaturedSliceChangelog;
  theme: SliceZoneContext["theme"];
};

const FeaturedPartner = async ({ slice, theme }: FeaturedPartnerProps) => {
  const themeFromSlice =
    slice.primary.theme === "light" || slice.primary.theme === "dark";

  const response = await fetch(
    `https://api.github.com/repos/prismicio/${slice.primary.github_repository}/releases`
  )
    .then((response) => response.json())
    .then((data) => data.slice(0, 3))
    .catch((error) => console.error(error));

  // fake github changelog response
  // const response = [
  //   {
  //     id: 1,
  //     name: "Release 1.0.0",
  //     published_at: "2022-01-01",
  //     html_url: "https://test.com",
  //     body: "- Initial release das dasdasdasdsadsadasdasdasda dasdas dasdasd asdasdasdasdas dasdasdasdasdasdasdasdasd assd asadasd asasd asd asd asd asd asdasd asdasdasd ",
  //     author: {
  //       login: "prismicio",
  //       avatar_url: "https://avatars.githubusercontent.com/u/11535927?v=4",
  //       url: ""
  //     }
  //   },
  //   {
  //     id: 2,
  //     name: "Release 1.0.1",
  //     published_at: "2022-01-02",
  //     html_url: "https://test.com",
  //     body: "- Bug fixes",
  //     author: {
  //       login: "prismicio",
  //       avatar_url: "https://avatars.githubusercontent.com/u/11535927?v=4",
  //       url: ""
  //     }
  //   },
  //   {
  //     id: 3,
  //     name: "Release 1.0.2",
  //     published_at: "2022-01-03",
  //     html_url: "https://test.com",
  //     body: "- Security updates",
  //     author: {
  //       login: "prismicio",
  //       avatar_url: "https://avatars.githubusercontent.com/u/11535927?v=4",
  //       url: ""
  //     }
  //   }
  // ];

  return (
    <SliceLayout sliceTheme={themeFromSlice} theme={theme}>
      <div className="container">
        <SliceHeader
          heading={slice.primary.heading}
          subheading={slice.primary.subheading}
          theme={theme}
        />
        <GithubChangelogSwiper updates={response} theme={theme} />
        <CallToActions theme={theme} items={slice.items} className="mt-12" />
      </div>
    </SliceLayout>
  );
};

export default FeaturedPartner;
