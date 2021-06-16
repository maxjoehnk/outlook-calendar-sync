import {Module, OnModuleInit} from '@nestjs/common';
import {ScheduleModule} from '@nestjs/schedule';
import {Config} from './config';
import {AuthController} from './controllers/auth.controller';
import {Database} from './database';
import {log} from './logger';
import {MsOauthService} from './ms-oauth.service';
import {SyncUserRepository} from './repositories/sync-user-repository.service';

@Module({
  controllers: [AuthController],
  imports: [ScheduleModule.forRoot()],
  providers: [
    Config,
    Database,
    SyncUserRepository,
    MsOauthService]
})
export class AppModule implements OnModuleInit {
  constructor(private repository: SyncUserRepository) {
  }

  onModuleInit(): any {
    this.repository.setupUser()
      .catch(err => log.error(err));
  }
}
