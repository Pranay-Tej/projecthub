import { Router } from "express";
import { protect } from "../../util/auth.util";
import controller from "./profile.controller";

const profileRouter = Router();

// /profile/
profileRouter.get("/", protect, controller.myProfile);

// /profile/:username
profileRouter.get("/:username", controller.userProfile);

export default profileRouter;
