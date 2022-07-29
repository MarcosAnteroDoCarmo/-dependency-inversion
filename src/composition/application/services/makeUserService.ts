import { UserService } from "../../../application/service/userService";
import { makeUserRepository } from "../../infra/repositories/makeUserRepository";

export const makeUserService = () => {
  const repository = makeUserRepository();
  return new UserService(repository);
};
