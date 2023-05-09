import ScienceDirectPrepare from './scienceDirect';
import { webSiteNames } from '../../constants/websites';
import { CreateArticleDto } from '../../dto/create-article.dto';
import { ParseArticleDto } from '../../dto/parse/parse-article.dto';

export const prepareBeforeResponse = ({
  title,
  abstracts,
  references,
  webSite,
}: ParseArticleDto): CreateArticleDto => {
  switch (webSite) {
    case webSiteNames.scienceDirect:
      return <CreateArticleDto>{
        title,
        abstracts: ScienceDirectPrepare.prepareAbstract(abstracts),
        references: ScienceDirectPrepare.prepareReferences(references),
      };
  }
};
