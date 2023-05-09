import React from "react";
import classNames from "classnames";

interface HeadingProps {
  children: React.ReactNode;
  level?: "1" | "2" | "3" | "4" | "5" | "6";
  size?: "s" | "m" | "l" | "xl";
  mode?: "regular" | "medium" | "semibold" | "bold";
  colorMode?: "primary" | "secondary" | "error" | "blue" | "gray";
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  level = "3",
  size = "m",
  mode = "regular",
  colorMode = "primary",
  className = "",
}: HeadingProps) => {
  const CurrentTag = `h${level}` as keyof JSX.IntrinsicElements;
  return (
    <CurrentTag
      className={classNames(
        `Heading--${size}`,
        `Heading--${mode}`,
        `Heading--${colorMode}`,
        className
      )}
    >
      {children}
    </CurrentTag>
  );
};

export default Heading;
