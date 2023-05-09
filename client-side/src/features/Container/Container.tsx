import React, { ReactNode } from "react";
import "./Container.scss";

export const Container = ({ children }: { children: ReactNode }) => (
  <div className="Container">{children}</div>
);
