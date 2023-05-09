import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Heading from "../../../shared/ui/Heading/Heading";
import { CloseImg } from "../../../shared/public/images";
import { useAppDispatch } from "../../store/hooks/reduxHooks";
import Button from "../../../shared/ui/Button/Button";
import { ModalActions } from "../../store/reducers/ModalReducer";
import Paragraph from "../../../shared/ui/Paragraph/Paragraph";
import { ModalInput } from "../../Input/ModalInput/ModalInput";
import { CreateUserDto } from "../../models/User/CreateUserDto";
import { useLogin } from "../../services/auth/authService";
import { useError } from "../../../shared/hooks/useError";
import { AuthActions } from "../../store/reducers/AuthReducer";
import "./LoginModal.scss";
import { ProfileActions } from "../../store/reducers/ProfileReducer";

export const LoginModal = () => {
  const { register, handleSubmit } = useForm<CreateUserDto>();
  const dispatch = useAppDispatch();
  const [loginFn, { error = {}, isSuccess = false }] = useLogin();
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
    <div className="LoginModal">
      <div className="LoginModal__header">
        <Heading size="xl" mode="semibold">
          Войти в личный кабинет
        </Heading>
        <Button onClick={closeModal}>
          <CloseImg />
        </Button>
      </div>
      <div className="LoginModal__main">
        <form onSubmit={handleSubmit(onSubmit)} className="LoginModal__form">
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
              Войти
            </Paragraph>
          </Button>
        </form>
        {axiosError.data?.message && (
          <Paragraph size="l" colorMode="error">
            {axiosError.data?.message}
          </Paragraph>
        )}
        <Button onClick={() => dispatch(ModalActions.setPage("registration"))}>
          <Paragraph size="l" colorMode="blue">
            Регистрация
          </Paragraph>
        </Button>
      </div>
    </div>
  );
};
