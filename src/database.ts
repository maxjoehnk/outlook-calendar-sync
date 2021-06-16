import {Injectable} from '@nestjs/common';
import {Collection, MongoClient} from 'mongodb';
import {Config} from './config';

@Injectable()
export class Database {
  private client: MongoClient;

  constructor(private config: Config) {
    const uri = `mongodb://${config.db.host}:${config.db.port}`;
    this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  }

  async collection<TSchema>(collection: string): Promise<Collection<TSchema>> {
    const client = await this.client.connect();
    const db = client.db(this.config.db.name);

    return db.collection(collection);
  }
}
