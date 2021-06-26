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
import { protect } from "./util/auth.util";
import profileRouter from "./resources/profile/profile.router";

const app = express();

// API Documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware
app.use(
  cors({
    // // cookie method
    // credentials: true /* enables cookie exchange */,
    // // origin mandatory for cookie method
    origin: config.DOMAINS,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json("Hello world!");
});

app.use("/user", authRouter);

app.use("/repos", protect, repoRouter);

app.use("/projects", protect, projectRouter);

app.use("/project-repos", protect, projectRepoRouter);

app.use("/profile", profileRouter);

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
