import React, { ReactNode } from "react";
import "./Container.scss";
import { useAppSelector } from "@/shared/Store/hooks/reduxHooks";

export const Container = ({ children }: { children: ReactNode }) => (
  <div className="Container">{children}</div>
);
