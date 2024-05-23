import AuthService from "../../services/auth.service.js";

class AuthController {
  constructor() {}

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
}

// * Login API

// * SignOut API

// * Register User

export default AuthController;
