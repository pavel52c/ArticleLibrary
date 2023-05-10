import React from "react";
import { useAppDispatch } from "@/shared/Store/hooks/reduxHooks";
import { AuthActions } from "@/shared/Store/reducers/AuthReducer";
import Paragraph from "../../../shared/ui/Paragraph/Paragraph";
import Button from "@/shared/ui/Button/Button";
import "./LogoutBtn.scss";

export const LogoutBtn = () => {
  const dispatch = useAppDispatch();
  return (
    <Button
      className="LogoutBtn"
      onClick={() => dispatch(AuthActions.setLogout())}
    >
      <Paragraph size="xl">Выйти</Paragraph>
    </Button>
  );
};
