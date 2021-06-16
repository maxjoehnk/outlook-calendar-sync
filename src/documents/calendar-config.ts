import {ExchangeVersion} from 'ews-javascript-api';

export class CalendarConfig {
  name: string;
  url: string;
  exchangeVersion?: ExchangeVersion;
  token: string;
}
