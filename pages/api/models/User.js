const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    username: {
      type: String,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
    },
    telegram: {
      type: String,
      default: "",
    },
    profile_pic: {
      type: String,
      default: "/img/apu_profile.png",
    },
    profile_banner: {
      type: String,
      default: "apu_banner.png",
    },
    country: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    occupation: {
      type: String,
      default: "",
      lowercase: true,
    },
    height: {
      type: mongoose.Decimal128,
      default: 0,
    },
    phrase: {
      type: String,
      default: "",
      lowercase: true,
    },
    about: {
      type: String,
      default: "",
      lowercase: true,
    },
    role: {
      type: String,
      default: "user",
    },
    post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
