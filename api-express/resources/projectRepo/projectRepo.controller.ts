import { Request, Response } from "express";
import { Model } from "mongoose";
import crudController from "../../util/crud.util";
import ProjectRepo from "./projectRepo.model";

const deleteProjectRepo =
  (model: Model<any>) => async (req: Request, res: Response) => {
    try {
      const { projectId, repoId } = req.params;
      const doc = await model.findOne({ projectId, repoId }).lean().exec();

      if (doc && doc.userId != res.locals.USER._id) {
        console.error("forbidden");
        return res.status(403).send("forbidden!").end();
      }

      const { deletedCount = 0 } = await model.deleteOne({ projectId, repoId });
      if (deletedCount === 0) {
        return res.status(404).json(`${model.modelName} not found`).end();
      }

      res.status(204).end();
    } catch (e) {
      console.error(e);
      res.status(400).json(e).end();
    }
  };

const projectRepoController = {
  ...crudController(ProjectRepo),
  deleteProjectRepo: deleteProjectRepo(ProjectRepo),
};

export default projectRepoController;
