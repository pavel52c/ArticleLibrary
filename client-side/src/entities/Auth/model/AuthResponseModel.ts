import { UserModel } from "../../User/model/UserModel";

export interface AuthResponseModel {
  accessToken: string;
  refreshToken: string;
}

export type RefreshRequestModel = Pick<UserModel, "refreshToken">;
