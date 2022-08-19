import {
  House,
  prisma,
  Profile,
  Stocks,
  User as PrismaUser,
} from "@prisma/client";
import { stringify } from "querystring";
import {
  CreateUser,
  DeleteUser,
  FindManyUser,
  FindOneUser,
  IUserRepository,
  ListUser,
  TransferHouse,
  TransferStocks,
  UpdadeMoney,
  UpdateUser,
} from "../../domain/contracts/contractsUserRepo";
import { User } from "../../domain/entities/user";
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

    console.log("transferHouse.............................................");
    console.log(user);

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

    console.log("transferHouse.............................................");
    console.log(user);

    return this.prismaUserToUser(user);
  }

  async updadeMoney(params: UpdadeMoney) {
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

    console.log("transfermoney.............................................");
    console.log(user);

    return user;
  }
  async count() {
    const users = await prismaClient.user.count();

    if (!users) throw new Error("User not found");

    return users;
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

    console.log("repo..............................................");
    console.log(user);

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
      console.log("User not found");

      return;
    }

    return this.prismaUserToUser(user);
  }

  async findManyUser(params: FindManyUser) {
    const convertStringToNumberOrUndefined = (
      value: string | number | undefined
    ) => {
      if (!value) {
        return undefined;
      }
      if (value === "0") {
        return 0;
      }

      return Number(value);
    };
    const id = params.queryOptions?.id;
    const userName = params.queryOptions?.userName;
    const email = params.queryOptions?.email;
    const money = convertStringToNumberOrUndefined(params.queryOptions?.money);
    const createdAt = params.queryOptions?.createdAt;
    const profile = params.queryOptions?.profileId || false;
    const houses = params.queryOptions?.houseIds || false;
    const stocks = params.queryOptions?.stockIds || false;
    const order = params.queryOptions?.order;
    const orderByQuery = params.queryOptions?.orderBy;
    const take = Number(params.queryOptions?.pageSize || 5);
    const skip = Number(params.queryOptions?.page || 0) * take;
    const from = params.queryOptions?.from;
    const to = params.queryOptions?.to;
    const searchQuery = params.queryOptions?.search;
    const searchBy = params.queryOptions?.searchBy;
    const not = params.queryOptions?.not;
    const range = {
      gte: from,
      lte: to,
    };

    console.log("query.............................................");
    console.log("order=>", order);
    console.log("pageSise=>", take);
    console.log("pageNmber=>", skip);
    console.log("search=>", searchQuery);
    console.log("searchNumber=>", Number(searchQuery));
    console.log("profile=>", profile);
    console.log(
      "isNaN=>",
      isNaN(Number(searchQuery)) ? undefined : Number(searchQuery)
    );

    const singleQuery = [
      { id, email, userName, createdAt, money },
      { createdAt: range },
    ];

    const searchOne = [
      {
        [searchBy || "money"]:
          searchBy === "money"
            ? {
                equals: isNaN(Number(searchQuery))
                  ? undefined
                  : Number(searchQuery),
              }
            : { contains: searchQuery },
      },
    ];

    const searchAll = [
      { id, email, userName, createdAt, money },
      { createdAt: range },
      { id: { contains: searchQuery } },
      { userName: { contains: searchQuery } },
      { email: { contains: searchQuery } },
      {
        money: {
          equals: isNaN(Number(searchQuery)) ? undefined : Number(searchQuery),
        },
      },
    ];
    const objectVazio = params.queryOptions
      ? Object.keys(params.queryOptions).length === 0
      : false;
    console.log("objectVazio=>", objectVazio);

    const test = params.queryOptions;
    console.log("test=>", test);

    const emptyObject = (obj: {}) => {
      return JSON.stringify(obj) === "{}";
    };

    console.log("funcJSON", emptyObject(test || {}));

    const or = emptyObject([test])
      ? undefined
      : { OR: searchBy ? searchOne : searchAll };

    const makeOr = (params: FindManyUser) => {
      if (id || userName || email || money || createdAt) {
        return { OR: singleQuery };
      }

      if (params.queryOptions?.searchBy) {
        return { OR: searchOne };
      }
      if (params.queryOptions?.search) {
        return { OR: searchAll };
      }
      if (!emptyObject([params.queryOptions])) {
        return undefined;
      }
    };

    console.log("makeOr=>", makeOr(params));

    const users = await prismaClient.user.findMany({
      skip,
      take,

      where: !emptyObject(params.queryOptions || {})
        ? { OR: searchBy ? searchOne : searchAll }
        : undefined,

      include: {
        profile,
        houses,
        stocks,
      },
      orderBy: { [orderByQuery || "money"]: order || "asc" },
    });

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
}
