import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { LinkModel } from "../../entities/Link/model/LinkModel";
import { LinkItem } from "../../entities/Link/ui/LinkItem/LinkItem";
import { TailSpin } from "react-loader-spinner";
import { MainInput } from "../../entities/Input/MainInput/MainInput";
import { useAppDispatch } from "../../entities/Store/hooks/reduxHooks";
import { RootState } from "../../entities/Store/store";
import { SearchActions } from "../../entities/Store/reducers/SearchReducer";
import LinkApiActions from "../../entities/Link/api/LinkApiActions";
import { debounce } from "lodash";
import "./MainPage.scss";
import Button from "../../shared/ui/Button/Button";
import Paragraph from "../../shared/ui/Paragraph/Paragraph";

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
  } = useSelector((state: RootState) => state.search);
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
      <ul
        className={classNames("MainPage__list", {
          "MainPage__list--parsed": !isLoading,
        })}
      >
        {isLoading ? (
          <TailSpin width="80" color="green" wrapperClass="MainPage__loader" />
        ) : (
          links.map((link: LinkModel) => (
            <li key={link.title}>
              <LinkItem {...link} />
            </li>
          ))
        )}
      </ul>
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
