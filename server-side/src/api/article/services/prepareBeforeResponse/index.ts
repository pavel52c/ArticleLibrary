import {
  ParsingResponseModel,
  PrepareResponseModelProps,
} from "../../models/parsingResponseModel";
import { prepareAbstract } from "./prepareAbstract";
import { prepareReferences } from "./prepareReferences";

export const prepareBeforeResponse = ({
  header,
  abstract,
  referenceSection,
  webSite,
}: PrepareResponseModelProps): ParsingResponseModel => {
  return {
    header,
    abstract: prepareAbstract({
      abstract,
      abstractParse: webSite.abstractParse,
    }),
    reference: prepareReferences({
      referenceSection,
      referenceParse: webSite.referenceParse,
    }),
  };
};
