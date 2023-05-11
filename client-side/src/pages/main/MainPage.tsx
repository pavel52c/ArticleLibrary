import React, { useCallback, useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/Store/hooks/reduxHooks";
import { LinkItem } from "@/entities/Link/ui/LinkItem/LinkItem";
import LinkApiActions from "@/entities/Link/api/LinkApiActions";
import { LinkModel } from "@/entities/Link/model/LinkModel";
import { ContentLoadingWrapper } from "@/widgets/ContentLoadingWrapper/ContentLoadingWrapper";
import { MainPageSearchBlock } from "@/widgets/MainPageSearchBlock/ui/MainPageSearchBlock";
import { ShowMoreBtn } from "@/features/ShowMoreBtn/ui/ShowMoreBtn";
import "./MainPage.scss";

export const MainPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    LinkApiActions.getLinksForMainPage(dispatch);
  }, []);

  const {
    links = [],
    isLoading,
    error = "",
    webSite,
    search,
  } = useAppSelector((state) => state.search);

  const [offset, setOffset] = useState(0);

  const onSubmit = () =>
    LinkApiActions.getLinksFromInput(
      dispatch,
      {
        url: search,
        offset,
        webSite,
      },
      offset !== 0
    );

  useEffect(() => {
    if (offset !== 0) onSubmit();
  }, [offset]);

  const mainPageSearchBlockProps = {
    onSubmit: useCallback(onSubmit, [search]),
  };

  const showMoreBtnProps = {
    onClick: () => setOffset((prev) => prev + 5),
    visible: !isLoading && !error,
  };

  return (
    <div className="MainPage">
      <MainPageSearchBlock {...mainPageSearchBlockProps} />
      <ContentLoadingWrapper error={error} isLoading={isLoading}>
        <ul className="MainPage__list">
          {links.map((link: LinkModel) => (
            <li key={link.title}>
              <LinkItem {...link} />
            </li>
          ))}
        </ul>
      </ContentLoadingWrapper>
      <ShowMoreBtn {...showMoreBtnProps} />
    </div>
  );
};
