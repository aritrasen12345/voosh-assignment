import profileModel from "../../models/profile.model.js";
import ProfileModel from "../../models/profile.model.js";
import profileService from "../../services/profile.service.js";

class ProfileController {
  constructor() {}

  // * Get all profile details
  async getAllProfileDetails(req, res, next) {
    try {
      const { isPublicUser } = req.body;

      const profileDetails = await profileService.getAllProfileDetails(
        isPublicUser
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

  // * Get profile details
  async getProfileDetails(req, res, next) {
    try {
      const { userId } = req.body;

      const userProfile = await profileService.getProfileDetails(userId);

      res.status(200).json({
        status: "success",
        message: "Fetched profile detail successfully!",
        data: userProfile,
      });
    } catch (err) {
      next(err);
    }
  }

  // * Toggle profile view
  async toggleProfileView(req, res, next) {
    try {
      const { userId } = req.body;

      const toggleProfileView = await profileService.toggleProfileView(userId);

      res.status(200).json({
        status: "success",
        message: "Successfully toggled profile view!",
        data: toggleProfileView,
      });
    } catch (error) {
      next(err);
    }
  }
}

export default ProfileController;
