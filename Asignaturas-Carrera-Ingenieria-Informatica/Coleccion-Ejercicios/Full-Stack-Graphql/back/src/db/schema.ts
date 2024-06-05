import { ObjectId } from "npm:mongodb@5";
import { Word } from "../types.ts";

export type WordSchema = Word & {
  _id: ObjectId;
};
