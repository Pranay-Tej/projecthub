import mongoose from "mongoose";
import ProjectRepo, {
  projectRepoModelName,
} from "../projectRepo/projectRepo.model";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
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
  { timestamps: true }
);

// projectSchema.pre("deleteOne", async function () {
//   console.log("remove", (this as any)._conditions?._id);
//   await ProjectRepo.deleteMany({
//     projectId: (this as any)._conditions?._id,
//   });
// });

// for a user, project name is unique
projectSchema.index({ user: 1, name: 1 }, { unique: true });

export const projectModelName = "Project";

const Project = mongoose.model(projectModelName, projectSchema);

export default Project;
