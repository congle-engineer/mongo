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
    const database = client.db("sample_mflix");
    const movies = database.collection("movies");

    const query = { runtime: { $lt: 15 } };

    const options = {
      sort: { title: 1 },
      projection: { _id: 0, title: 1, imdb: 1 },
    };

    const cursor = movies.find(query, options);

    if ((await movies.countDocuments(query)) === 0) {
      console.log("No documents found!");
    }

    for await (const doc of cursor) {
      console.dir(doc);
    }
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
