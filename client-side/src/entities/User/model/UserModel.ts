export interface UserModel {
  id: string;
  username: string;
  banned?: boolean;
  refreshToken: string;
}
