import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import {
  useAppDispatch,
  useAppSelector,
} from "@/shared/Store/hooks/reduxHooks";
import { LinkItem } from "@/entities/Link/ui/LinkItem/LinkItem";
import { SearchActions } from "@/shared/Store/reducers";
import LinkApiActions from "@/entities/Link/api/LinkApiActions";
import { LinkModel } from "@/entities/Link/model/LinkModel";
import { MainInput } from "@/entities/Input/ui/MainInput/MainInput";
import Button from "@/shared/ui/Button/Button";
import Paragraph from "@/shared/ui/Paragraph/Paragraph";
import "./MainPage.scss";

export const MainPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    LinkApiActions.getLinksForMainPage(dispatch);
  }, []);

  const {
    links = [],
    isLoading,
    webSite,
    search,
  } = useAppSelector((state) => state.search);

  const [offset, setOffset] = useState(0);

  const onChange = (value: string) => {
    dispatch(SearchActions.setSearch(value));
  };

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

  const inputProps = {
    placeholder: "Название статьи",
    onChange: onChange,
    onSubmit: onSubmit,
  };

  return (
    <div className="MainPage">
      <div className="MainPage__searchBlock">
        <MainInput {...inputProps} />
        <Button
          variant="primary"
          className="MainPage__searchBtn"
          onClick={onSubmit}
        >
          <Paragraph colorMode="secondary" size="xl">
            Найти
          </Paragraph>
        </Button>
      </div>
      {isLoading ? (
        <TailSpin width="80" color="green" wrapperClass="MainPage__loader" />
      ) : (
        <ul className="MainPage__list">
          {links.map((link: LinkModel) => (
            <li key={link.title}>
              <LinkItem {...link} />
            </li>
          ))}
        </ul>
      )}
      {!isLoading && (
        <Button
          variant="primary"
          fullWidth={true}
          onClick={() => {
            setOffset((prev) => prev + 5);
          }}
        >
          <Paragraph colorMode="secondary" size="xl">
            Показать ещё
          </Paragraph>
        </Button>
      )}
    </div>
  );
};
