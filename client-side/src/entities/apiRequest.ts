import axios from "axios";
import { BASE_URL } from "./services/helpers/getBaseQuery";
import { AppDispatch } from "./store/store";

interface requestParams<RequestParams> {
  data: RequestParams;
  method?: string;
  url: string;
}

interface apiRequestProps<RequestParams> {
  requestParams: requestParams<RequestParams>;
  actions: any;
}

export const apiRequest =
  <RequestParams>({ requestParams, actions }: apiRequestProps<RequestParams>) =>
  (dispatch: AppDispatch) => {
    const request = {
      url: `${BASE_URL}${requestParams.url}`,
      method: requestParams.method,
      data: requestParams.data,
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    };
    dispatch(actions.setStartLoading());
    axios({ ...request })
      .then(({ data }) => {
        dispatch(actions.setData(data));
      })
      .catch(({ response }) => {
        if (response.status === 401 && requestParams.url !== "/login") {
          axios({
            url: `${BASE_URL}/refreshToken`,
            method: "POST",
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
              dispatch(actions.setError("Авторизуйтесь повторно"));
            });
        } else dispatch(actions.setError(response.data.message));
      });
  };
