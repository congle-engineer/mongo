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

    const filter = { rated: "G" };

    const updateDoc = {
      $set: {
        random_review: `After viewing I am ${
          100 * Math.random()
        }% more satisfied with life.`,
      },
    };

    const result = await movies.updateMany(filter, updateDoc);
    console.log(`Updated ${result.modifiedCount} documents`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
