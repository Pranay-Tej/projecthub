import { Model } from "mongoose";
import { Request, Response } from "express";
import { isAuthorized } from "./auth.util";

const count = (model: Model<any>) => async (req: Request, res: Response) => {
  try {
    const { ...filters } = req.query;
    const count = await model.countDocuments({ ...filters });
    // console.log(count);
    res.status(200).json({ count });
  } catch (e) {
    console.error(e);
    res.status(400).json(e).end();
  }
};

const findOne = (model: Model<any>) => async (req: Request, res: Response) => {
  try {
    const doc = await model.findOne({ _id: req.params.id }).lean().exec();
    if (!doc) {
      return res.status(404).json(`${model.modelName} not found`).end();
    }

    res.status(200).json(doc);
  } catch (e) {
    console.error(e);
    res.status(400).json(e).end();
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
      .find({ ...filters })
      .sort({ ...sortCriteria })
      .limit(limit)
      .skip(parseInt(_page as string) * limit)
      .lean()
      .exec();

    res.status(200).json(docs);
  } catch (e) {
    console.error(e);
    res.status(400).json(e).end();
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
      res.status(201).json(doc);
    } catch (e) {
      console.error(e);
      res.status(400).json(e).end();
    }
  };

const updateOne =
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

      const updatedDoc = await model
        .findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          upsert: true,
        })
        .lean()
        .exec();

      if (!updatedDoc) {
        return res.send(400).end();
      }

      res.status(200).json(updatedDoc);
    } catch (e) {
      console.error(e);
      res.status(400).json(e).end();
    }
  };

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

      // const removed = await model.findByIdAndDelete(req.params.id);
      const { deletedCount = 0 } = await model.deleteOne({
        _id: req.params.id,
      });
      // console.log(deletedCount);
      if (deletedCount === 0) {
        return res.status(404).json(`${model.modelName} not found`).end();
      }

      res.status(204).end();
    } catch (e) {
      console.error(e);
      res.status(400).json(e).end();
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
