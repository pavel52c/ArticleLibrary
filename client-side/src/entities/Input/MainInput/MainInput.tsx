import React from "react";
import { Input, InputProps } from "../../../shared/ui";
import { SearchImg } from "../../../shared/public/images";
import "./MainInput.scss";

type MainInputProps = InputProps & { onSubmit: () => void };

export const MainInput: React.FC<MainInputProps> = (props) => {
  const onKeyDown = (e: any) => {
    if (e.code === "Enter") {
      props.onSubmit();
    }
  };
  return (
    <div className="MainInput">
      <SearchImg />
      <Input {...props} onKeyDown={onKeyDown} />
    </div>
  );
};
