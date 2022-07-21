
import { ConstructProfileDTO, Profile } from "../../domain/entities/profile";
import { ProfileRepo } from "../../infra/repositories/profileRepo";

export class ProfileService {
  private repository: ProfileRepo;

  constructor() {
    this.repository = new ProfileRepo();
  }

  createProfile(params: ConstructProfileDTO): Promise<Profile> {
    const { id, userName, userId } = params;

    const profile = new Profile({ id, userName, userId });

    return this.repository.createProfile(profile);
  }

  findOneProfile(userName: string) {
    const profile = this.repository.findOneProfile(userName);

    return profile;
  }

  findManyProfile(userName: string) {
    const profile = this.repository.findManyProfile(userName);

    return profile;
  }

  listProfile() {
    const profile = this.repository.listProfile();

    return profile;
  }

  deleteProfile(userName: string) {
    const profile = this.repository.deleteProfile(userName);

    return profile;
  }

  updateProfile(params: Profile) {
    const profile = this.repository.updateProfile(params);

    return profile;
  }
}
