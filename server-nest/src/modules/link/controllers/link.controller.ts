import { LinkService } from '../services/link.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { InputParseRequest } from '../constants/inputParseRequest';
import { webSitesForMainPage } from '../constants/webSitesForMainPage';

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post('input')
  async inputParse(@Body() input: InputParseRequest) {
    return this.linkService.inputParse(input);
  }

  @Get('websites')
  async getWebsitesForParse() {
    return webSitesForMainPage.map((webSite) => ({
      name: webSite.name,
      url: webSite.url,
    }));
  }
}
