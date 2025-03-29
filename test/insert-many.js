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
    const foods = database.collection("foods");

    const docs = [
      { name: "cake", healthy: false },
      { name: "lettuce", healthy: true },
      { name: "donut", healthy: false },
    ];

    const options = { ordered: true };

    const result = await foods.insertMany(docs, options);

    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
