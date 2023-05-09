import React from "react";
import Button from "../../../shared/ui/Button/Button";
import { LoginImg } from "../../../shared/public/images";
import Heading from "../../../shared/ui/Heading/Heading";
import { useAppDispatch } from "../../../entities/Store/hooks/reduxHooks";
import { ModalActions } from "../../../entities/Store/reducers/ModalReducer";
import "./LoginBtn.scss";
import { LogoutBtn } from "../LogoutBtn/LogoutBtn";
import { useSelector } from "react-redux";
import { RootState } from "../../../entities/Store/store";

export const LoginBtn = () => {
  const dispatch = useAppDispatch();
  const { isLogin } = useSelector((state: RootState) => state.auth);
  const { username } = useSelector((state: RootState) => state.profile);

  return (
    <Button
      className="LoginBtn"
      onClick={() => !isLogin && dispatch(ModalActions.openModal("login"))}
    >
      <div className="LoginBtn__username">
        <LoginImg />
        <Heading size="s" mode="semibold">
          {isLogin ? username : "Войти"}
        </Heading>
      </div>
      {isLogin && <LogoutBtn />}
    </Button>
  );
};
