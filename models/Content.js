import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  type: {
    type: String,
  },
    title: {
        type: String,
      },
    subtitle: {
        type: String,
      },
    cover: {
        type: String,
      },
    icon: {
        type: String,
      },
    description: {
        type: String,
      },
    link: {
        type: String,
      },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content',
        require: false
    },
    contents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Content'
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
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


export default mongoose.model("Content", ContentSchema);