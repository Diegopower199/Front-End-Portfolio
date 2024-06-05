export const typeDefs = `
type Word{
  word: String
}
type Query{
  getWords: [Word!]!
  getWord(word: String!): String!
}
type Mutation{
  addWord(word: String!): Word!
  deleteAllWords: String!
}`;
