import { ProfileService } from "../../../application/service/profileService";
import { makeProfileRepository } from "../../infra/repositories/makeProfileRepository";

export const makeProfileService = () => {
  const repository = makeProfileRepository();
  return new ProfileService(repository);
};
