import ProfileModel from "../models/profile.model.js";

const checkIfPublicUser = async (req, res, next) => {
  try {
    // * Check for userId in the req obj
    const { userId } = req.body;

    const userProfile = await ProfileModel.findOne({
      userId,
    });

    // * Error while finding the user's profile
    if (!userProfile) {
      throw new Error(`Can't find the user profile!`, {
        cause: { indicator: "db", status: 500 },
      });
    }

    req.body.isPublicUser = userProfile.isPublic;

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

export default checkIfPublicUser;
