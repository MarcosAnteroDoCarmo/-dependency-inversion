import { UserRepo } from "../../../infra/repositories/userRepo";

export const makeUserRepository = () => {
  return new UserRepo();
};
