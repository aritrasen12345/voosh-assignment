import AuthService from "../../services/auth.service.js";
import ProfileService from "../../services/profile.service.js";

class AuthController {
  constructor() {}

  // * Login API
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const { token } = await AuthService.login(email, password);

      return res.status(200).json({
        status: "success",
        message: "User authenticated successfully!",
        data: {
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // * SignOut API
  async signOut(req, res, next) {
    try {
      const { userId } = req.body;

      await AuthService.signOut(userId);

      return res.status(200).json({
        status: "success",
        message: "User sign out successfully!",
        data: {},
      });
    } catch (error) {
      next(error);
    }
  }

  // * Register
  async register(req, res, next) {
    try {
      // * Create a new User
      const createdUser = await AuthService.register(req.body);

      const userId = createdUser._id;

      const createdProfile = await ProfileService.createProfile(
        req.body,
        userId
      );

      res.status(201).json({
        status: "success",
        message: "User created successfully!",
        data: {
          createdUser,
          createdProfile,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

export default AuthController;
