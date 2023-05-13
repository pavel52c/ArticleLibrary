import { ReferenceModel } from "@/entities/Reference/model/ReferenceModel";
import { AbstractModel } from "@/entities/Abstract/model/AbstractModel";

export interface ArticleModel {
  title: string;
  abstracts?: AbstractModel[];
  references: ReferenceModel[];
}
