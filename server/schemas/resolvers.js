const {
  AuthenticationError,
  ValidationError,
} = require("apollo-server-express");
const { GraphQLUpload, graphqlUploadExpress } = require("graphql-upload");
const util = require("util");
const path = require("path");

const { User, Photo } = require("../models");
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
        return User.findOne({ _id: context.user._id }).populate("Photo");
      }
      throw new AuthenticationError("You need to be logged in!");
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
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
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
        const url = await uploadFile(filename, stream);

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
    removePhoto: async (parent, { photoId }, context) => {
      if (context.user) {
        const photo = await Photo.findOneAndDelete({
          photoId,
        });

        const user = await User.findOneAndUpdate(
          { username: context.user.username },
          { $pull: { photos: { photoId } } }
        );

        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
