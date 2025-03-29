import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const userName = process.env.USERNAME;
const password = process.env.PASSWORD;
const clusterHostName = process.env.CLUSTER_HOSTNAME;
const appName = process.env.APP_NAME;

const uri = `mongodb+srv://${userName}:${password}@${clusterHostName}/?retryWrites=true&w=majority&appName=${appName}`;

const client = new MongoClient(uri);

let changeStream;

async function run() {
  try {
    const database = client.db("insertDB");
    const haikus = database.collection("haikus");

    changeStream = haikus.watch();

    for await (const change of changeStream) {
      console.log(`Received change:\n ${JSON.stringify(change)}`);
    }

    await changeStream.close();
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
