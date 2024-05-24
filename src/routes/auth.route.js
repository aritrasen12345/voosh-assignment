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

router.post(
  "/register",
  [
    body("email").notEmpty().isEmail(),
    body("password")
      .notEmpty()
      .isStrongPassword()
      .withMessage("Password is too weak. Please use a strong password!"),
    body("isAdmin").isBoolean(),
    body("name").isString().notEmpty(),
    body("photo").isString(),
    body("bio").isString(),
    body("phone").isNumeric().isLength(10),
  ],
  validateErrorHandler,
  authController.register
);

export default router;
