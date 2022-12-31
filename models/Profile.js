import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
    nickname: {
        type: String,
    },
    firstName: {
        type: String,
      },
    lastName: {
        type: String,
      },
    cover: {
        type: String,
      },
    position: {
        type: String,
      },
    bio: {
        type: String,
      },
    link: {
        type: String,
      },
    }
)

export default mongoose.model("Profile", ProfileSchema);