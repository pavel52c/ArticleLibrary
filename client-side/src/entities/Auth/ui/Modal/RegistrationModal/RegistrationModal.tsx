import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRegistration } from "@/entities/Auth/api/authService";
import { useError } from "@/shared/hooks/useError";
import { ModalActions } from "@/shared/Store/reducers/ModalReducer";
import { useAppDispatch } from "@/shared/Store/hooks/reduxHooks";
import { ModalInput } from "@/entities/Input/ui/ModalInput/ModalInput";
import { CreateUserDto } from "@/entities/User/model/CreateUserDto";
import { AuthActions } from "@/shared/Store/reducers/AuthReducer";
import { ProfileActions } from "@/shared/Store/reducers/ProfileReducer";
import Paragraph from "@/shared/ui/Paragraph/Paragraph";
import Button from "@/shared/ui/Button/Button";
import Heading from "@/shared/ui/Heading/Heading";
import { CloseImg } from "@/shared/public/images";
import "./RegistrationModal.scss";

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
            placeholder="Логин"
          />
          <ModalInput
            register={() => register("password")}
            placeholder="Пароль"
            type="password"
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
