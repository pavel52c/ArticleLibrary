import React, { useCallback, useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/Store/hooks/reduxHooks";
import { LinkItem } from "@/entities/Link/ui/LinkItem/LinkItem";
import LinkApiActions from "@/entities/Link/api/LinkApiActions";
import { LinkModel } from "@/entities/Link/model/LinkModel";
import { ContentLoadingWrapper } from "@/widgets/ContentLoadingWrapper/ContentLoadingWrapper";
import { SearchBlock } from "@/widgets/SearchBlock/ui/SearchBlock";
import { ShowMoreBtn } from "@/features/ShowMoreBtn/ui/ShowMoreBtn";
import "./MainPage.scss";
import { SearchActions } from "@/shared/Store/reducers";
import { ArticleTag } from "@/entities/ArticleTag/ui/ArticleTag";
import { AddTag } from "@/features/AddTag/AddTag";
import { ArticleTagsGroup } from "@/widgets";

export const MainPage = () => {
  useEffect(() => {
    LinkApiActions.getLinksForMainPage(dispatch);
  }, []);

  const [offset, setOffset] = useState(0);
  const dispatch = useAppDispatch();

  const {
    links = [],
    isLoading,
    error = "",
    webSite,
    search,
  } = useAppSelector((state) => state.search);

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

  const onChange = (value: string) => {
    dispatch(SearchActions.setSearch(value));
  };

  useEffect(() => {
    if (offset !== 0) onSubmit();
  }, [offset]);

  const mainPageSearchBlockProps = {
    onSubmit: useCallback(onSubmit, [search]),
    onChange,
  };

  const showMoreBtnProps = {
    onClick: () => setOffset((prev) => prev + 5),
    visible: !isLoading && !error,
  };

  return (
    <div className="MainPage">
      <SearchBlock {...mainPageSearchBlockProps} />
      <ContentLoadingWrapper error={error} isLoading={isLoading}>
        <ul className="MainPage__list">
          {links.map((link: LinkModel) => (
            <li key={link.title}>
              <LinkItem {...link} />
              <ArticleTagsGroup tags={[]} needToAdd />
            </li>
          ))}
        </ul>
      </ContentLoadingWrapper>
      <ShowMoreBtn {...showMoreBtnProps} />
    </div>
  );
};
