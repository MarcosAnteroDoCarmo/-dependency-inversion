import { User as PrismaUser } from "@prisma/client";
import { IUserRepository } from "../../domain/contracts/contractsUserRepo";
import { User } from "../../domain/entities/user";
import { prismaClient } from "../data/mysql/prismaClient";

export class UserRepo implements IUserRepository {
  constructor() {}

  async createUser(params: User) {
    if (params.profileId == undefined) {
      params.profileId = "null";
    }

    const user = await prismaClient.user.create({
      data: {
        email: params.email,
        password: params.password,
        userName: params.userName,
        profileId: params.profileId,
        houses: params.houseIds
          ? { connect: params.houseIds.map((houseId) => ({ id: houseId })) }
          : undefined,
        stocks: params.stockIds
          ? { connect: params.stockIds.map((stockId) => ({ id: stockId })) }
          : undefined,
      },
    });

    return this.prismaUserToUser(user);
  }

  async findOneUser(email: string) {
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.log("User not found");

      return user;
    }

    return this.prismaUserToUser(user);
  }

  async findManyUser(userName: string) {
    const users = await prismaClient.user.findMany({
      where: { userName },
      select: {
        id: true,
        email: true,
        userName: true,
        password: true,
        profileId: true,
        profile: true,
        houses: true,
        stocks: true,
      },
    });

    if (!users) throw new Error("User not found");

    return users.map(this.prismaUserToUser);
  }

  async listUser() {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        email: true,
        userName: true,
        password: true,
        profileId: true,
        profile: true,
        houses: true,
        stocks: true,
      },
    });
    if (!users) throw new Error("User not found");

    return users.map(this.prismaUserToUser);
  }

  async deleteUser(email: string) {
    const user = await prismaClient.user.delete({
      where: { email },
    });

    if (!user) throw new Error("User not found");

    return this.prismaUserToUser(user);
  }

  async updateUser(params: User) {
    const user = await prismaClient.user.update({
      where: { email: params.email },
      data: {
        email: params.email,
        password: params.password,
        userName: params.userName,
      },
    });

    if (!user) throw new Error("User not found");

    return this.prismaUserToUser(user);
  }

  prismaUserToUser(params: PrismaUser): User {
    if (params.profileId == null) {
      return new User({
        id: params.id,
        userName: params.userName,
        email: params.email,
        password: params.password,
      });
    }

    return new User({
      id: params.id,
      userName: params.userName,
      email: params.email,
      password: params.password,
      profileId: params.profileId,
    });
  }
}
