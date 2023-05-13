import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter, Outlet } from "react-router-dom";
import { Container, Header, MainPageWrapper } from "@/features";
import { ModalWrapper, SideBar } from "@/widgets";
import { ArticlePage, FavoriteArticlesPage, MainPage } from "@/pages";

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
