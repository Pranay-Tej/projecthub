import mongoose from "mongoose";
import { Request, Response } from "express";
import ProjectRepo from "../projectRepo/projectRepo.model";

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

const myProfile = async (req: Request, res: Response) => {
  try {
    // console.log(res.locals.USER._id);

    const profile = await ProjectRepo.aggregate([
      {
        $match: {
          userId: res.locals.USER._id.toString(),
        },
      },
      ...pipeline,
    ]).exec();

    if (!profile) {
      return res.status(404).json(`user not found`).end();
    }

    res.status(200).json(profile);
    // res.status(200).json(res.locals.USER._id);
  } catch (e) {
    console.error(e);
    res.status(400).json(e).end();
  }
};

const userProfile = async (req: Request, res: Response) => {
  try {
    // console.log(req.params.username);

    const profile = await ProjectRepo.aggregate([
      {
        $match: {
          user: req.params.username,
        },
      },
      ...pipeline,
    ]).exec();

    // console.log(profile);

    if (!profile) {
      return res.status(404).json(`user not found`).end();
    }

    res.status(200).json(profile);
    // res.status(200).json(req.params.username);
  } catch (e) {
    console.error(e);
    res.status(400).json(e).end();
  }
};

const profileController = {
  myProfile,
  userProfile,
};

export default profileController;
