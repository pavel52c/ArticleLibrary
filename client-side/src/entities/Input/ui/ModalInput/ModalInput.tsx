import React from "react";
import { Input, InputProps } from "@/shared/ui";
import "./ModalInput.scss";

export const ModalInput: React.FC<InputProps> = (props) => (
  <div className="ModalInput">
    <Input {...props} />
  </div>
);
