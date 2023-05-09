import React, { useState } from "react";
import classNames from "classnames";

export interface InputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeHolder?: string;
  register?: () => any;
}

export const Input: React.FC<InputProps> = (props) => {
  const {
    value = "",
    onChange = () => {},
    className = "",
    placeHolder = "",
    register = () => {},
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
      type="text"
      value={inputValue}
      onChange={changeInputValue}
      className={classNames("Input", className)}
      placeholder={placeHolder}
    />
  );
};
