const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  photo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  comment: {
    type: String,
    required: [true, "Comment should not be empty"],
  },
 },
);

const Comment = new mongoose.model("Comment", CommentSchema);

module.exports = Comment;
