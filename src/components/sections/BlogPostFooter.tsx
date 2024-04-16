import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { createClient } from "@/prismicio";
import { Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";

const CaseStudy = ({ doc }: { doc: Content.CaseStudyDocument }) => {
  return (
    <div className="text-left flex flex-col">
      <PrismicNextImage
        field={doc.data.image}
        className="aspect-[5/3] object-cover object-top rounded-xl"
      />
      <Heading size="md" field={doc.data.title} className="mt-6 grow" />
      <Button
        style="tertiary"
        href={`/customers/${doc.uid}`}
        className="mt-2 inline-block"
      >
        Read Case Study
      </Button>
    </div>
  );
};

export const BlogPostFooter = async () => {
  const client = createClient();

  const partials = await client.getSingle("partials", {
    fetch: [
      "blog_partials.blog_cta_pre_title",
      "blog_partials.blog_cta_title",
      "blog_partials.blog_case_study_one",
      "blog_partials.blog_case_study_two",
      "blog_partials.blog_case_study_three"
    ],
    fetchLinks: ["case_study.title", "case_study.image"]
  });

  const caseStudyOneUid =
    isFilled.contentRelationship<
      "case_study",
      string,
      Content.CaseStudyDocument
    >(partials.data.post_footer_case_study_one) &&
    partials.data.post_footer_case_study_one.uid;

  const caseStudyTwoUid =
    isFilled.contentRelationship<
      "case_study",
      string,
      Content.CaseStudyDocument
    >(partials.data.post_footer_case_study_two) &&
    partials.data.post_footer_case_study_two.uid;

  const caseStudyThreeUid =
    isFilled.contentRelationship<
      "case_study",
      string,
      Content.CaseStudyDocument
    >(partials.data.post_footer_case_study_three) &&
    partials.data.post_footer_case_study_three.uid;

  const caseStudies = await client.getAllByUIDs("case_study", [
    caseStudyOneUid ? caseStudyOneUid : "",
    caseStudyTwoUid ? caseStudyTwoUid : "",
    caseStudyThreeUid ? caseStudyThreeUid : ""
  ]);

  return (
    (isFilled.contentRelationship(partials.data.post_footer_case_study_one) ||
      isFilled.contentRelationship(partials.data.post_footer_case_study_two) ||
      isFilled.contentRelationship(
        partials.data.post_footer_case_study_three
      )) && (
      <div className="container">
        <div className="bg-gray-F7 text-center flex flex-col items-center rounded-xl lg:px-6 pt-16 pb-12 mb-12">
          {isFilled.keyText(partials.data.post_footer_eyebrow) && (
            <Eyebrow
              text={partials.data.post_footer_eyebrow}
              color={partials.data.post_footer_eyebrow_color}
            />
          )}
          {isFilled.richText(partials.data.post_footer_heading) && (
            <Heading
              field={partials.data.post_footer_heading}
              size="2xl"
              className="max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
            />
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-6 mt-12">
            {caseStudies.map((doc, i) => (
              <CaseStudy doc={doc} key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  );
};
