import React from "react";
import { useAppDispatch } from "../store/hooks/reduxHooks";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";
import { Modal } from "../../shared/ui";
import { RegistrationModal } from "./RegistrationModal/RegistrationModal";
import { LoginModal } from "./LoginModal/LoginModal";

export const ModalWrapper = () => {
  const modal = useSelector((state: RootState) => state.modal);

  const getModalByPage = (page: string) => {
    switch (page) {
      case "registration":
        return <RegistrationModal />;
      case "login":
        return <LoginModal />;
      default:
        return <></>;
    }
  };

  return modal.isOpen ? <Modal>{getModalByPage(modal.page)}</Modal> : <></>;
};
