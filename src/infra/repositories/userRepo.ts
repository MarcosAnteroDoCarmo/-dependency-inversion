import {
  House,
  Profile,
  Stocks,
  User as PrismaUser,
} from "@prisma/client";
import {
  CountUser,
  CreateUser,
  DeleteUser,
  FindManyUserRepository,
  FindOneUser,
  IUserRepository,
  ListUser,
  TransferHouse,
  TransferStocks,
  UpdateMoney,
  UpdateUser,
} from "../../domain/contracts/contractsUserRepo";
import { User } from "../../domain/entities/user";
import { isEmptyObject, stringToNumberOrUndefined } from "../../helpers";
import { prismaClient } from "../data/mysql/prismaClient";

export class UserRepo implements IUserRepository {
  constructor() {}

  async transferHouse(params: TransferHouse) {
    const user = await prismaClient.user.update({
      where: { id: params.recipientId },
      data: {
        houses: params.houseIds
          ? { connect: params.houseIds.map((houseId) => ({ id: houseId })) }
          : undefined,
      },
    });

    return this.prismaUserToUser(user);
  }
  async transferStocks(params: TransferStocks) {
    const user = await prismaClient.user.update({
      where: { id: params.recipientId },
      data: {
        stocks: params.stockIds
          ? { connect: params.stockIds.map((stockId) => ({ id: stockId })) }
          : undefined,
      },
    });

    return this.prismaUserToUser(user);
  }

  async updateMoney(params: UpdateMoney) {
    const user = await prismaClient.user.update({
      where: { id: params.userId },
      data: {
        money: params.value,
      },
      select: {
        id: true,
        email: true,
        money: true,
        profile: params.options?.select.profile || false,
        houses: params.options?.select.houses || false,
        stocks: params.options?.select.stocks || false,
      },
    });

    return user;
  }

  async createUser(params: CreateUser) {
    const user = await prismaClient.user.create({
      data: {
        email: params.email,
        password: params.password,
        money: params.money,
        userName: params.userName,
        createdAt: params.createdAt,
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

    return this.prismaUserToUser(user);
  }

  async findOneUser(params: FindOneUser) {
    const { id, email } = params;

    if (!id && !email) {
      throw new Error("I need a email or id for this");
    }

    const user = await prismaClient.user.findUnique({
      where: { id, email },
      include: {
        houses: params.options?.include.houses || false,
        profile: params.options?.include.profile || false,
        stocks: params.options?.include.stocks || false,
      },
    });

    if (!user) {
      return;
    }

    return this.prismaUserToUser(user);
  }

  async count(params: CountUser) {
    const amount = await prismaClient.user.count(
      this.findQueryBuilder(params, true)
    );

    if (!amount) throw new Error("User not found");

    return amount;
  }

  async findManyUser(params: FindManyUserRepository) {
    const users = await prismaClient.user.findMany(
      this.findQueryBuilder(params)
    );

    if (!users) throw new Error("User not found");

    return users.map(this.prismaUserToUser);
  }

  async listUser(params: ListUser) {
    const users = await prismaClient.user.findMany({
      include: {
        houses: params.options?.include.houses || false,
        profile: params.options?.include.profile || false,
        stocks: params.options?.include.stocks || false,
      },
    });

    if (!users) throw new Error("User not found");

    return users.map(this.prismaUserToUser);
  }

  async deleteUser(params: DeleteUser) {
    const user = await prismaClient.user.delete({
      where: { email: params.email },
    });

    if (!user) throw new Error("User not found");

    return this.prismaUserToUser(user);
  }

  async updateUser(params: UpdateUser) {
    const user = await prismaClient.user.update({
      where: { email: params.email },
      data: {
        userName: params.userName,
        email: params.email,
        password: params.password,
        money: params.money,
        createdAt: params.createdAt,
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
      money: params.money,
      createdAt: params.createdAt,
      profileId: params.profile?.id,
      houseIds: params.houses ? params.houses.map((house) => house.id) : [],
      stockIds: params.stocks ? params.stocks.map((stock) => stock.id) : [],
    });
  }

  findQueryBuilder(params: FindManyUserRepository, countOptions?: Boolean) {
    const id = params.query?.id;
    const userName = params.query?.userName;
    const email = params.query?.email;
    const createdAt = params.query?.createdAt;
    const money = params.query?.money;
    const searchQuery = params.query?.search;
    const searchBy = params.query?.searchBy;
    const fromCreatedAt = params.query?.fromCreatedAt;
    const toCreatedAt = params.query?.toCreatedAt;
    const rangeCreatedAt = { gte: fromCreatedAt, lte: toCreatedAt };
    const fromMoney = params.query?.fromMoney;
    const toMoney = params.query?.toMoney;
    const rangeMoney = { gte: fromMoney, lte: toMoney };

    const searchOne = [
      {
        [searchBy || "money"]:
          searchBy === "money"
            ? { equals: stringToNumberOrUndefined(searchQuery) }
            : { contains: searchQuery },
      },
    ];

    const searchAll = [
      { createdAt: rangeCreatedAt },
      { money: rangeMoney },
      { id: { contains: searchQuery } },
      { userName: { contains: searchQuery } },
      { email: { contains: searchQuery } },
      { money: { equals: stringToNumberOrUndefined(searchQuery) } },
    ];

    const where = (params: FindManyUserRepository) => {
      if (isEmptyObject(params || {})) {
        return undefined;
      }

      if (id || email || userName || createdAt || money) {
        return { id, email, userName, createdAt, money };
      }

      if (money === 0) {
        return { OR: { money: 0 } };
      }

      if (searchBy) {
        return { OR: searchOne };
      }

      if (searchQuery || fromCreatedAt || toCreatedAt || fromMoney || toMoney) {
        return { OR: searchAll };
      }

      return undefined;
    };

    const returnAll = {
      skip: params.query?.skip,
      take: params.query?.take,

      where: where(params),

      select: {
        id: true,
        userName: true,
        email: true,
        money: true,
        profile: params.query?.profileId || false,
        houses: params.query?.houseIds || false,
        stocks: params.query?.stockIds || false,
      },

      orderBy: {
        [searchBy || "money"]: params.query?.order || "asc",
      },
    };

    const countReturn = {
      where: where(params),

      orderBy: {
        [searchBy || "money"]: params.query?.order || "asc",
      },
    };

    if (countOptions) return countReturn;

    return returnAll;
  }
}
