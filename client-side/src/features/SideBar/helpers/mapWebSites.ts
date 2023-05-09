import { WebSiteModel } from "../../../entities/models/Link/LinkModel";
import { DropDownItem } from "../../../shared/ui/InputDropDown/InputDropDown";

export const mapWebSites = (items: WebSiteModel[]): DropDownItem[] => [
  {
    value: "Все библиотеки",
    subValue: "",
    id: "",
  },
  ...items.map((item) => ({
    value: item.name,
    subValue: item.url,
    id: item.name,
  })),
];
