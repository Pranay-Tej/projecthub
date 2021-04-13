import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import config from "./config/config";
import projectRouter from "./resources/project/project.router";
import projectRepoRouter from "./resources/projectRepo/projectRepo.router";
import repoRouter from "./resources/repo/repo.router";
import authRouter from "./resources/user/auth.router";
import mongoose from "mongoose";

const app = express();

// Middleware
app.use(
  cors({
    credentials: true /* enables cookie exchange */,
    //origin: ["http://localhost:4200"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/user", authRouter);

app.use("/repos", repoRouter);

app.use("/projects", projectRouter);

app.use("/project-repos", projectRepoRouter);

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("connected to db");
    app.listen(config.PORT, () => {
      console.log(`server started at http://localhost:${config.PORT}`);
    });
  })
  .catch((e) => {
    console.error("mongodb connection failure");
    console.error(e);
  });
