import React from "react";
import { useAppSelector } from "@/shared/Store/hooks/reduxHooks";
import { Modal } from "@/shared/ui";
import { RegistrationModal } from "../../features/Modal/RegistrationModal/RegistrationModal";
import { LoginModal } from "../../features/Modal/LoginModal/LoginModal";

export const ModalWrapper = () => {
  const modal = useAppSelector((state) => state.modal);

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
