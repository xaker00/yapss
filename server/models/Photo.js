const mongoose = require("mongoose");
const Profile = require("./User");

const PhotoSchema = new mongoose.Schema({
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
  hashtag: [{
    tag : String,
     }],
  likes: { type: Number, default: 0 },
  url: {
      type: String,
      required: true,
      unique: true,
    },
  // comment: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Comment",
  // },
}, { timestamps: true });

const Photo = mongoose.model("Photo", PhotoSchema);

module.exports = Photo;
