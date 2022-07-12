import { User } from "../user";

export interface IUserRepository {
  createUser: (params: User) => Promise<User>;
  // deleteUser: (params: User) => Promise<User>;
  // findOneUser: (email: User) => Promise<User>;
  // findManyUser: (params: User) => Promise<User>;
  // listUser: (params: User) => Promise<User>;
  // updateUser: (params: User) => Promise<User>;
}
