import React, { ReactNode } from "react";
import "./SideBar.scss";
import { useGetWebSites } from "../../entities/Link/api/LinkService";
import { DropDownBlock } from "../../features/SideBar/DropDownBlock/DropDownBlock";
import { mapWebSites } from "../../features/SideBar/helpers/mapWebSites";
import { WebSiteModel } from "../../entities/Link/model/LinkModel";
import { useAppDispatch } from "../../entities/Store/hooks/reduxHooks";
import { SearchActions } from "../../entities/Store/reducers/SearchReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../entities/Store/store";
import { PagesBlock } from "../../features/SideBar/PagesBlock/PagesBlock";

export const SideBar: React.FC = () => {
  const { data: webSites = [] } = useGetWebSites();
  const dispatch = useAppDispatch();
  const { webSite } = useSelector((state: RootState) => state.search);

  const dropDownProps = {
    items: mapWebSites(webSites),
    onChange: (value: string) => dispatch(SearchActions.setWebSite(value)),
    selectedItem: webSite,
  };

  const PagesProps = {
    links: ["Keks", "Shmels"],
  };

  return (
    <div className="SideBar">
      <DropDownBlock {...dropDownProps} />
      <PagesBlock {...PagesProps} />
    </div>
  );
};
