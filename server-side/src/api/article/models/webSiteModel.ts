export interface AbstractParseModel {
  heading: string;
  text: string;
}

export interface ReferenceParseModel {
  text: string;
  link: string;
}

export interface WebSiteModel {
  header: string;
  abstractParse: AbstractParseModel;
  referenceParse: ReferenceParseModel;
}
