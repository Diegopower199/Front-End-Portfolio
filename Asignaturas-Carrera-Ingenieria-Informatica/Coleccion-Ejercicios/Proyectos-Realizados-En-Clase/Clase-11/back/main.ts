import { startStandaloneServer } from "npm:@apollo/server@4.1/standalone";
import { ApolloServer } from "npm:@apollo/server@^4.1";
import { MongoClient } from "npm:mongodb@5";

const typeDefs = `
  type Query {
    list: [String!]!
  }
  type Mutation {
    addWord(word: String!): [String!]!
  }
`;

const resolvers = {
  Query: {
    list: async () => {
      return await collection
        .find({})
        .toArray()
        .map((d) => d.word);
    },
  },

  Mutation: {
    addWord: async (_: unknown, args: { word: string }) => {
      await collection.insertOne({ word: args.word });

      return await collection
        .find({})
        .toArray()
        .map((d) => d.word);
    },
  },
};

const dbname = "listwords";
const url = "mongodb://localhost:27017";

const client = new MongoClient(url);
await client.connect;

const db = client.db(dbname);
const collection = db.collection("words");

const server = new ApolloServer({ typeDefs, resolvers });

const { url: apollo_url } = await startStandaloneServer(server, {
  listen: { port: 8080 },
});

console.log(`Server running on: ${apollo_url}`);
