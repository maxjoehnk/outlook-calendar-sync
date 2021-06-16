import {CalendarConfig} from './calendar-config';
import {CalendarSync} from './calendar-sync';

export class SyncUser {
  id: string;
  calendars: CalendarConfig[];
  jobs: CalendarSync[];
}
