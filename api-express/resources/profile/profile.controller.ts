import { NextFunction, Request, Response } from "express";
import CustomErrors from "../../errors";
import StatusCodes from "../../types/status-codes";
import ProjectRepo from "../projectRepo/projectRepo.model";
import User from "../user/user.model";

const pipeline = [
  {
    $lookup: {
      from: "repos",
      localField: "repoId",
      foreignField: "_id",
      as: "repo",
    },
  },
  {
    $group: {
      _id: "$projectId",
      repos: {
        $addToSet: {
          $arrayElemAt: ["$repo", 0],
        },
      },
    },
  },
  {
    $lookup: {
      from: "projects",
      localField: "_id",
      foreignField: "_id",
      as: "project",
    },
  },
  {
    $unwind: {
      path: "$project",
    },
  },
];

const myProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({
      _id: res.locals.USER._id,
    })
      .lean()
      .exec();

    if (!user) {
      return next(new CustomErrors.NotFoundError("User"));
    }

    const profile = await ProjectRepo.aggregate([
      {
        $match: {
          userId: res.locals.USER._id.toString(),
        },
      },
      ...pipeline,
    ]).exec();

    res.status(StatusCodes.OK).json(profile);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json(err).end();
  }
};

const userProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({
      username: req.params.username,
    })
      .lean()
      .exec();

    if (!user) {
      return next(new CustomErrors.NotFoundError("User"));
    }

    const profile = await ProjectRepo.aggregate([
      {
        $match: {
          user: req.params.username,
        },
      },
      ...pipeline,
    ]).exec();

    res.status(StatusCodes.OK).json(profile);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json(err).end();
  }
};

const profileController = {
  myProfile,
  userProfile,
};

export default profileController;
