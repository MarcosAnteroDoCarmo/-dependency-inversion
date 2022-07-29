import { IProfileRepository } from "../../domain/contracts/contractsProfileRepo";
import { ConstructProfileDTO, Profile } from "../../domain/entities/profile";

export class ProfileService {
  constructor(private profileRepository: IProfileRepository) {}

  createProfile(params: ConstructProfileDTO): Promise<Profile> {
    const { id, userName, userId } = params;

    const profile = new Profile({ id, userName, userId });

    return this.profileRepository.createProfile(profile);
  }

  findOneProfile(userName: string) {
    const profile = this.profileRepository.findOneProfile(userName);

    return profile;
  }

  findManyProfile(userName: string) {
    const profile = this.profileRepository.findManyProfile(userName);

    return profile;
  }

  listProfile() {
    const profile = this.profileRepository.listProfile();

    return profile;
  }

  deleteProfile(userName: string) {
    const profile = this.profileRepository.deleteProfile(userName);

    return profile;
  }

  updateProfile(params: Profile) {
    const profile = this.profileRepository.updateProfile(params);

    return profile;
  }
}
