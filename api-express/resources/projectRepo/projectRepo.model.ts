import { CallbackError } from "mongoose";
import mongoose from "../../util/db.util";
import { projectModelName } from "../project/project.model";

const projectRepoSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: projectModelName,
      required: true,
    },
    repoId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

projectRepoSchema.pre("find", function () {
  this.populate("projectId");
});

// for each project, repos are unique
projectRepoSchema.index({ projectId: 1, repoId: 1 }, { unique: true });

export const projectRepoModelName = "ProjectRepo";

const projectRepoModel = mongoose.model(
  projectRepoModelName,
  projectRepoSchema
);

export default projectRepoModel;
