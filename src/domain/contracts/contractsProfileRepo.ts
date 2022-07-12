import { Profile } from "../profile";

export interface IProfileRepository {
  createProfile: (params: Profile) => Promise<Profile>;
  deleteProfile: (params: Profile) => Promise<Profile>;
  findOneProfile: (id: Profile) => Promise<Profile>;
  findManyProfile: (params: Profile) => Promise<Profile>;
  listProfile: (params: Profile) => Promise<Profile>;
  updateProfile: (params: Profile) => Promise<Profile>;
}