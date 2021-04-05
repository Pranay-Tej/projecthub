import { Router } from "express";
import controller from "./repo.controller";
const repoRouter = Router();

// /repos
repoRouter.route("/").get(controller.findMany).post(controller.createOne);

// /repos/count
repoRouter.route("/count").get(controller.count);

// /repos/:id
repoRouter
  .route("/:id")
  .get(controller.findOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default repoRouter;
