import {
  MongoClient,
  ObjectId,
} from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { Eventos } from "./types.ts";

export type EventosSchema = Omit<Eventos, "id"> & { _id: ObjectId };

const client = new MongoClient();
await client.connect(`mongodb://mongo:27017`);

const db = client.database("examen");

export const eventosCollection = db.collection<EventosSchema>("eventos");
