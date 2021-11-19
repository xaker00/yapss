const mongoose = require("mongoose");

const HashtagSchema = new mongoose.Schema({
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  HashtagType: {
    type: String,
    required: [true, "Hashtag type is required"],
    enum: ["private", "public"],
  },
});

HashtagSchema.pre(/^find/, function (next) {
  this.find().populate({
    path: "users",
    select: "username user name photo _id",
  });
  next();
});

const Hashtag = mongoose.model("Hashtag", HashtagSchema);
module.exports = Hashtag;
