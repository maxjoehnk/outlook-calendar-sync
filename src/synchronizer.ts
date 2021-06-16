import {ExchangeCredentials, ExchangeService, ExchangeVersion, Mailbox, OAuthCredentials, Uri} from 'ews-javascript-api';
import {CalendarConfig} from './config';
import {log} from './logger';

export const calendarSynchronizer = async (calendar: CalendarConfig) => {
  log.info(`Starting Synchronizer for calendar ${calendar.name}...`, { url: calendar.url });
  const exchange = new ExchangeService(ExchangeVersion.Exchange2016);
  exchange.Url = new Uri(calendar.url);
  const token = await getToken();
  exchange.Credentials = new OAuthCredentials(token);
  return async () => {
    log.info(`Synchronizing ${calendar.name}...`);

    log.info(`Synchronized ${calendar.name}`);
  };
};
