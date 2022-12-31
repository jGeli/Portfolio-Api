import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    name: {
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


export default mongoose.model("Company", CompanySchema);