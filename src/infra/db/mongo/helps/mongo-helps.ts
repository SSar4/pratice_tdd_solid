import { MongoClient } from 'mongodb';

export const MongoHelp = {
  client: null as unknown as MongoClient,
  async connect(): Promise<void> {
    this.client = await MongoClient.connect(global.__MONGO_URI__, {
      //  useNewUrlParser: true,
      //  useUnifiedTopology: true,
    });
  },

  async disconect() {
    await this.client.close();
  },
};
