export const getCategoryColor = (category: string) => {
  switch (category) {
    case "Performance & UX":
      return "purple";
    case "Tech stack":
      return "blue";
    case "Business of Web Development":
      return "green";
    case "Prismic Announcements":
      return "orange";
    case "Developer Workflow":
      return "pink";
    case "none":
      return "purple";
    default:
      return "gray";
  }
};

export const computeColor = (color: string) => {
  switch (color) {
    case "purple":
      return "#F5E6FF";
    case "orange":
      return "#FEF1E9";
    case "green":
      return "#D4F2E9";
    case "blue":
      return "#E6F7FE";
    case "pink":
      return "#FFE5EA";
    default:
      return "#FFFFFF";
  }
};
