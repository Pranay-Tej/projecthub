import { Router } from "express";
import { protect } from "../../util/auth.util";
import controller from "./project.controller";

const projectRouter = Router();

// /projects/
projectRouter
  .route("/")
  .get(controller.findMany)
  .post(protect, controller.createOne);

// /projects/count
projectRouter.route("/count").get(controller.count);

// /projects/:id
projectRouter
  .route("/:id")
  .get(controller.findOne)
  .put(protect, controller.updateOne)
  .delete(protect, controller.deleteOne);

export default projectRouter;
