import React from "react";
import classNames from "classnames";

interface ParagraphProps {
  /**
   * Передать дочерний элемент
   */
  children: React.ReactNode;
  /**
   * Выбрать размер
   */
  size?: "s" | "m" | "l" | "xl";
  /**
   * Выбрать вариацию отображения
   */
  mode?: "regular" | "medium" | "semibold" | "bold";
  /**
   * Определить класс
   */
  className?: string;
  /**
   * Определить цвет
   */
  colorMode?: "primary" | "secondary" | "error" | "blue" | "gray";
}

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  size = "m",
  mode = "regular",
  className = "",
  colorMode = "primary",
}: ParagraphProps) => (
  <p
    className={classNames(
      `Paragraph--${size}`,
      `Paragraph--${mode}`,
      `Paragraph--${colorMode}`,
      className
    )}
  >
    {children}
  </p>
);

export default Paragraph;
