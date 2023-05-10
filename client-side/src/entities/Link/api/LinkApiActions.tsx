import { apiRequest } from "@/shared/Store/apiRequest";
import { requestMethods } from "@/shared/helpers/requestMethods";
import { SearchActions } from "@/shared/Store/reducers/SearchReducer";
import { AppDispatch } from "@/shared/Store/store";
import { SearchLinkParseModel } from "../model/SearchLinkParseModel";

const getLinksForMainPage = (dispatch: AppDispatch) =>
  dispatch(
    apiRequest({
      requestParams: {
        url: "/mainPage",
        method: requestMethods.GET,
        data: {},
      },
      actions: SearchActions,
    })
  );

const getLinksFromInput = (
  dispatch: AppDispatch,
  data: SearchLinkParseModel,
  addNewData: boolean
) =>
  dispatch(
    apiRequest({
      requestParams: {
        url: "/links/input",
        method: requestMethods.POST,
        data: data,
      },
      actions: SearchActions,
      addNewData,
    })
  );

export default {
  getLinksForMainPage,
  getLinksFromInput,
};
