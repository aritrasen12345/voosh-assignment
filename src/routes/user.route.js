import express from "express";
import { body } from "express-validator";

import validateErrorHandler from "../middlewares/validationErrorHandler.middleware.js";
import UserController from "../controllers/user/user.controller.js";

const router = express.Router();

const userController = new UserController();

router.post(
  "/register",
  [
    body("email").notEmpty().isEmail(),
    body("password")
      .notEmpty()
      .isStrongPassword()
      .withMessage("Password is too weak. Please use a strong password!"),
    body("isAdmin").isBoolean(),
  ],
  validateErrorHandler,
  userController.register
);

export default router;
