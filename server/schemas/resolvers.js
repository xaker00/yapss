const { AuthenticationError } = require("apollo-server-express");
const { User, Photo  } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("photos");
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
    
    // TODO: finish this method
    addPhoto: async (
      parent,
      { /* add photo properties */ },
      context
    ) => {
      if (context.user) {
        const photo = await Photo.create({ /* add photo properties */ });

        const user = await User.findOneAndUpdate(
          { username: context.user.username },
          { $addToSet: { photos: photo } }
        );

        return user;
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
          { $pull: { photos: {photoId} } }
        );

        return user;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
