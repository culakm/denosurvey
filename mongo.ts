
import { MongoClient,  ObjectId } from "./deps.ts";
import "https://deno.land/std@0.191.0/dotenv/load.ts";

const client = new MongoClient({
  //YOUR_APP_ID = data-ecfua
  //YOUR_CLUSTER_NAME = DenoSurvey
  //YOUR_API_KEY =T1jmzpHlypzt3pYqjRL4bo6IRjfZFyd8a1i1RRT4VdPsUueeY9sY2ZKD2pATPPxM
  endpoint: "https://data.mongodb-api.com/app/data-ecfua/endpoint/data/v1",
  dataSource: "DenoSurvey",
  auth: {
    apiKey: Deno.env.get("MONGO_API_KEY")!,
  },
});

const db = client.database("denosurvey");
export const usersCollection = db.collection("users");