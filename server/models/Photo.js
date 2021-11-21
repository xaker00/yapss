const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const PhotoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    hashtag: [
      {
        tag: String,
      },
    ],
    likes: { type: Number, default: 0 },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  },
  { timestamps: true }
);

const Photo = model('Photo', PhotoSchema);

module.exports = Photo;
