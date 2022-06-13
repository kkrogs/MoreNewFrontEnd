const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    memories: [Memory]!
  }

  type Memory {
    _id: ID
    memoryText: String
    memoryAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    memories(username: String): [Memory]
    memory(memoryId: ID!): Memory
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addMemory(memoryText: String!): Memory
    addComment(memoryId: ID!, commentText: String!): Memory
    removeMemory(memoryId: ID!): Memory
    removeComment(memoryId: ID!, commentId: ID!): Memory
  }
`;

module.exports = typeDefs;
