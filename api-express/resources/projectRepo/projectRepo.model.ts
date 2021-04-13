import { repoModelName } from "./../repo/repo.model";
import mongoose from "mongoose";
import { projectModelName } from "../project/project.model";

const projectRepoSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: projectModelName,
      required: true,
    },
    repoId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: repoModelName,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

projectRepoSchema.pre("find", function () {
  this.populate("projectId").populate("repoId");
});

// for each project, repos are unique
projectRepoSchema.index({ projectId: 1, repoId: 1 }, { unique: true });

export const projectRepoModelName = "ProjectRepo";

const ProjectRepo = mongoose.model(projectRepoModelName, projectRepoSchema);

export default ProjectRepo;
