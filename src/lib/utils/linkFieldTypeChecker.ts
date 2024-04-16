import type {
  FilledContentRelationshipField,
  FilledLinkToMediaField,
  FilledLinkToWebField
} from "@prismicio/client";

export const isLinkToWebField = (
  data:
    | FilledContentRelationshipField<string, string, unknown>
    | FilledLinkToMediaField
    | FilledLinkToWebField
): data is FilledLinkToWebField => {
  return (data as FilledLinkToWebField).target !== undefined;
};

export const isLinkToMediaField = (
  data:
    | FilledContentRelationshipField<string, string, unknown>
    | FilledLinkToMediaField
    | FilledLinkToWebField
): data is FilledLinkToMediaField => {
  return (data as FilledLinkToMediaField).kind !== undefined;
};
