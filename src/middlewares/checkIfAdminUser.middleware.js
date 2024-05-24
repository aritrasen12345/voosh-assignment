import UserModel from "../models/user.model.js";

const checkIfAdminUser = async (req, res, next) => {
  try {
    // * Check for userId in the req obj
    const { userId } = req.body;

    const userProfile = await UserModel.findById(userId);

    // * Error while finding the user's profile
    if (!userProfile) {
      throw new Error(`Can't find the user profile!`, {
        cause: { indicator: "db", status: 500 },
      });
    }

    req.body.isAdmin = userProfile.isAdmin;

    next();
  } catch (err) {
    next(
      new Error(`Invalid User!`, {
        cause: {
          indicator: "auth",
          status: 401,
          details: err,
        },
      })
    );
  }
};

export default checkIfAdminUser;
