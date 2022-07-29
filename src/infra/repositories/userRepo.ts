import { House, Profile, Stocks, User as PrismaUser } from "@prisma/client";
import { IUserRepository } from "../../domain/contracts/contractsUserRepo";
import { User } from "../../domain/entities/user";
import { prismaClient } from "../data/mysql/prismaClient";

export class UserRepo implements IUserRepository {
  constructor() {}

  async createUser(params: User) {
    const user = await prismaClient.user.create({
      data: {
        email: params.email,
        password: params.password,
        userName: params.userName,
        profile: params.profileId
          ? { connect: { id: params.profileId } }
          : undefined,

        houses: params.houseIds
          ? { connect: params.houseIds.map((houseId) => ({ id: houseId })) }
          : undefined,

        stocks: params.stockIds
          ? { connect: params.stockIds.map((stockId) => ({ id: stockId })) }
          : undefined,
      },
      include: { houses: true, profile: true, stocks: true },
    });

    console.log("repo..............................................");
    console.log(user);

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
      include: {
        profile: true,
        houses: true,
        stocks: true,
      },
    });

    if (!users) throw new Error("User not found");

    return users.map(this.prismaUserToUser);
  }

  async listUser(options?: {
    include: { houses: boolean; profile: boolean; stocks: boolean };
  }) {
    const users = await prismaClient.user.findMany({
      include: {
        houses: options?.include.houses || false,
        profile: options?.include.profile || false,
        stocks: options?.include.stocks || false,
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
        profile: params.profileId
          ? { connect: { id: params.profileId } }
          : undefined,

        houses: params.houseIds
          ? { connect: params.houseIds.map((houseId) => ({ id: houseId })) }
          : undefined,

        stocks: params.stockIds
          ? { connect: params.stockIds.map((stockId) => ({ id: stockId })) }
          : undefined,
      },
      include: {
        profile: true,
        houses: true,
        stocks: true,
      },
    });

    if (!user) throw new Error("User not found");

    return this.prismaUserToUser(user);
  }

  prismaUserToUser(
    params: PrismaUser & {
      profile?: Profile | null;
      houses?: House[];
      stocks?: Stocks[];
    }
  ): User {
    return new User({
      id: params.id,
      userName: params.userName,
      email: params.email,
      password: params.password,
      profileId: params.profile?.id,
      houseIds: params.houses ? params.houses.map((house) => house.id) : [],
      stockIds: params.stocks ? params.stocks.map((stock) => stock.id) : [],
    });
  }
}
