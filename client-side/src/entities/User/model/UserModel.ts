import { ArticleModel } from "@/entities/Article/model/ArticleModel";
import { ArticleTagModel } from "@/entities/ArticleTag/model/ArticleTagModel";

export interface UserModel {
  id: string;
  username: string;
  banned?: boolean;
  refreshToken: string;
  articles: ArticleModel[];
  favoriteTags: ArticleTagModel[];
}
