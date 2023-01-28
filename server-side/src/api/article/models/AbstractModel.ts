import { AbstractParseModel } from "./webSiteModel";

export interface AbstractChunk {
  title: string;
  text: string;
}

export interface AbstractProps {
  abstract: string[];
  abstractParse: AbstractParseModel;
}
