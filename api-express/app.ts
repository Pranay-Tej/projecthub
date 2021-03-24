import cors from "cors";
import express from "express";
import morgan from "morgan";
import config from "./config/config";
import projectRouter from "./resources/project/project.router";
import projectRepoRouter from "./resources/projectRepo/projectRepo.router";
import mongoose from "./util/db.util";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use("/projects", projectRouter);

app.use("/project-repos", projectRepoRouter);

mongoose.connect(
  config.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  () => {
    console.log("Connected to DB");
  }
);

app.listen(config.PORT, () => {
  console.log(`server started at http://localhost:${config.PORT}`);
});
