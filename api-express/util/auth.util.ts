import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../resources/user/user.model";
import config from "../config/config";

const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // manual set token in client localStorage
    // const bearerToken: string = req.header("Authorization") as string;
    // if (!bearerToken) {
    //   throw "Unauthorized!";
    // }

    // if (typeof bearerToken !== undefined) {
    //   const token = bearerToken.split("Bearer ")[1];
    //   const id = jwt.verify(token, config.JWT_SECRET);
    //   const user = User.findById(id);
    //   if (!user) {
    //     throw "Unauthorized!";
    //   }
    //   req.body.AUTH_ID = id;
    //   next();
    // } else {
    //   throw "Unauthorized!";
    // }

    // cookie method
    const token = req.cookies?.jwt;
    if (!token) {
      throw "unauthenticated!";
    }

    const { id } = verify(token, config.JWT_SECRET) as any;
    const user = await User.findOne({ _id: id }, { password: 0, email: 0 });

    if (!user) {
      throw "unauthenticated!";
    }
    // pass data to next middleware
    res.locals.user = id;
    next();
  } catch (e) {
    res.status(401).send(e).end();
  }
};

export default protect;
