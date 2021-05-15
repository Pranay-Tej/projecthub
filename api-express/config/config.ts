import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/project-hub",
  JWT_SECRET: (process.env.JWT_SECRET as string) || "secret-string",
  DOMAINS: [
    "http://localhost:4200",
    "https://projecthub.vercel.app",
    "https://projecthub-dev.netlify.app",
  ],
};

export default config;
