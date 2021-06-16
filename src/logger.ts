import {LoggerService} from '@nestjs/common';
import { createLogger } from 'bunyan';

export const log = createLogger({
  level: 'debug',
  name: 'outlook-calendar-sync'
});

export class BunyanLogger implements LoggerService {
  debug(message: any, context?: string): any {
    log.debug(message, { context });
  }

  error(message: any, trace?: string, context?: string): any {
    log.error(message, { context, trace });
  }

  log(message: any, context?: string): any {
    log.info(message, { context });
  }

  verbose(message: any, context?: string): any {
    log.trace(message, { context });
  }

  warn(message: any, context?: string): any {
    log.warn(message, { context });
  }
}
