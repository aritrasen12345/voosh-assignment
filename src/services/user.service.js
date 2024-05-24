import UserProfile from "../models/user.model.js";
import authService from "./auth.service.js";
class UserService {
  constructor() {}

  async updateUser(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { userId, email, password } = payload;
        const updatedProperties = {};
        if (email) updatedProperties.email = email;
        if (password) {
          const hashedPassword = await authService.hashPassword(password);
          updatedProperties.password = hashedPassword;
        }
        const updatedUser = await UserProfile.findByIdAndUpdate(
          userId,
          updatedProperties,
          { new: true }
        );

        if (!updatedUser) {
          throw new Error(`Error while updating user details!`, {
            cause: { indicator: "db", status: 500 },
          });
        }

        resolve(updatedUser);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default new UserService();
