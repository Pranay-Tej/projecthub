import { Router } from "express";
import controller from "./project.controller";

const projectRouter = Router();

// /projects/
projectRouter.route("/").get(controller.findMany).post(controller.createOne);

// /projects/count
projectRouter.route("/count").get(controller.count);

// /projects/:id
projectRouter
  .route("/:id")
  .get(controller.findOne)
  .put(controller.updateOne)
  .delete(controller.deleteOne);

export default projectRouter;
