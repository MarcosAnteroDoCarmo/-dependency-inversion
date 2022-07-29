import { User } from "../entities/user";

export interface IUserRepository {
  createUser: (params: User) => Promise<User>;
  deleteUser: (email: string) => Promise<User>;
  updateUser: (params: User) => Promise<User>;
  findOneUser: (email: string) => Promise<User|null>;
  findManyUser: (userName: string) => Promise<User[]>;
  listUser: (options?: {
    include: { houses: boolean; profile: boolean; stocks: boolean };
  }) => Promise<User[]>;
}

