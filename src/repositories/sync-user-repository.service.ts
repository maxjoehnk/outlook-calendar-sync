import {Injectable} from '@nestjs/common';
import {Collection} from 'mongodb';
import {Database} from '../database';
import {SyncUser} from '../documents/sync-user';
import {log} from '../logger';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SyncUserRepository {
  constructor(private db: Database) {
  }

  async getUser(): Promise<SyncUser> {
    const collection = await this.collection();

    return collection.findOne({});
  }

  async setupUser() {
    log.debug("Setting up user");
    const collection = await this.collection();
    const user = await collection.findOne({});
    if (user != null) {
      log.debug("Found user", { user });
      return;
    }
    log.info("Creating user document");
    await collection.insertOne({
      id: uuid(),
      calendars: [],
      jobs: [],
    });
  }

  private collection(): Promise<Collection<SyncUser>> {
    return this.db.collection("sync-users");
  }
}
