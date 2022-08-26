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
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import errorHandlerMiddleware from "./middleware/error-handler.middleware";
import notFoundMiddleware from "./middleware/route-not-found.middleware";

const app = express();

// Middleware
const limit = rateLimit({
  max: 100, // max requests
  windowMs: 60 * 60 * 1000, // 1 Hour
  message: "Too many requests", // message to send
});
app.use(limit); // Setting limiter on specific route
app.use(helmet());
app.use(cors());
// app.use(
//   cors({
//     // // cookie method
//     // credentials: true /* enables cookie exchange */,
//     // // origin mandatory for cookie method
//     origin: config.DOMAINS,
//   })
// );
app.use(express.json({ limit: "50kb" })); // Body limit is 50
app.use(cookieParser());
app.use(morgan("dev"));

// API Documentation
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.get("/", (req, res) => {
  res.json("Hello world!");
});

app.use("/user", authRouter);

app.use("/repos", protect, repoRouter);

app.use("/projects", protect, projectRouter);

app.use("/project-repos", protect, projectRepoRouter);

app.use("/profile", profileRouter);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

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
  .catch((err) => {
    console.error("mongodb connection failure");
    console.error(err);
  });
