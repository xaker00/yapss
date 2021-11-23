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
    addUser: async (parent, { username, email, password, avatar }) => {
      const user = await User.create({ username, email, name, password });
      const token = signToken(user);
      return { token, user };
    },
    addPhoto: async (parent, { title, url }, context) => {
      if (context.user) {
        const photo = await Photo.create({
          title,
          url,
          user: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { photos: photo._id } }
        );

        return photo;
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
          { $addToSet: { hashtag: hashtagText } }
        );
        return photoData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeHashtag: async (parent, { photoId, hashtagText }, context) => {
      if (context.user) {
        const photoData = await Photo.findOneAndUpdate(
          { _id: photoId },
          { $pull: { hashtag: hashtagText } }
        );
        return photoData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
