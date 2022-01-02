import { Model } from "mongoose";
import { NextFunction, Request, Response } from "express";
import { isAuthorized } from "./auth.util";
import StatusCodes from "../types/status-codes";
import CustomErrors from "../errors";

const count = (model: Model<any>) => async (req: Request, res: Response) => {
  try {
    const { ...filters } = req.query;
    const count = await model.countDocuments({ ...filters });
    // console.log(count);
    res.status(StatusCodes.OK).json({ count });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json(err).end();
  }
};

const findOne =
  (model: Model<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const doc = await model
        .findOne({
          _id: req.params.id,
          userId: res.locals.USER._id,
          user: res.locals.USER.username,
        })
        .lean()
        .exec();
      if (!doc) {
        return next(new CustomErrors.NotFoundError(model.modelName));
      }

      res.status(StatusCodes.OK).json(doc);
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).json(err).end();
    }
  };

const findMany = (model: Model<any>) => async (req: Request, res: Response) => {
  const {
    _sort = "updatedAt",
    _order = -1,
    _page = 0,
    _limit = 100,
    ...filters
  } = req.query;
  try {
    let sortCriteria = {} as any;
    sortCriteria[_sort as string] = _order;
    const limit = _limit != "-1" ? parseInt(_limit as string) : NaN;
    // console.log(sortCriteria);
    // console.log(limit);
    const docs = await model
      .find({
        ...filters,
        userId: res.locals.USER._id,
        user: res.locals.USER.username,
      })
      .sort({ ...sortCriteria })
      .limit(limit)
      .skip(parseInt(_page as string) * limit)
      .lean()
      .exec();

    res.status(StatusCodes.OK).json(docs);
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.BAD_REQUEST).json(err).end();
  }
};

const createOne =
  (model: Model<any>) => async (req: Request, res: Response) => {
    try {
      const doc = await model.create({
        ...req.body,
        user: res.locals.USER.username,
        userId: res.locals.USER._id,
      });
      res.status(StatusCodes.CREATED).json(doc);
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).json(err).end();
    }
  };

const updateOne =
  (model: Model<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isAuthorizedOperation: boolean = await isAuthorized(
        model,
        req.params.id,
        res.locals.USER._id
      );
      if (isAuthorizedOperation === false) {
        return next(new CustomErrors.ForbiddenError());
      }

      const updatedDoc = await model
        .findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          upsert: true,
        })
        .lean()
        .exec();

      if (!updatedDoc) {
        return next(new CustomErrors.BadRequestError());
      }

      res.status(StatusCodes.OK).json(updatedDoc);
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).json(err).end();
    }
  };

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

      // const removed = await model.findByIdAndDelete(req.params.id);
      const { deletedCount = 0 } = await model.deleteOne({
        _id: req.params.id,
      });
      // console.log(deletedCount);
      if (deletedCount === 0) {
        return next(new CustomErrors.NotFoundError(model.modelName));
      }

      res.status(StatusCodes.NO_CONTENT).end();
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).json(err).end();
    }
  };

const crudController = (model: Model<any>) => ({
  count: count(model),
  findOne: findOne(model),
  findMany: findMany(model),
  createOne: createOne(model),
  updateOne: updateOne(model),
  deleteOne: deleteOne(model),
});

export default crudController;
