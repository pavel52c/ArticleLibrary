import { ReferenceModel } from "@/entities/Reference/model/ReferenceModel";
import { AbstractModel } from "@/entities/Abstract/model/AbstractModel";
import { ArticleTagModel } from "@/entities/ArticleTag/model/ArticleTagModel";

export interface ArticleModel {
  title: string;
  abstracts?: AbstractModel[];
  references: ReferenceModel[];
  tags: ArticleTagModel[];
}
