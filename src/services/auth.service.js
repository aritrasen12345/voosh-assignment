import bcrypt from "bcrypt";

import userModel from "../models/user.model.js";
import AuthHelper from "../helpers/auth.helper.js";

class AuthService {
  constructor() {}

  async login(email, password, isAdmin) {
    return new Promise(async (resolve, reject) => {
      try {
        const existingUser = await userModel.findOne({
          email,
        });

        if (!existingUser) {
          throw new Error(`No user found with the given email!`, {
            cause: {
              indicator: "not_found",
              status: 400,
            },
          });
        }

        // * Comparing password
        const isCorrect = await bcrypt.compare(password, existingUser.password);

        // * If the password is wrong
        if (!isCorrect) {
          throw new Error(
            `Incorrect password. Please provide the correct password!`,
            {
              cause: {
                indicator: "auth",
                status: 401,
              },
            }
          );
        }

        const token = await AuthHelper.generateToken(existingUser);

        // * If everything was successful
        resolve({ token });
      } catch (err) {
        reject(err);
      }
    });
  }

  async signOut(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const loggedOutUser = await userModel.findByIdAndUpdate(
          userId,
          {
            token: null,
          },
          { new: true }
        );

        if (!loggedOutUser) {
          throw new Error(`Unable to logged out user!`, {
            cause: { indicator: "auth", status: 401 },
          });
        }

        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

/**
 * By using Object.freeze() we are making sure that this object is immutable
 */
export default Object.freeze(new AuthService());
