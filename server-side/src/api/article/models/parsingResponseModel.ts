import { ReferenceModel } from "./referencesModel";
import { AbstractChunk } from "./AbstractModel";
import { WebSiteModel } from "./webSiteModel";

export interface PrepareResponseModelProps {
  header: string;
  abstract: string[];
  referenceSection: string[];
  webSite: WebSiteModel;
}

export interface ParsingResponseModel {
  header: string;
  abstract: AbstractChunk[];
  reference: ReferenceModel[];
}
