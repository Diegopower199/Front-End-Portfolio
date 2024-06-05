import { wordsCollection } from "../db/dbconnection.ts";
import { WordSchema } from "../db/schema.ts";
import { Word } from "../types.ts";

export const Mutation = {
  addWord: async (_: unknown, params: Word): Promise<WordSchema> => {
    const addingWord: WordSchema = params as WordSchema;
    
    await wordsCollection.insertOne(addingWord);

    return addingWord;
  },

  deleteAllWords: async (_: unknown, params: {}): Promise<string> => {
    await wordsCollection.deleteMany({});

    return "all words deleted";
  },
};
