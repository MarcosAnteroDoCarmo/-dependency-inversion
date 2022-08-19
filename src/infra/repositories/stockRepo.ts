import { Stocks as PrismaStocks } from "@prisma/client";
import {
  FindManyStocks,
  FindOneStock,
  IStocksRepository,
} from "../../domain/contracts/contractsStocksRepo";
import { Stocks } from "../../domain/entities/stocks";

import { prismaClient } from "../data/mysql/prismaClient";

export class StockRepo implements IStocksRepository {
  constructor() {}

  async createStocks(params: Stocks) {
    const stocks = await prismaClient.stocks.create({
      data: {
        id: params.id,
        company: params.company ?? null,
        valuation: params.valuation,
        createdAt: params.createdAt,
        user: params._userIds
          ? { connect: params._userIds.map((userId) => ({ id: userId })) }
          : undefined,
      },
    });

    return this.prismaStocksToStocks(stocks);
  }

  async findOneStock(params: FindOneStock) {
    const { id, company } = params;

    const stocks = await prismaClient.stocks.findUnique({
      where: { id, company },
      include: { user: true },
    });

    if (!stocks) {
      throw new Error("Stocks not found");
    }

    return this.prismaStocksToStocks(stocks);
  }

  async findManyStocks(params: FindManyStocks) {
    const stocks = await prismaClient.stocks.findMany({
      where: {
        id: { in: params.ids },
        user: { some: { id: params.userIds } },
      },
    });

    if (!stocks) throw new Error("Stocks not found");

    return stocks.map(this.prismaStocksToStocks);
  }

  async listStocks() {
    const stocks = await prismaClient.stocks.findMany({});
    if (!stocks) throw new Error("Stocks not found");

    return stocks.map(this.prismaStocksToStocks);
  }

  async deleteStocks(id: string) {
    const stocks = await prismaClient.stocks.delete({
      where: { id },
    });

    if (!stocks) throw new Error("Stocks not found");

    return this.prismaStocksToStocks(stocks);
  }

  async updateStocks(params: Stocks) {
    const stocks = await prismaClient.stocks.update({
      where: { id: params.id },
      data: {
        id: params.id,
        company: params.company,
        valuation: params.valuation,
        user: params.userId
          ? { connect: params.userId.map((userId) => ({ id: userId })) }
          : undefined,
      },
    });

    if (!stocks) throw new Error("Stocks not found");

    return this.prismaStocksToStocks(stocks);
  }

  prismaStocksToStocks(params: PrismaStocks & { userIds?: string[] }): Stocks {
    return new Stocks({
      id: params.id,
      company: params.company,
      valuation: params.valuation,
      createdAt: params.createdAt,
      userIds: params.userIds,
    });
  }
}
