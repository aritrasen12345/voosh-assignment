import profileService from "../../services/profile.service.js";
import userService from "../../services/user.service.js";

class ProfileController {
  constructor() {}

  // * Get all profile details
  async getAllProfileDetails(req, res, next) {
    try {
      const { isAdmin } = req.body;

      const profileDetails = await profileService.getAllProfileDetails(isAdmin);

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

  // * Update Profile
  async updateProfile(req, res, next) {
    try {
      const modifiedUser = await userService.updateUser(req.body);

      const modifiedUserProfile = await profileService.updateProfile(req.body);

      res.status(200).json({
        status: "success",
        message: "Successfully updated user profile!",
        data: { ...modifiedUser._doc, ...modifiedUserProfile._doc },
      });
    } catch (err) {
      next(err);
    }
  }
}

export default ProfileController;
