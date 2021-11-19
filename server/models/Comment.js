const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  Photo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  Comment: {
    type: String,
    required: [true, "Comment should not be empty"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CommentSchema.pre(/^find/, function (next) {
  this.find().populate("group");
  next();
});

const Comment = new mongoose.model("Comment", CommentSchema);

module.exports = Comment;
