import mongoose from "../../util/db.util";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// for a user, project name is unique
projectSchema.index({ user: 1, name: 1 }, { unique: true });

export const projectModelName = "Project";

const Project = mongoose.model(projectModelName, projectSchema);

export default Project;
