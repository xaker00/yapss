const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    name: String
    email: String
    avatar: String
    photos: [Photo]
    comments: [Comment]
  }

  type Photo {
    _id: ID
    title: String
    description: String
    hashtag: [String]
    likes: Int
    url: String
    comments: [Comment]
    user: User
  }

  type Comment {
    _id: ID
    comment: String
    photo: Photo
    user: User
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: [User]
    users: [User]
    photos: [Photo]
    comments: [Comment]
    photo(photoId: ID!): Photo
  }

  type Mutation {
    login(email: String, password: String): Auth
    addUser(username: String, email: String, password: String): Auth
  }
`;

module.exports = typeDefs;
