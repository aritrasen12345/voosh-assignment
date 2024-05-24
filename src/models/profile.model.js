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
      type: Schema.Types.Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("profile", profileSchema);
