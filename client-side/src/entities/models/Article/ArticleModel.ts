import { ReferenceModel } from "../Reference/ReferenceModel";
import { AbstractModel } from "../Abstract/AbstractModel";

export interface ArticleModel {
  title: string;
  abstracts?: AbstractModel[];
  references: ReferenceModel[];
}
