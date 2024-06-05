import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { Event } from "./types.ts";

type EventSchema = Omit<Event, "id"> & { _id: ObjectId };

const client = new MongoClient();
await client.connect(`mongodb://mongo:27017`);

const db = client.database("MyDatabase");

export const EventsCollection = db.collection<EventSchema>("Events");
