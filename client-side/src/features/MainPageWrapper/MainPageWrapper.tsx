import React, { ReactNode } from "react";
import "./MainPageWrapper.scss";

interface MainPageWrapperProps {
  children?: ReactNode;
}

export const MainPageWrapper: React.FC<MainPageWrapperProps> = ({
  children,
}) => <main className="MainPageWrapper">{children}</main>;
