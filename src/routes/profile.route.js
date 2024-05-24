import express from "express";
import { body } from "express-validator";
import multer from "multer";
import path from "path";

import ProfileController from "../controllers/profile/profile.controller.js";
import validateErrorHandler from "../middlewares/validateErrorHandler.middleware.js";
import checkIfAdminUser from "../middlewares/checkIfAdminUser.middleware.js";
import checkAuth from "../middlewares/checkAuth.middleware.js";

// * Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
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

router.put(
  "/",
  [
    body("photo").optional().notEmpty().isString(),
    body("name").optional().notEmpty(),
    body("bio").optional().isString(),
    body("phone").optional().isNumeric().isLength(10),
    body("email").optional().notEmpty().isEmail(),
    body("password")
      .optional()
      .notEmpty()
      .isStrongPassword()
      .withMessage("Password is too weak. Please use a strong password!"),
  ],
  checkAuth,
  validateErrorHandler,
  profileController.updateProfile
);

router.put(
  "/photo",
  upload.single("photo"),
  checkAuth,
  validateErrorHandler,
  profileController.uploadProfilePic
);

export default router;
