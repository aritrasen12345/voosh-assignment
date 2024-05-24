import express from "express";
import { body } from "express-validator";

import ProfileController from "../controllers/profile/profile.controller.js";
import validateErrorHandler from "../middlewares/validateErrorHandler.middleware.js";
import checkIfPublicUser from "../middlewares/checkIfPublicUser.middleware.js";
import checkAuth from "../middlewares/checkAuth.middleware.js";

const router = express.Router();

const profileController = new ProfileController();

// * GET Profile Details
router.get(
  "/",
  checkAuth,
  checkIfPublicUser,
  validateErrorHandler,
  profileController.getDetails
);

export default router;
