import { ReferenceModel } from "../../Reference/model/ReferenceModel";
import { AbstractModel } from "../../Abstract/model/AbstractModel";

export interface ArticleModel {
  title: string;
  abstracts?: AbstractModel[];
  references: ReferenceModel[];
}
