const mongoose = require("mongoose");
const commentSchema = require('./Comment');

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
  hashtag: [{
    tag : String,
     }],
  likes: { type: Number, default: 0 },
  url: {
      type: String,
      required: true,
      unique: true,
    },
  comment: [commentSchema],
}, { timestamps: true });

module.exports = PhotoSchema;
