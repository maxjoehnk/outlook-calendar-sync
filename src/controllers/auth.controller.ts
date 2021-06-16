import {Controller, Get, Query, Res} from '@nestjs/common';
import {MsOauthService} from '../ms-oauth.service';
import {SyncUserRepository} from '../repositories/sync-user-repository.service';

@Controller('/auth')
export class AuthController {
  constructor(private syncUserRepository: SyncUserRepository, private authService: MsOauthService) {
  }

  @Get('/')
  async getUser(@Res() response) {
    const user = await this.syncUserRepository.getUser();
    const url = await this.authService.getAuthCodeUrl(user.id);
    response.redirect(url);
  }

  @Get('/redirect')
  async onRedirect(@Query() code: string, @Query() state: string) {
    console.log(code);
  }
}
