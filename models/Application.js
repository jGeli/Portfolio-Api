import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    application_date: {
        type: Date,
      },
    position: {
        type: String,
      },
    salary_low: {
        type: Number,
      },
    salary_high: {
        type: Number,
      },
    status: {
        type: String,
      },
    link: {
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


export default mongoose.model("Application", ApplicationSchema);