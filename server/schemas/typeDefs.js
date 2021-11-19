const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    name: String!
    email: String!
    avatar: String!
  }

  type Photo {
    _id: ID
    title: String!
    description: String!
    user: User
    hashtag: [String!]
    likes: String!
    url: String!
    comment: [Comment]
  }

  type Comment{
    _id: ID
    photo: Photo
    comment: String!
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
    photo: Photo
  }

  type Mutation {
    login(email: String, password: String): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
