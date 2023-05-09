import React, { useEffect } from "react";
import "./RegistrationModal.scss";
import Heading from "../../../shared/ui/Heading/Heading";
import { CloseImg } from "../../../shared/public/images";
import Button from "../../../shared/ui/Button/Button";
import { ModalActions } from "../../store/reducers/ModalReducer";
import { useAppDispatch } from "../../store/hooks/reduxHooks";
import { ModalInput } from "../../Input/ModalInput/ModalInput";
import Paragraph from "../../../shared/ui/Paragraph/Paragraph";
import { useForm } from "react-hook-form";
import { CreateUserDto } from "../../models/User/CreateUserDto";
import { AuthActions } from "../../store/reducers/AuthReducer";
import { useRegistration } from "../../services/auth/authService";
import { useError } from "../../../shared/hooks/useError";
import { ProfileActions } from "../../store/reducers/ProfileReducer";

export const RegistrationModal = () => {
  const { register, handleSubmit } = useForm<CreateUserDto>();
  const dispatch = useAppDispatch();
  const [loginFn, { error = {}, isSuccess = false }] = useRegistration();
  const axiosError = useError(error);

  const closeModal = () => dispatch(ModalActions.closeModal());

  const onSubmit = async (formValues: CreateUserDto) => {
    const loginRes = await loginFn(formValues);
    if ("data" in loginRes) {
      dispatch(ProfileActions.setUsername(loginRes.data.username));
      dispatch(AuthActions.setLogin());
    }
  };

  useEffect(() => {
    if (isSuccess) closeModal();
  }, [isSuccess]);

  return (
    <div className="RegistrationModal">
      <div className="RegistrationModal__header">
        <Heading size="xl" mode="semibold">
          Регистрация в Библиотеку
        </Heading>
        <Button onClick={closeModal}>
          <CloseImg />
        </Button>
      </div>
      <div className="RegistrationModal__main">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="RegistrationModal__form"
        >
          <ModalInput
            register={() => register("username")}
            placeHolder="Логин"
          />
          <ModalInput
            register={() => register("password")}
            placeHolder="Пароль"
          />
          <Button variant="primary" fullWidth type="submit">
            <Paragraph size="xl" colorMode="secondary">
              Зарегистрироваться
            </Paragraph>
          </Button>
        </form>
        {axiosError.data?.message && (
          <Paragraph size="l" colorMode="error">
            {axiosError.data?.message}
          </Paragraph>
        )}
        <Button onClick={() => dispatch(ModalActions.setPage("login"))}>
          <Paragraph size="l" colorMode="blue">
            Уже есть аккаунт?
          </Paragraph>
        </Button>
      </div>
    </div>
  );
};
