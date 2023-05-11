import React from "react";
import { LoginBtn } from "@/features/Header/LoginBtn/LoginBtn";
import { LogoImg } from "@/shared/public/images";
import "./Header.scss";

export const Header = () => (
  <header className="Header">
    <LogoImg />
    <LoginBtn />
  </header>
);
