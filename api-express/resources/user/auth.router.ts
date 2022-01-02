import { NextFunction, Request, Response, Router } from "express";
import { compare, hash } from "bcryptjs";
import User from "./user.model";
import { protect, newToken } from "../../util/auth.util";
import seed from "../../util/seed.util";
import CustomErrors from "../../errors";
import StatusCodes from "../../types/status-codes";
const authRouter = Router();

// /user/register
authRouter.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let { email, ...credentials } = req.body;
      if (email) {
        credentials = { ...credentials, email };
      }

      const { username, password } = credentials;
      if (!username || !password) {
        return next(
          new CustomErrors.BadRequestError("Username and password required")
        );
      }
      const passwordHash = await hash(password, 10);
      // let credentials = { username, password };
      const user = await User.create({
        ...credentials,
        password: passwordHash,
      });

      // seed default data (projects, repos, projectRepoS)
      await seed(user.username, user._id);

      // token method
      res.status(StatusCodes.CREATED).json({ jwt: newToken(user.toJSON()) });

      // // cookie method
      // res.cookie("jwt", newToken(user.toJSON()), {
      //   httpOnly: true /* frontend cannot access this cookie, hence secure */,
      //   maxAge: 24 * 60 * 60 * 1000 /* 1 day */,
      //   // maxAge: 60 * 1000 /* 1 day */,
      //   sameSite: "strict",
      // });

      // res.status(201).json("success");
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.BAD_REQUEST).json(err).end();
    }
  }
);

// /user/login
authRouter.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { identity, password } = req.body;

      const user = await User.findOne({
        $or: [{ email: identity }, { username: identity }],
      })
        .lean()
        .exec();

      if (!user) {
        return next(new CustomErrors.UnauthenticatedError());
      }

      const passwordCheck = await compare(password, user.password);
      if (!passwordCheck) {
        return next(new CustomErrors.UnauthenticatedError());
      }

      // token method
      res.status(StatusCodes.OK).json({ jwt: newToken(user) });

      // // cookie method
      // res.cookie("jwt", newToken(user.toJSON()), {
      //   httpOnly: true /* frontend cannot access this cookie, hence secure */,
      //   maxAge: 24 * 60 * 60 * 1000 /* 1 day */,
      //   // maxAge: 60 * 1000 /* 1 day */,
      //   sameSite: "strict",
      // });

      // res.status(200).json("success");
    } catch (err) {
      console.error(err);
      res.status(StatusCodes.UNAUTHORIZED).json(err).end();
    }
  }
);

// /user
authRouter.get(
  "/",
  protect,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // token method
      const user = res.locals.USER;

      res.status(StatusCodes.OK).json(user);

      // // cookie method
      // const token = req.cookies?.jwt;
      // if (!token) {
      //   throw "unauthenticated!";
      // }

      // const { id } = verify(token, config.JWT_SECRET) as any;

      // const user = await User.findOne({ _id: id }, { password: 0, email: 0 });

      // if (!user) {
      //   throw "unauthenticated!";
      // }

      // res.status(200).json(user);
    } catch (err) {
      res.status(StatusCodes.UNAUTHORIZED).json(err).end();
    }
  }
);

// user/logout
authRouter.post(
  "/logout",
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // res.cookie("jwt", "", { httpOnly: true, maxAge: 0, sameSite: "strict" });
      res.status(StatusCodes.OK).json("success");
    } catch (err) {
      res.status(StatusCodes.BAD_REQUEST).json(err).end();
    }
  }
);

// user/check-username/:username
authRouter.get(
  "/check-username/:username",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username }, { password: 0, email: 0 })
        .lean()
        .exec();
      if (!user) {
        return next(new CustomErrors.NotFoundError("Username"));
      }
      res.status(StatusCodes.OK).json("ok");
    } catch (err) {
      res.status(StatusCodes.NOT_FOUND).json(err).end();
    }
  }
);

// user/check-email/:email
authRouter.get(
  "/check-email/:email",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.params;
      const user = await User.findOne({ email }, { password: 0, email: 0 })
        .lean()
        .exec();
      if (!user) {
        return next(new CustomErrors.NotFoundError("Email"));
      }
      res.status(StatusCodes.OK).json("ok");
    } catch (err) {
      res.status(StatusCodes.NOT_FOUND).json(err).end();
    }
  }
);

export default authRouter;
