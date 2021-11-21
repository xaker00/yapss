const { AuthenticationError } = require("apollo-server-express");
const { User, Photo, Comment  } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id })
        .populate("comments")
        .populate("user")
        .populate({
          path: "comments",
          populate: "user",
        })
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
