const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  photo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: [true, "Comment should not be empty"],
  },
 }, { timestamps: true });


module.exports = CommentSchema;
