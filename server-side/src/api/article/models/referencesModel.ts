import { ReferenceParseModel } from "./webSiteModel";

export interface ReferenceProps {
  referenceSection: string[];
  referenceParse: ReferenceParseModel;
}

export interface ReferenceModel {
  link: string;
  text: string;
}
