export const typeDefs = `
  scalar Date
  
  type Event {
    id: ID!
    title: String!
    description: String!
    date: Date!
    startHour: Int!
    endHour: Int!
  }

  type Query {
    events: [Event!]!
  }

  type Mutation {
    createEvent(
      title: String!
      description: String!
      date: Date!
      startHour: Int!
      endHour: Int!
    ): Event!

    updateEvent(
      id: ID!
      title: String!
      description: String!
      date: Date!
      startHour: Int!
      endHour: Int!
    ): Event!

    deleteEvent(id: ID!): Event!
  }
`;
