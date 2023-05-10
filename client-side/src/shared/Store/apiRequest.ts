import axios from "axios";
import { BASE_URL } from "../helpers/getBaseQuery";
import { AppDispatch } from "./store";
import { requestMethods } from "../helpers/requestMethods";

interface requestParams<RequestParams> {
  data: RequestParams;
  method?: string;
  url: string;
}

interface apiRequestProps<RequestParams> {
  requestParams: requestParams<RequestParams>;
  actions: any;
  addNewData?: boolean;
}

export const apiRequest =
  <RequestParams>({
    requestParams,
    actions,
    addNewData = false,
  }: apiRequestProps<RequestParams>) =>
  (dispatch: AppDispatch) => {
    const request = {
      url: `${BASE_URL}${requestParams.url}`,
      method: requestParams.method,
      data: requestParams.data,
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    dispatch(actions?.setStartLoading());
    axios({ ...request })
      .then(({ data }) => {
        if (addNewData) actions.addData && dispatch(actions.addData(data));
        else dispatch(actions.setData(data));

        actions.setEndLoading && dispatch(actions.setEndLoading());
      })
      .catch(({ response }) => {
        if (response?.status === 401 && requestParams.url !== "/login") {
          axios({
            url: `${BASE_URL}/refreshToken`,
            method: requestMethods.POST,
            data: { refreshToken: localStorage.getItem("refreshToken") },
            headers: {
              authorization: localStorage.getItem("accessToken"),
            },
          })
            .then((response) => {
              localStorage.setItem("accessToken", response.data.accessToken);
              localStorage.setItem("refreshToken", response.data.refreshToken);
              dispatch(
                apiRequest({
                  requestParams,
                  actions,
                })
              );
            })
            .catch(() => {
              actions.setEndLoading && dispatch(actions.setEndLoading());
              actions.setError &&
                dispatch(actions.setError("Авторизуйтесь повторно"));
            });
        } else {
          actions.setEndLoading && dispatch(actions.setEndLoading());
          actions.setError &&
            dispatch(actions.setError(response?.data.message));
        }
      });
  };
