import { Request, Response, Router } from "express";
import { compare, hash } from "bcryptjs";
import User from "./user.model";
import { sign, verify } from "jsonwebtoken";
import config from "../../config/config";
const authRouter = Router();

const newToken = (user: any) => {
  return sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: 24 * 60 * 60 /* 1 day */,
    // expiresIn: 10 /* 10 seconds */,
  });
};

// /user/register
authRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const passwordHash = await hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: passwordHash,
    });

    res.cookie("jwt", newToken(user.toJSON()), {
      httpOnly: true /* frontend cannot access this cookie, hence secure */,
      maxAge: 24 * 60 * 60 * 1000 /* 1 day */,
    });

    res.status(201).json("success");
  } catch (e) {
    console.error(e);
    res.status(400).json(e).end();
  }
});

// /user/login
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw "invalid credentials!";
    }

    const passwordCheck = await compare(password, user.toJSON().password);
    if (!passwordCheck) {
      throw "invalid credentials!";
    }

    // // manual set token in client localStorage
    // res.status(200).json({ jwt: newToken(user.toJSON()) });
    // console.log(user);

    // cookie method
    res.cookie("jwt", newToken(user.toJSON()), {
      httpOnly: true /* frontend cannot access this cookie, hence secure */,
      maxAge: 24 * 60 * 60 * 1000 /* 1 day */,
      // maxAge: 60 * 1000 /* 1 day */,
    });

    res.status(200).json("success");
  } catch (e) {
    console.error(e);
    res.status(401).json(e).end();
  }
});

// /user
authRouter.get("/", async (req: Request, res: Response) => {
  try {
    // cookie method
    const token = req.cookies?.jwt;
    if (!token) {
      throw "unauthenticated!";
    }

    const { id } = verify(token, config.JWT_SECRET) as any;
    // console.log(id);

    const user = await User.findOne({ _id: id }, { password: 0 });

    if (!user) {
      throw "unauthenticated!";
    }

    res.status(200).json(user);
  } catch (e) {
    res.status(401).json(e).end();
  }
});

// user/logout
authRouter.post("/logout", (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, maxAge: 0 });
    res.status(200).json("success");
  } catch (e) {
    res.status(400).json(e).end();
  }
});

export default authRouter;
