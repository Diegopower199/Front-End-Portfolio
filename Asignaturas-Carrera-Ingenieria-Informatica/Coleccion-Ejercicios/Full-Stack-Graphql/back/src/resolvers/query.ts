import { wordsCollection } from "../db/dbconnection.ts";
import { WordSchema } from "../db/schema.ts";
import { Word } from "../types.ts";

export const Query = {
  getWords: async (_: unknown, params: {}): Promise<WordSchema[]> => {
    const wordsList: WordSchema[] = await wordsCollection.find({}).toArray();

    return wordsList;
  },

  getWord: async (_: unknown, params: { word: string }): Promise<string> => {
    const palabra = params.word;

    const wordsList: Word = await wordsCollection.findOne({ word: palabra });

    return wordsList.word;
  },
};
