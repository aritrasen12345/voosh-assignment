import express from "express";
import { body } from "express-validator";

import validateErrorHandler from "../middlewares/validationErrorHandler.middleware.js";
import UserController from "../controllers/user/user.controller.js";

const router = express.Router();

const userController = new UserController();

export default router;
