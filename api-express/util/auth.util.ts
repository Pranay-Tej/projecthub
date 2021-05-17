import { verify, sign } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../resources/user/user.model";
import config from "../config/config";
import { Model } from "mongoose";

export const newToken = (user: any) => {
  return sign({ id: user._id }, config.JWT_SECRET, {
    // expiresIn: 24 * 60 * 60 /* 1 day */,
    expiresIn: "1d" /* 1 day */,
    // expiresIn: "60s" /* 10 seconds */,
  });
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("checking user authentication...");

    // token method
    const bearerToken: string = req.header("Authorization") as string;
    if (!bearerToken) {
      throw "unauthenticated!";
    }

    if (typeof bearerToken === undefined) {
      throw "unauthenticated!";
    }

    const token = bearerToken.split("Bearer ")[1];
    const decoded: any = verify(token, config.JWT_SECRET);

    const user = await User.findOne(
      { _id: decoded.id },
      { password: 0, email: 0 }
    )
      .lean()
      .exec();

    if (!user) {
      throw "unauthenticated!";
    }
    // pass data to next middleware
    res.locals.USER = user;
    next();

    // // cookie method
    // const token = req.cookies?.jwt;
    // if (!token) {
    //   throw "unauthenticated!";
    // }

    // const { id } = verify(token, config.JWT_SECRET) as any;
    // const user = await User.findOne({ _id: id }, { password: 0, email: 0 }).lean().exec();

    // if (!user) {
    //   throw "unauthenticated!";
    // }
    // // pass data to next middleware
    // res.locals.user = id;
    // next();
  } catch (e) {
    console.error(e);
    res.status(401).send(e).end();
  }
};

export const isAuthorized = async (
  model: Model<any>,
  id: string,
  userId: string
) => {
  const doc = await model.findOne({ _id: id }).lean().exec();
  if (doc.userId != userId) {
    return false;
  }
  return true;
};
