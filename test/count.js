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

    const estimate = await movies.estimatedDocumentCount();
    console.log(
      `Estimated number of documents in the movies collection: ${estimate}`
    );

    const query = { countries: "Canada" };
    const countCanada = await movies.countDocuments(query);
    console.log(`Number of movies from Canada: ${countCanada}`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
