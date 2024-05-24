import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";

class UserService {
  constructor() {}

  async register(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, password, isAdmin } = payload;

        const existedUser = await UserModel.findOne({ email }).exec();

        if (existedUser) {
          reject(new Error(`This ${email} is already registered!`), {
            cause: { indicator: "db", status: 404 },
          });
          return;
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
            reject(
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

export default new UserService();
