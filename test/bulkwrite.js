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
    const theaters = database.collection("theaters");

    const result = await theaters.bulkWrite([
      {
        insertOne: {
          document: {
            location: {
              address: {
                street1: "3 Main St.",
                city: "Anchorage",
                state: "AK",
                zipcode: "99501",
              },
            },
          },
        },
      },
      {
        insertOne: {
          document: {
            location: {
              address: {
                street1: "75 Penn Plaza",
                city: "New York",
                state: "NY",
                zipcode: "10001",
              },
            },
          },
        },
      },
      {
        updateMany: {
          filter: { "location.address.zipcode": "44011" },
          update: { $set: { is_in_ohio: true } },
          upsert: true,
        },
      },
      {
        deleteOne: {
          filter: {
            "location.address.street1": "221b Baker St",
          },
        },
      },
    ]);
    console.log(result);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
