import { MongoClient } from "mongo";
import { SlotSchema } from "./schema.ts";

const client = new MongoClient();
await client.connect(`mongodb://mongo:27017`);

export const db = client.database("MyDatabase");
export const slotsCollection = db.collection<SlotSchema>("Slots");
