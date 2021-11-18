const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    photos: [Photo]
  }

  type Photo {
    photoId: String!
    # TODO: add other properties
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String, password: String): Auth
    addUser(username: String!, email: String!, password: String!): Auth

    # TODO: this needs more work
    addPhoto(file: Upload!): User
    removePhoto(photoId: String): User
  }
`;

module.exports = typeDefs;
