import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("conversations", ConversationSchema);
