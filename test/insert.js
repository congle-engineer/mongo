import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const userName = process.env.USERNAME;
const password = process.env.PASSWORD;
const clusterHostName = process.env.CLUSTER_HOSTNAME;
const appName = process.env.APP_NAME;

const uri = `mongodb+srv://${userName}:${password}@${clusterHostName}/?retryWrites=true&w=majority&appName=${appName}`;

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("insertDB");
    const haiku = database.collection("haiku");

    const doc = {
      title: "Record of a Shriveled Datum",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
    };

    const result = await haiku.insertOne(doc);

    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
