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

    const query = { title: "Annie Hall" };
    const result = await movies.deleteOne(query);

    if (result.deletedCount === 1) {
      console.log("Successfully deleted one document");
    } else {
      console.log("No documents matched the query. Deleted 0 documents");
    }
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
