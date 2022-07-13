import { User } from "../user";

export interface IUserRepository {
  createUser: (params: User) => Promise<User>;
  findOneUser: (email: string) => Promise<User>;
  deleteUser: (email: string) => Promise<User>;
  findManyUser: (userName: string) => Promise<User>;

  // listUser: (params: User) => Promise<User>;
  // updateUser: (params: User) => Promise<User>;
}
