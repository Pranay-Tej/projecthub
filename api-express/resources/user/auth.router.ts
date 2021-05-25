import { Request, Response, Router } from "express";
import { compare, hash } from "bcryptjs";
import User from "./user.model";
import { protect, newToken } from "../../util/auth.util";
import seed from "../../util/seed.util";
const authRouter = Router();

// /user/register
authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !password) {
      throw "bad request";
    }
    const passwordHash = await hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: passwordHash,
    });

    // seed default data (projects, repos, projectRepoS)
    await seed(user.username, user._id);

    // token method
    res.status(201).json({ jwt: newToken(user.toJSON()) });

    // // cookie method
    // res.cookie("jwt", newToken(user.toJSON()), {
    //   httpOnly: true /* frontend cannot access this cookie, hence secure */,
    //   maxAge: 24 * 60 * 60 * 1000 /* 1 day */,
    //   // maxAge: 60 * 1000 /* 1 day */,
    //   sameSite: "strict",
    // });

    // res.status(201).json("success");
  } catch (e) {
    console.error(e);
    res.status(400).json(e).end();
  }
});

// /user/login
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { identity, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: identity }, { username: identity }],
    })
      .lean()
      .exec();

    if (!user) {
      throw "invalid credentials!";
    }

    const passwordCheck = await compare(password, user.password);
    if (!passwordCheck) {
      throw "invalid credentials!";
    }

    // token method
    res.status(200).json({ jwt: newToken(user) });

    // // cookie method
    // res.cookie("jwt", newToken(user.toJSON()), {
    //   httpOnly: true /* frontend cannot access this cookie, hence secure */,
    //   maxAge: 24 * 60 * 60 * 1000 /* 1 day */,
    //   // maxAge: 60 * 1000 /* 1 day */,
    //   sameSite: "strict",
    // });

    // res.status(200).json("success");
  } catch (e) {
    console.error(e);
    res.status(401).json(e).end();
  }
});

// /user
authRouter.get("/", protect, async (req: Request, res: Response) => {
  try {
    // token method
    const user = res.locals.USER;

    res.status(200).json(user);

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
  } catch (e) {
    res.status(401).json(e).end();
  }
});

// user/logout
authRouter.post("/logout", (req: Request, res: Response) => {
  try {
    // res.cookie("jwt", "", { httpOnly: true, maxAge: 0, sameSite: "strict" });
    res.status(200).json("success");
  } catch (e) {
    res.status(400).json(e).end();
  }
});

// user/check-username/:username
authRouter.get(
  "/check-username/:username",
  async (req: Request, res: Response) => {
    try {
      const { username } = req.params;
      const user = await User.findOne({ username }, { password: 0, email: 0 })
        .lean()
        .exec();
      if (user) {
        throw "username unavailable";
      }
      res.status(200).json("ok");
    } catch (e) {
      res.status(400).json(e).end();
    }
  }
);

// user/check-email/:email
authRouter.get("/check-email/:email", async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email }, { password: 0, email: 0 })
      .lean()
      .exec();
    if (user) {
      throw "email unavailable";
    }
    res.status(200).json("ok");
  } catch (e) {
    res.status(400).json(e).end();
  }
});

export default authRouter;
