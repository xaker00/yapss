const mongoose = require("mongoose");
const validator = require("validator");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
  },
  birthday: {
    type: Date,
    select: false
  },
  avatar: {
    type: Object,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficon-icons.com%2Ficon%2Favatar-default-user%2F92824&psig=AOvVaw0RhgKtP-m-oeq6yF_6EUxv&ust=1637376784016000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiP0f61o_QCFQAAAAAdAAAAABAD",
  },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
