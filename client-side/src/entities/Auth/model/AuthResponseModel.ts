import { UserModel } from "@/entities/User/model/UserModel";

export interface AuthResponseModel {
  accessToken: string;
  refreshToken: string;
}

export type RefreshRequestModel = Pick<UserModel, "refreshToken">;
