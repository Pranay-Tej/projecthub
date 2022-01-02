import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import CustomErrors from "../../errors";
import StatusCodes from "../../types/status-codes";
import crudController from "../../util/crud.util";
import ProjectRepo from "./projectRepo.model";

const deleteProjectRepo =
  (model: Model<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { projectId, repoId } = req.params;
      const doc = await model.findOne({ projectId, repoId }).lean().exec();

      if (doc && doc.userId != res.locals.USER._id) {
        return next(new CustomErrors.ForbiddenError());
      }

      const { deletedCount = 0 } = await model.deleteOne({ projectId, repoId });
      if (deletedCount === 0) {
        return next(new CustomErrors.NotFoundError(model.modelName));
      }

      res.status(StatusCodes.NO_CONTENT).end();
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).json(err).end();
    }
  };

const projectRepoController = {
  ...crudController(ProjectRepo),
  deleteProjectRepo: deleteProjectRepo(ProjectRepo),
};

export default projectRepoController;
