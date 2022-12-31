import mongoose from "mongoose";

const RecruiterSchema = new mongoose.Schema({
    firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
    address: {
        type: String,
      },
    cover: {
        type: String,
      },
    email: {
        type: String,
      },
    contact: {
        type: String,
      },
    link: {
        type: String,
      },
    type: {
      type: String,
    },
    description: {
      type: Text,
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
    },
    {
    timestamps: true,
    }
)


export default mongoose.model("Recruiter", RecruiterSchema);