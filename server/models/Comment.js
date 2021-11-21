const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const CommentSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "Comment should not be empty!"],
      minlength: 1,
      maxlength: 1024,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
  },
  { timestamps: true }
);

const Comment = model('Comment', CommentSchema);

module.exports = Comment;
