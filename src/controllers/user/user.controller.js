import UserService from "../../services/user.service.js";

class UserController {
  constructor() {}

  // * Register APi
  async register(req, res, next) {
    try {
      // * Create a new User
      const createdUser = await UserService.register(req.body);

      res.status(201).json({
        status: "success",
        message: "User created successfully!",
        data: {
          createdUser,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
