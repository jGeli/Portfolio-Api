import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    profile: {
      type: mongoose.Schema.ObjectId,
      ref: "Profile",
      // required: true
    },
    contents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Content"
    }],
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
      index: true,
    }, 
    cover: {
      type: String,
    }, 
    username: {
      type: String,
    }
  },
);

export default mongoose.model("User", UserSchema);
