import React from "react";
import { Input, InputProps } from "../../../shared/ui";
import { SearchImg } from "../../../shared/public/images";
import "./MainInput.scss";

type MainInputProps = InputProps;

export const MainInput: React.FC<MainInputProps> = (props) => (
  <div className="MainInput">
    <SearchImg />
    <Input {...props} />
  </div>
);
