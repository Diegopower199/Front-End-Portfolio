import { MongoClient } from "npm:mongodb@5";
import { WordSchema } from "./schema.ts";

const client = new MongoClient("mongodb://mongo:27017");

await client.connect();

export const db = client.db("WordList");
export const wordsCollection = db.collection<WordSchema>("Contacts");
