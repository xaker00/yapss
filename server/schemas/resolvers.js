const {
  AuthenticationError,
  ValidationError,
} = require("apollo-server-express");
const { GraphQLUpload, graphqlUploadExpress } = require("graphql-upload");
const util = require("util");
const path = require("path");

const { User, Photo, Comment } = require("../models");
const { signToken } = require("../utils/auth");

const { uploadFile } = require("../utils/storage");

const imageTypes = ["image/gif", "image/jpeg", "image/png"];

const resolvers = {
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload,

  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
          .populate("comments")
          .populate("user")
          .populate({
            path: "comments",
            populate: "user",
          });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    photos: async () => {
      return await Photo.find({})
        .populate("comments")
        .populate("user")
        .populate({
          path: "comments",
          populate: "user",
        })
        .limit(100)
        .sort({ _id: -1 });
    },
    comments: async () => {
      return await Comment.find({}).populate("user").populate("photo");
    },
    users: async () => {
      return await User.find({})
        .populate("photos")
        .populate({
          path: "photos",
          populate: "comment",
        })
        .populate("comments")
        .populate({
          path: "comments",
          populate: "user",
        });
    },
    photo: async (parent, { photoId }) => {
      return await Photo.findOne({ _id: photoId })
        .populate("comments")
        .populate("user")
        .populate({
          path: "comments",
          populate: "user",
        });
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { username, email, password, name }) => {
      const user = await User.create({
        username,
        email,
        name,
        password,
      });
      const token = signToken(user);
      return { token, user };
    },

    addPhoto: async (
      parent,
      { file, title, description, hashtags },
      context
    ) => {
      console.log("uploading photo📸", "folder", __dirname);

      if (context.user) {
        const { createReadStream, filename, mimetype, encoding } = await file;

        // make sure the file is an image, we don't want people uploading viruses or pirated content
        if (!imageTypes.includes(mimetype)) {
          throw new ValidationError("Invalid image format");
        }

        // Invoking the `createReadStream` will return a Readable Stream.
        // See https://nodejs.org/api/stream.html#stream_readable_streams
        const stream = createReadStream();

        // upload file to cloud storage
        const url = await uploadFile(filename, stream, mimetype);

        const photo = await Photo.create({
          title,
          url,
          description,
          hashtags,
          user: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { photos: photo._id } }
        );

        return { filename, mimetype, encoding };
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deletePhoto: async (parent, { photoId }, context) => {
      if (context.user) {
        const photo = await Photo.findOneAndDelete({
          _id: photoId,
          user: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { photos: photoId } }
        );

        return photo;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addComment: async (parent, { comment, photoId }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          comment,
          photoId,
          user: context.user._id,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { comment: comment._id } }
        );
        await photo.findOneAndUpdate(
          { _id: photoId },
          { $addToSet: { comment: comment._id } }
        );
        return comment;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    deleteComment: async (parent, { photoId, commentId }, context) => {
      if (context.user) {
        const comment = await Comment.findOneAndDelete({
          _id: commentId,
          user: context.user._id,
        });

        await User.findOneAndUpdate(
          { user: context.user._id },
          { $pull: { comments: commentId } }
        );

        await Photo.findOneAndUpdate(
          { _id: photoId },
          { $pull: { comments: photoId } }
        );

        return photo;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateLike: async (parent, { photoId, counter }, context) => {
      if (context.user) {
        const photoData = await Photo.findOneAndUpdate(
          { _id: photoId },
          { $set: { like: photo.like + counter } }
        );
        return photoData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addHashtag: async (parent, { photoId, hashtagText }, context) => {
      if (context.user) {
        const photoData = await Photo.findOneAndUpdate(
          { _id: photoId },
          { $addToSet: { hashtags: hashtagText } }
        );
        return photoData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeHashtag: async (parent, { photoId, hashtagText }, context) => {
      if (context.user) {
        const photoData = await Photo.findOneAndUpdate(
          { _id: photoId },
          { $pull: { hashtags: hashtagText } }
        );
        return photoData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
