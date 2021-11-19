const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Comment should not be empty"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
 }, { timestamps: true });


module.exports = CommentSchema;
