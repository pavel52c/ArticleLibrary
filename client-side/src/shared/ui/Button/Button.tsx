import * as React from "react";
import classNames from "classnames";
import { capitalize } from "lodash";

const ButtonVariantTypes = ["custom", "primary", "secondary"] as const;
const ButtonHTMLTypes = ["submit", "button", "reset"] as const;

export type ButtonVariantType = (typeof ButtonVariantTypes)[number];
export type ButtonHTMLType = (typeof ButtonHTMLTypes)[number];

export interface BaseButtonProps {
  /**
   * Передать дочерний элемент для кнопки
   */
  children: React.ReactNode;
  /**
   * Определить класс для кнопки
   */
  className?: string;
  /**
   * Выбрать вариацию отображения кнопки
   */
  variant?: ButtonVariantType;
  /**
   * Определить размер кнопки во всю ширину от родительского контейнера
   */
  fullWidth?: boolean;
  /**
   * Отключить кнопку
   */
  disabled?: boolean;
  /**
   * Обработчик события на клик по мыши для кнопки
   */
  onClick?: () => void;
}

export type NativeButtonProps = {
  /**
   * Выбрать тип кнопки
   */
  type?: ButtonHTMLType;
} & BaseButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick">;

export type ButtonProps = Partial<NativeButtonProps>;

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "custom",
  type = "button",
  fullWidth,
  disabled,
  onClick,
  ...rest
}: ButtonProps) => {
  const buttonProps = { type, disabled };

  return (
    <button
      {...rest}
      {...buttonProps}
      onClick={onClick}
      className={classNames("Button", `Button--${variant}`, className, {
        "Button--fullWidth": fullWidth,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
