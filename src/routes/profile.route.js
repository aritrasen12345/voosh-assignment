import express from "express";
import { body } from "express-validator";

import ProfileController from "../controllers/profile/profile.controller.js";
import validateErrorHandler from "../middlewares/validateErrorHandler.middleware.js";
import checkIfAdminUser from "../middlewares/checkIfAdminUser.middleware.js";
import checkAuth from "../middlewares/checkAuth.middleware.js";

const router = express.Router();

const profileController = new ProfileController();

// * GET Profile Details
router.get(
  "/all",
  checkAuth,
  checkIfAdminUser,
  validateErrorHandler,
  profileController.getAllProfileDetails
);

router.get(
  "/",
  checkAuth,
  validateErrorHandler,
  profileController.getProfileDetails
);

router.get(
  "/toggle",
  checkAuth,
  validateErrorHandler,
  profileController.toggleProfileView
);

export default router;
