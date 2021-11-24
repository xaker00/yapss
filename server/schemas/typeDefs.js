const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type User {
    _id: ID
    username: String!
    name: String!
    email: String!
    avatar: String
    photos: [Photo]
  }

  type Photo {
    _id: ID
    title: String!
    description: String!
    hashtags: [String]!
    likes: Int
    url: String!
    comment: [Comment]
    user: User
  }

  type Comment{
    _id: ID
    comment: String!
    photo: Photo
    user: User
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

    addPhoto(file: Upload!, title: String!, description: String!, hashtags: [String]!): File
    removePhoto(photoId: ID): User
  }
`;

module.exports = typeDefs;
