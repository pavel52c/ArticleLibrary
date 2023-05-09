import React from "react";
import { LoginBtn } from "../../features/Header/LoginBtn/LoginBtn";
import "./Header.scss";

export const Header = () => (
  <header className="Header">
    Logo <LoginBtn />
  </header>
);
