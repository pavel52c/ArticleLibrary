import React from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/Store/hooks/reduxHooks";
import { ModalActions } from "@/shared/Store/reducers/ModalReducer";
import { LogoutBtn } from "../LogoutBtn/LogoutBtn";
import { LoginImg } from "@/shared/public/images";
import Heading from "@/shared/ui/Heading/Heading";
import Button from "../../../shared/ui/Button/Button";
import "./LoginBtn.scss";

export const LoginBtn = () => {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.auth);
  const { username } = useAppSelector((state) => state.profile);

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
