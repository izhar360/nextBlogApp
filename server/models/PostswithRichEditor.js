import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  blockContent: [],
  creator: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostswithRichEditor = mongoose.model("PostswithRichEditor", postSchema);

export default PostswithRichEditor;
