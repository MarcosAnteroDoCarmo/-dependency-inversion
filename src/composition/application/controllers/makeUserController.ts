import { UserController } from "../../../application/controllers/userController";
import { makeUserService } from "../services/makeUserService";

export const makeUserController = () => {
  const service = makeUserService();
  return new UserController(service);
};
