import { Router } from "express";
import controller from "./projectRepo.controller";

const projectRepoRouter = Router();

// /project-repos/
projectRepoRouter
  .route("/")
  .get(controller.findMany)
  .post(controller.createOne);

// /project-repos/count
projectRepoRouter.route("/count").get(controller.count);

// /project-repos/:id
projectRepoRouter
  .route("/:id")
  .get(controller.findOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default projectRepoRouter;
