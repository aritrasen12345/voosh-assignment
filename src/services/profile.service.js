import ProfileModel from "../models/profile.model.js";

class ProfileService {
  constructor() {}

  async createProfile(payload, userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, photo, bio, phone } = payload;

        const newProfile = new ProfileModel({
          name,
          photo,
          bio,
          phone,
          userId,
        });

        if (!newProfile) {
          throw new Error("Unable to create Profile!", {
            cause: { indicator: "db", status: 500 },
          });
        }

        const createdProfile = await newProfile.save();

        if (!createdProfile) {
          throw new Error(`Unable to create profile. Something went wrong!`, {
            cause: {
              indicator: "db",
              status: 500,
            },
          });
        }

        resolve(createdProfile._doc);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getAllProfileDetails(isAdmin) {
    return new Promise(async (resolve, reject) => {
      try {
        // * If Public profile show him all Public profiles
        // * If Private Profile show him all Profiles
        const profileDetails = await ProfileModel.find(
          !isAdmin ? { isPublic: true } : {}
        ).exec();

        if (!profileDetails) {
          throw new Error(`Error while fetching details!`, {
            cause: { indicator: "db", status: 500 },
          });
        }

        resolve(profileDetails);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getProfileDetails(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const userDetails = await ProfileModel.findOne({ userId }).exec();

        if (!userDetails) {
          throw new Error(`Error while fetching details!`, {
            cause: { indicator: "db", status: 500 },
          });
        }

        resolve(userDetails);
      } catch (err) {
        reject(err);
      }
    });
  }

  async toggleProfileView(userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const userDetails = await ProfileModel.findOne({ userId }).exec();

        if (!userDetails) {
          throw new Error(`Error while fetching details!`);
        }

        const userCurrentProfileView = userDetails.isPublic;
        userDetails.isPublic = !userCurrentProfileView;

        const modifiedUser = await userDetails.save();

        if (!modifiedUser) {
          throw new Error(`Error while modifying user details!`, {
            cause: { indicator: "db", status: 500 },
          });
        }

        resolve(modifiedUser);
      } catch (err) {
        reject(err);
      }
    });
  }

  async updateProfile(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { photo, name, bio, phone, userId } = payload;
        const profileUpdatedProperties = {};
        if (photo) profileUpdatedProperties.photo = photo;
        if (name) profileUpdatedProperties.name = name;
        if (bio) profileUpdatedProperties.bio = bio;
        if (phone) profileUpdatedProperties.phone = phone;

        const modifiedUserProfile = await ProfileModel.findOneAndUpdate(
          { userId },
          profileUpdatedProperties,
          { new: true }
        );

        if (!modifiedUserProfile) {
          throw new Error(`Error while updating user profile details!`, {
            cause: { indicator: "db", status: 500 },
          });
        }

        resolve(modifiedUserProfile);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default new ProfileService();
