import ProfileModel from "../models/profile.model.js";

class ProfileService {
  constructor() {}

  async createProfile(payload, userId) {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, photo, bio, phone, userId } = payload;

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

        if (!createProfile) {
          throw new Error(
            new Error(`Unable to create profile. Something went wrong!`, {
              cause: {
                indicator: "db",
                status: 500,
              },
            })
          );
        }

        resolve(createdProfile._doc);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default new ProfileService();
