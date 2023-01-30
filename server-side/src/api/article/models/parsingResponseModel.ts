import { ReferenceModel } from "./referencesModel";
import { AbstractChunk } from "./AbstractModel";

export interface PrepareResponseModelProps {
  header: string;
  abstract: string[];
  referenceSection: string[];
  webSite: string;
}

export interface ParsingResponseModel {
  header: string;
  abstract: AbstractChunk[];
  reference: ReferenceModel[];
}
