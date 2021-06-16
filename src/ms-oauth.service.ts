import {ConfidentialClientApplication, LogLevel} from '@azure/msal-node';
import {Injectable} from '@nestjs/common';
import {Config} from './config';
import {log} from './logger';

const logLevels = new Map<LogLevel, string>();
logLevels.set(LogLevel.Trace, "trace");
logLevels.set(LogLevel.Verbose, "debug");
logLevels.set(LogLevel.Info, "info");
logLevels.set(LogLevel.Warning, "warn");
logLevels.set(LogLevel.Error, "error");

@Injectable()
export class MsOauthService {
  private cca: ConfidentialClientApplication;

  constructor(private config: Config) {
    this.buildClientApplication();
  }

  async getAuthCodeUrl(state: string): Promise<string> {
    const url = await this.cca.getAuthCodeUrl({
      scopes: ['user.read', 'EWS.AccessAsUser.All'],
      redirectUri: 'http://localhost:5000/api/auth/redirect',
      state,
    })

    return url;
  }

  private buildClientApplication() {
    this.cca = new ConfidentialClientApplication({
      auth: {
        clientId: this.config.oauth.clientId,
        clientSecret: this.config.oauth.clientSecret
      },
      system: {
        loggerOptions: {
          loggerCallback(loglevel, message, containsPii) {
            const level = logLevels.get(loglevel);
            console.log(loglevel, level, log[level]);
            log[level](message);
          }
        }
      }
    });
  }
}
