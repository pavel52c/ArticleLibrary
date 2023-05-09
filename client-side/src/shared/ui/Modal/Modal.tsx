import React, { ReactNode } from "react";
import classNames from "classnames";

interface ModalProps {
  children: ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({ children, className }) => {
  return <div className={classNames("Modal", className)}>{children}</div>;
};
