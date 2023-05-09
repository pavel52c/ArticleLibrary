import React, { useState } from "react";
import classNames from "classnames";

export interface InputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  register?: () => any;
  type?: string;
  onKeyDown?: (e: any) => void;
}

export const Input: React.FC<InputProps> = (props) => {
  const {
    value = "",
    onChange = () => {},
    className = "",
    placeholder = "",
    register = () => {},
    type = "text",
    onKeyDown = () => {},
  } = props;
  const [inputValue, setInputValue] = useState(value);

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setInputValue(e.target.value);
  };

  const registerValue = register();

  return (
    <input
      {...registerValue}
      onKeyDown={onKeyDown}
      type={type}
      value={inputValue}
      onChange={changeInputValue}
      className={classNames("Input", className)}
      placeholder={placeholder}
    />
  );
};
