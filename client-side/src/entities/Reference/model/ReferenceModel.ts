import { LinkModel } from "@/entities/Link/model/LinkModel";

export interface ReferenceModel {
  title: string;
  description?: string;
  links: LinkModel[];
}
