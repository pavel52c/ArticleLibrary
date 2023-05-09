import { Req, Controller, Get } from '@nestjs/common';
import { AppService } from '../servicies/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('mainPage')
  async getLinksForMainPage(@Req() request) {
    return this.appService.mainPage(request);
  }
}
