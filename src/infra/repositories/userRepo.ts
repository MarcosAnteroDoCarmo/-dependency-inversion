import { UserService } from "../../application/service/userService";
import { IUserRepository } from "../../domain/contracts/contractsUserRepo";
import { User } from "../../domain/user";
import { prismaClient } from "../data/mysql/prismaClient";

type PrismaUser = {
  id?: string;
  email: string;
  password: string;
  userName: string;
  houses: string;
  profile: string;
};

export class UserRepo implements IUserRepository {
  constructor() {}

  async createUser(params: User) {
    const user = await prismaClient.user.create({
      data: {
        email: params.email,
        password: params.password,
        userName: params.userName,
        houses: params.houses,
        profile: params.profile,
      },
    });

    return this.prismaUserToUser;
  }

  // static deleteUser: (params: User){};
  // static findOneUser: (email: User){};
  // static findManyUser: (params: User){};
  // static listUser: (params: User){};
  // static updateUser: (params: User){};

  prismaUserToUser(PrismaUser: PrismaUser): User {
    return UserService.createUser({
      id: PrismaUser.id,
      userName: PrismaUser.userName,
      email: PrismaUser.email,
      password: PrismaUser.password,
      profile: PrismaUser.profile,
      houses: PrismaUser.houses,
    });
  }
}
