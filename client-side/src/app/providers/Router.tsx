import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter, Outlet } from "react-router-dom";
import { Container, Header, MainPageWrapper } from "@/features";
import { ModalWrapper, SideBar } from "@/widgets";
import { ArticlePage, FavoriteArticlesPage, MainPage } from "@/pages";
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/Store/hooks/reduxHooks";
import {
  useRefreshToken,
  useRegistration,
} from "@/entities/Auth/api/authService";

const Layout = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const { isLogin } = useAppSelector((state) => state.auth);
  const [refreshFn, { isError }] = useRefreshToken();
  useEffect(() => {
    if (!isLogin && refreshToken && !isError) refreshFn({ refreshToken });
  }, []);
  return (
    <Container>
      <Header />
      <MainPageWrapper>
        <SideBar />
        <Outlet />
      </MainPageWrapper>
      <ModalWrapper />
    </Container>
  );
};

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="articles" element={<FavoriteArticlesPage />} />
        <Route path=":articleId" element={<ArticlePage />} />
      </Route>
      <Route path="*" element={<Layout />} />
    </Routes>
  </BrowserRouter>
);
