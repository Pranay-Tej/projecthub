import { Request, Response } from "express";
import { Model } from "mongoose";
import { isAuthorized } from "../../util/auth.util";
import crudController from "../../util/crud.util";
import ProjectRepo from "../projectRepo/projectRepo.model";
import Project from "./project.model";

const deleteOne =
  (model: Model<any>) => async (req: Request, res: Response) => {
    try {
      const isAuthorizedOperation: boolean = await isAuthorized(
        model,
        req.params.id,
        res.locals.USER._id
      );
      if (isAuthorizedOperation === false) {
        console.error("forbidden");
        return res.status(403).send("forbidden!").end();
      }

      // delete linked ProjectRepo(s) before deleting the project
      const { deletedCount: deletedProjectRepos } =
        await ProjectRepo.deleteMany({
          projectId: req.params.id,
        });
      console.log(`Deleted ${deletedProjectRepos} linked ProjectRepo(s)`);

      const { deletedCount = 0 } = await model.deleteOne({
        _id: req.params.id,
      });
      if (deletedCount === 0) {
        return res.status(404).json(`${model.modelName} not found`).end();
      }

      res.status(204).end();
    } catch (e) {
      console.error(e);
      res.status(400).json(e).end();
    }
  };

// override deleteOne of crudController
const projectController = {
  ...crudController(Project),
  deleteOne: deleteOne(Project),
};

export default projectController;
