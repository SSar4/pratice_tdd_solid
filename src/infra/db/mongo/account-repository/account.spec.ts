import { MongoHelp } from '../helps/mongo-helps';

describe('insert', () => {
  beforeAll(async () => {
    await MongoHelp.connect();
  });

  afterAll(async () => {
    await MongoHelp.disconect();
  });
});
