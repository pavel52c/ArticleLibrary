import { Route, Routes } from "react-router";
import { FavoriteArticlesPage } from "../../pages/favoriteArticles/FavoriteArticlesPage";
import { ArticlePage } from "../../pages/article/ArticlePage";
import { BrowserRouter, Outlet } from "react-router-dom";
import React from "react";
import { Container, Header, MainPageWrapper, SideBar } from "../../features";
import { MainPage } from "../../pages/main/MainPage";
import { ModalWrapper } from "../../entities/Auth/ui/Modal/ModalWrapper";

const Layout = () => (
  <Container>
    <Header />
    <MainPageWrapper>
      <SideBar />
      <Outlet />
    </MainPageWrapper>
    <ModalWrapper />
  </Container>
);

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="articles" element={<Outlet />}>
          <Route index element={<FavoriteArticlesPage />} />
          <Route path=":articleId" element={<ArticlePage />} />
        </Route>
      </Route>
      <Route path="*" element={<Layout />} />
    </Routes>
  </BrowserRouter>
);
