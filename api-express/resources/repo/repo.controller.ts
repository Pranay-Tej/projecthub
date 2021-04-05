import { Request, Response } from "express";
import { Model } from "mongoose";
import crudController from "../../util/crud.util";
import ProjectRepo from "../projectRepo/projectRepo.model";
import Repo from "./repo.model";

const deleteOne = (model: Model<any>) => async (
  req: Request,
  res: Response
) => {
  try {
    // delete linked ProjectRepo(s) before deleting the repo
    const { deletedCount: deletedProjectRepos } = await ProjectRepo.deleteMany({
      repoId: req.params.id,
    });
    console.log(`Deleted ${deletedProjectRepos} linked ProjectRepo(s)`);

    const { deletedCount = 0 } = await model.deleteOne({ _id: req.params.id });
    if (deletedCount === 0) {
      return res.status(400).end();
    }

    res.status(204).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export default { ...crudController(Repo), deleteOne: deleteOne(Repo) };
