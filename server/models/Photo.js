const mongoose = require("mongoose");
const Profile = require("./User");

const PhotoSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  hashtag: {Array},
  url: {
      type: String,
      required: true,
      unique: true,
    },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
});

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;
