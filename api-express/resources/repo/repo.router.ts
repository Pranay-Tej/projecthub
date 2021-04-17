import { Router } from "express";
import protect from "../../util/auth.util";
import controller from "./repo.controller";
const repoRouter = Router();

// /repos
repoRouter
  .route("/")
  .get(controller.findMany)
  .post(protect, controller.createOne);

// /repos/count
repoRouter.route("/count").get(controller.count);

// /repos/:id
repoRouter
  .route("/:id")
  .get(controller.findOne)
  .put(protect, controller.updateOne)
  .delete(protect, controller.deleteOne);

export default repoRouter;
