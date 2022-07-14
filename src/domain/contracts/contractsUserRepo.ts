import { ManyUsers } from "../../infra/repositories/userRepo";
import { User } from "../user";

export interface IUserRepository {
  createUser: (params: User) => Promise<User>;
  deleteUser: (email: string) => Promise<User>;
  updateUser: (params: User) => Promise<User>;
  findOneUser: (email: string) => Promise<User>;
  findManyUser: (userName: string) => Promise<ManyUsers>;
  listUser: (params: User) => Promise<ManyUsers>;
}
