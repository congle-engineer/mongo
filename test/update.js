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

    const filter = { title: "Random Harvest" };

    const options = { upsert: true };

    const updateDoc = {
      $set: {
        plot: `A harvest of random numbers, such as: ${Math.random()}`,
      },
    };

    const result = await movies.updateOne(filter, updateDoc, options);

    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
