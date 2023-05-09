import { Injectable } from "@nestjs/common";
import { UsersService } from "../../user/services/users.service";
import { AuthService } from "../../auth/services/auth.service";
import { LinkService } from "../../link/services/link.service";

@Injectable()
export class AppService {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly linksService: LinkService
  ) {}

  async mainPage(request) {
    try {
      const candidate = await this.authService.getUserByToken(request);
      const { favoriteTags } = await this.userService.findByName(
        candidate.username,
      );
      const links = [];
      for (const tag of favoriteTags) {
        links.push(...(await this.linksService.inputParse(tag.tag)));
      }
      return links;
    } catch (e) {
      return await this.linksService.mainPageParse();
    }
  }
}
