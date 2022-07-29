import { ProfileRepo } from "../../../infra/repositories/profileRepo";

export const makeProfileRepository = () => {
  return new ProfileRepo();
};
