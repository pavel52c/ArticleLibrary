import React, { useEffect } from "react";
import "./RegistrationModal.scss";
import Heading from "../../../../../shared/ui/Heading/Heading";
import { CloseImg } from "../../../../../shared/public/images";
import Button from "../../../../../shared/ui/Button/Button";
import { ModalActions } from "../../../../Store/reducers/ModalReducer";
import { useAppDispatch } from "../../../../Store/hooks/reduxHooks";
import { ModalInput } from "../../../../Input/ModalInput/ModalInput";
import Paragraph from "../../../../../shared/ui/Paragraph/Paragraph";
import { useForm } from "react-hook-form";
import { CreateUserDto } from "../../../../User/model/CreateUserDto";
import { AuthActions } from "../../../../Store/reducers/AuthReducer";
import { useRegistration } from "../../../api/authService";
import { useError } from "../../../../../shared/hooks/useError";
import { ProfileActions } from "../../../../Store/reducers/ProfileReducer";

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
