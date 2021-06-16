import {build} from 'async-service-builder';
import {getConfig} from './config';
import {log} from './logger';
import {calendarSynchronizer} from './synchronizer';

async function run() {
  log.debug('Reading config');
  const config = await getConfig();

  const services = [];
  for (const calendar of config.calendars) {
    const job = await calendarSynchronizer(calendar);
    services.push(build(job));
  }

  await Promise.all(services);
}

run().catch(err => log.error(err));
