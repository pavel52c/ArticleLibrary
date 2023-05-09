import React from "react";
import Button from "../../../shared/ui/Button/Button";
import { useAppDispatch } from "../../../entities/Store/hooks/reduxHooks";
import { AuthActions } from "../../../entities/Store/reducers/AuthReducer";
import "./LogoutBtn.scss";
import Paragraph from "../../../shared/ui/Paragraph/Paragraph";

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
