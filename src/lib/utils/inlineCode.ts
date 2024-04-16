export const inlineCodeClasses =
  "inline-code p-[2px] leading-[1] bg-primary-orange rounded bg-opacity-20 text-primary-orange font-mono font-medium";

export const inlineCode = (children: any) => {
  const newChildren = children.map((child: any) => {
    if (child.type === "span" && child.props.className === "inline-code") {
      const newChild = {
        ...child,
        type: "code",
        props: {
          ...child.props,
          className: inlineCodeClasses,
        },
      };

      return newChild;
    } else {
      return child;
    }
  });

  return newChildren;
};
