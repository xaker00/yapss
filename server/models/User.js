const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const photoSchema = require('./Photo');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: Object,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficon-icons.com%2Ficon%2Favatar-default-user%2F92824&psig=AOvVaw0RhgKtP-m-oeq6yF_6EUxv&ust=1637376784016000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiP0f61o_QCFQAAAAAdAAAAABAD",
    },
    // set photos to be an array of data that adheres to the photoSchema
    photos: [photoSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


const User = model('User', userSchema);

module.exports = User;
