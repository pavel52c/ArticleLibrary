import React from "react";
import { useGetWebSites } from "../../entities/Link/api/LinkService";
import { DropDownBlock } from "../../features/SideBar/DropDownBlock/DropDownBlock";
import { mapWebSites } from "../../features/SideBar/helpers/mapWebSites";
import {
  useAppDispatch,
  useAppSelector,
} from "../../shared/Store/hooks/reduxHooks";
import { SearchActions } from "../../shared/Store/reducers/SearchReducer";
import { PagesBlock } from "../../features/SideBar/PagesBlock/PagesBlock";
import "./SideBar.scss";

export const SideBar: React.FC = () => {
  const { data: webSites = [] } = useGetWebSites();
  const dispatch = useAppDispatch();
  const { webSite } = useAppSelector((state) => state.search);

  const dropDownProps = {
    items: mapWebSites(webSites),
    onChange: (value: string) => dispatch(SearchActions.setWebSite(value)),
    selectedItem: webSite,
  };

  return (
    <div className="SideBar">
      <DropDownBlock {...dropDownProps} />
      <PagesBlock />
    </div>
  );
};
