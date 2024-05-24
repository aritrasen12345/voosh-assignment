import mongoose from "mongoose";
const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    photo: {
      type: Schema.Types.String,
      required: true,
    },
    bio: {
      type: Schema.Types.String,
      required: true,
    },
    phone: {
      type: Schema.Types.String,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("profile", profileSchema);
