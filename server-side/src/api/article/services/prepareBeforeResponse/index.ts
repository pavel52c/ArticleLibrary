import {
  ParsingResponseModel,
  PrepareResponseModelProps,
} from "../../models/parsingResponseModel";
import ScienceDirectPrepare from "./scienceDirect";

export const prepareBeforeResponse = ({
  header,
  abstract,
  referenceSection,
  webSite,
}: PrepareResponseModelProps): ParsingResponseModel => {
  switch (webSite) {
    case "scienceDirect":
      return {
        header,
        abstract: ScienceDirectPrepare.prepareAbstract({ abstract }),
        reference: ScienceDirectPrepare.prepareReferences({ referenceSection }),
      };
  }
};
