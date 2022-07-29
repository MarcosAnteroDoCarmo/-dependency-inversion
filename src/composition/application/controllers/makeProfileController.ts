import { ProfileController } from "../../../application/controllers/profileController";
import { makeProfileService } from "../services/makeProfileService";

export const makeProfileController = () => {
  const service = makeProfileService();
  return new ProfileController(service);
};
