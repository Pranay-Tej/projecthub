import mongoose from "mongoose";

const repoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

repoSchema.index({ name: 1, user: 1 }, { unique: true });

export const repoModelName = "Repo";

const Repo = mongoose.model(repoModelName, repoSchema);

export default Repo;
