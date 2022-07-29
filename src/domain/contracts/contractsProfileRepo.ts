import { Profile } from "../entities/profile";

export interface IProfileRepository {
  createProfile: (params: Profile) => Promise<Profile>;
  deleteProfile: (id: string) => Promise<Profile>;
  updateProfile: (params: Profile) => Promise<Profile>;
  findOneProfile: (id: string) => Promise<Profile | null>;
  findManyProfile: (userName: string) => Promise<Profile[]>;
  listProfile: () => Promise<Profile[]>;
}
