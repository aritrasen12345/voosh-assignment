import express from "express";
import { body } from "express-validator";

import AuthController from "../controllers/auth/auth.controller.js";
import validateErrorHandler from "../middlewares/validationErrorHandler.middleware.js";
import checkAuth from "../middlewares/checkAuth.middleware.js";

const router = express.Router();

const authController = new AuthController();

router.post(
  "/login",
  [body("email").notEmpty().isEmail(), body("password").notEmpty()],
  validateErrorHandler,
  authController.login
);

router.get("/signout", checkAuth, validateErrorHandler, authController.signOut);

export default router;
