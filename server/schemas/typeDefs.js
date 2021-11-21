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
    comment: [Comment]
    user: [User]
  }

  type Comment {
    _id: ID
    comment: String
    user: [User]
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
    photos: Photo
    photo: Photo
  }

  type Mutation {
    login(email: String, password: String): Auth
    addUser(username: String, email: String, password: String): Auth
    addPhoto(
      title: String
      description: String
      hashtag: [String]
      likes: String
      url: String
    ): Auth
  }
`;

module.exports = typeDefs;
