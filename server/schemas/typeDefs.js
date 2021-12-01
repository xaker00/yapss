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
    comments: [Comment]
  }

  type Photo {
    _id: ID
    title: String!
    description: String!
    hashtags: [String]!
    likes: Int
    url: String!
    comments: [Comment]
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
    me: [User]
    users: [User]
    photos: [Photo]
    comments: [Comment]
    photo(photoId: ID!): Photo
  }

  type Mutation {
    login(email: String, password: String): Auth
    addUser(username: String, email: String, password: String, name: String): Auth
    addPhoto(file: Upload!, title: String!, description: String!, hashtags: [String]!): Photo
    deletePhoto(photoId: ID!): Photo
    addComment(comment: String, photoId: ID!): Comment
    deleteComment(photoId: ID!, , commentId: ID!): Comment
    updateLike(photoId: ID!, counter: Int!): Photo
    addHashtag(photoId: ID!, hashtagText: String!): Photo
    removeHashtag(photoId: ID!, hashtagText: String!): Photo
  }
`;

module.exports = typeDefs;
