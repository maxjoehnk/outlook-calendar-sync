import {Injectable} from '@nestjs/common';

@Injectable()
export class Config {
  db = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '27017', 10),
    name: process.env.DB_DATABASE || 'calendar-sync',
  }

  oauth = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  }
}
