const { AuthenticationError } = require("apollo-server-express");
const { User, Photo  } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("Photo");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
     photo: async (parent, { name }) => {
      const params = {};
      if (name) {
        params.name = {
          $regex: name
        };
      }
      return await Photo.find(params).populate('Comment');
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
    addUser: async (parent, { username, email, password, avatar }) => {
      const user = await User.create({ username, email, name, password });
      const token = signToken(user);
      return { token, user };
    },
    // addPhoto: async (parent, { photo }, context) => {
    //   console.log(context);
    //   if (context.user) {
    //     const photo = new Photo({ photo });
    //     await User.findByIdAndUpdate(context.user._id, { $push: { Photo: photo } });
    //     return photo;
    //   }
    //   throw new AuthenticationError('Not logged in');
    // },
    // addComment: async (parent,{ comment }, context) => {
    //   console.log(context);
    //   if (context.user) {
    //     const comment = new Comment({ comment });
    //     await comment.findByIdAndUpdate(context.user._id, { $push: { Comment: comment } });
    //     return await comment.insert;
    //   }
    //   throw new AuthenticationError('Not logged in');
    // },
    // // updatePhoto: async (parent, { _id, like, comment }) => {
    //   if (like) {
    //     params.like = like;
    //   }

    //   if (comment) {
    //     params.comment = {
    //       comment
    //     };
    //   }
    //   return await Photo.findByIdAndUpdate(_id, { params }, { new: true });
    // },
  },
};

module.exports = resolvers;
