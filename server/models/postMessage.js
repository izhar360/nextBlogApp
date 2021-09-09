import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
  },
  message: String,
  blockContent: [],
  creator: String,
  tags: [String],
  selectedFile: String,
  comments: [
    {
      author: String,
      text: String,
      createdAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],
  likeCount: {
    type: Number,
    default: 0,
  },
  likes: [],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  slug: String,
});

postSchema.pre("save", function () {
  this.slug = this._id;
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
