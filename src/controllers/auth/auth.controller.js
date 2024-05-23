import AuthService from "../../services/auth.service.js";

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
  // * Register User
}

export default AuthController;
