import { Model } from "mongoose";
import CustomErrors from "../errors";
import Project from "../resources/project/project.model";
import ProjectRepo from "../resources/projectRepo/projectRepo.model";
import Repo from "../resources/repo/repo.model";

const projects = [
  {
    name: "Angular Learning",
  },
  {
    name: "React Learning",
  },
];

const angularRepos = [
  {
    name: "Angular Forms",
  },
  {
    name: "NgRx",
  },
];
const reactRepos = [
  {
    name: "Formik",
  },
  {
    name: "React Router",
  },
];
const commonRepos = [
  {
    name: "Redux Patterns",
  },
];

const insertMany = async (
  data: any[],
  model: Model<any>,
  user: string,
  userId: string
) => {
  const dataToInsert = data.map((dataItem) => {
    return {
      ...dataItem,
      user,
      userId,
    };
  });
  // console.log(dataToInsert);

  try {
    await model.insertMany(dataToInsert);
  } catch (err) {
    console.error(err);
  }
};

const connectProjectRepos = async (
  projectName: string,
  repoList: any[],
  user: string,
  userId: string
) => {
  try {
    const project = await Project.findOne({ name: projectName, user, userId })
      .lean()
      .exec();

    if (!project) {
      throw new CustomErrors.NotFoundError("Project");
    }

    // projectRepoList = repoList.map((repo) => {

    // })
    repoList.forEach(async ({ name }) => {
      const repo = await Repo.findOne({ name, user, userId }).lean().exec();
      if (!repo) {
        throw new CustomErrors.NotFoundError("Repo");
      }
      // console.log(`connecting project ${project._id} to repo ${repo._id}`);
      const projectRepo = await ProjectRepo.create({
        projectId: project._id,
        repoId: repo._id,
        user,
        userId,
      });
    });
  } catch (err) {
    console.error(err);
  }
};

const seed = async (user: string, userId: string) => {
  try {
    console.log(`seeding data for ${user}`);
    // insert projects
    await insertMany(projects, Project, user, userId);
    console.log("created projects");
    // insert repos
    await insertMany(
      [...angularRepos, ...reactRepos, ...commonRepos],
      Repo,
      user,
      userId
    );
    console.log("created repos");
    // connect repos
    // angular
    await connectProjectRepos(projects[0].name, angularRepos, user, userId);
    await connectProjectRepos(projects[0].name, commonRepos, user, userId);
    // react
    await connectProjectRepos(projects[1].name, reactRepos, user, userId);
    await connectProjectRepos(projects[1].name, commonRepos, user, userId);
    console.log("created project repos connections");
  } catch (err) {
    console.error(err);
  }
};

export default seed;
