import profileModel from "../../models/profile.model.js";
import ProfileModel from "../../models/profile.model.js";

class ProfileController {
  constructor() {}

  // * Get profile details
  async getDetails(req, res, next) {
    try {
      const { isPublicUser } = req.body;

      // * If Public profile show him all Public profiles
      // * If Private Profile show him all Profiles
      const profileDetails = await ProfileModel.find(
        isPublicUser ? { isPublic: true } : {}
      );

      res.status(200).json({
        status: "success",
        message: "Fetched profile details successfully!",
        data: profileDetails,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default ProfileController;
