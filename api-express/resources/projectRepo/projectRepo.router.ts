import { Router } from "express";
import { protect } from "../../util/auth.util";
import controller from "./projectRepo.controller";

const projectRepoRouter = Router();

// /project-repos/
projectRepoRouter
  .route("/")
  .get(controller.findMany)
  .post(protect, controller.createOne);

// /project-repos/count
projectRepoRouter.route("/count").get(controller.count);

// /project-repos/:id
projectRepoRouter
  .route("/:id")
  .get(controller.findOne)
  .put(protect, controller.updateOne)
  .delete(protect, controller.deleteOne);

projectRepoRouter
  .route("/:projectId/:repoId")
  .delete(protect, controller.deleteProjectRepo);

export default projectRepoRouter;
