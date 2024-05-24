import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";
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
        const loggedOutUser = await UserModel.findByIdAndUpdate(
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

  async register(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, password, isAdmin } = payload;

        const existedUser = await UserModel.findOne({ email }).exec();

        if (existedUser) {
          throw new Error(`This ${email} is already registered!`, {
            cause: { indicator: "db", status: 404 },
          });
        }

        const hash = await bcrypt.hash(password, +process.env.SALT);

        const newUser = new UserModel({
          password: hash,
          email,
          isAdmin,
        });

        const createdUser = await newUser.save();

        if (createdUser) {
          const token = jwt.sign(
            {
              id: createdUser._id,
              isAdmin,
            },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            { expiresIn: "1d" }
          );

          createdUser.token = token;
          const setUserToken = await createdUser.save();

          if (!setUserToken) {
            throw new Error(
              new Error(`Unable to add token!`, {
                cause: {
                  indicator: "db",
                  status: 500,
                },
              })
            );
          }

          resolve(createdUser._doc);
        } else {
          reject(
            new Error(`Unable to create user. Something went wrong!`, {
              cause: {
                indicator: "db",
                status: 500,
              },
            })
          );
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}

/**
 * By using Object.freeze() we are making sure that this object is immutable
 */
export default Object.freeze(new AuthService());
