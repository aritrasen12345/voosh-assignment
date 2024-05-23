import jwt from "jsonwebtoken";

class AuthHelper {
  async generateToken(user) {
    return new Promise(async (resolve, reject) => {
      try {
        // * Generating the access token
        const token = await jwt.sign(
          { id: user._id, isAdmin },
          process.env.ACCESS_TOKEN_SECRET_KEY,
          {
            /**
             * 1 second = 1000 ms
             * so 10 Minutes = 10 * 60 seconds = 10 *60 * 1000 ms
             */
            expiresIn: 10 * 60 * 1000,
          }
        );

        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default Object.freeze(new AuthHelper());
