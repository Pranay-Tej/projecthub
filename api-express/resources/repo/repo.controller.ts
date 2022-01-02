import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import CustomErrors from "../../errors";
import StatusCodes from "../../types/status-codes";
import { isAuthorized } from "../../util/auth.util";
import crudController from "../../util/crud.util";
import ProjectRepo from "../projectRepo/projectRepo.model";
import Repo from "./repo.model";

const deleteOne =
  (model: Model<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isAuthorizedOperation: boolean = await isAuthorized(
        model,
        req.params.id,
        res.locals.USER._id
      );
      if (isAuthorizedOperation === false) {
        console.error("forbidden");
        return next(new CustomErrors.ForbiddenError());
      }

      // delete linked ProjectRepo(s) before deleting the repo
      const { deletedCount: deletedProjectRepos } =
        await ProjectRepo.deleteMany({
          repoId: req.params.id,
        });
      console.log(`Deleted ${deletedProjectRepos} linked ProjectRepo(s)`);

      const { deletedCount = 0 } = await model.deleteOne({
        _id: req.params.id,
      });
      if (deletedCount === 0) {
        return next(new CustomErrors.NotFoundError(model.modelName));
      }

      res.status(StatusCodes.NO_CONTENT).end();
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).json(err).end();
    }
  };

export default { ...crudController(Repo), deleteOne: deleteOne(Repo) };
