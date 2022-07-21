import { Stocks as PrismaStocks } from "@prisma/client";
import { IStocksRepository } from "../../domain/contracts/contractsStocksRepo";
import { Stocks } from "../../domain/entities/stocks";

import { prismaClient } from "../data/mysql/prismaClient";

export class StocksRepo implements IStocksRepository {
  constructor() {}

  async createStocks(params: Stocks) {
    const stocks = await prismaClient.stocks.create({
      data: {
        id: params.id,
        company: params.company ?? null,
        valuation: params.valuation,
        user: params.userId
          ? { connect: params.userId.map((userId) => ({ id: userId })) }
          : undefined,
      },
    });

    return this.prismaStocksToStocks(stocks);
  }

  async findOneStocks(id: string) {
    const stocks = await prismaClient.stocks.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!stocks) {
      console.log("Stocks not found");

      return stocks;
    }

    return this.prismaStocksToStocks(stocks);
  }

  async findManyStocks(valuation: number) {
    const stocks = await prismaClient.stocks.findMany({
      where: { valuation },
    });

    if (!stocks) throw new Error("Stocks not found");

    return stocks.map(this.prismaStocksToStocks);
  }

  async listStocks() {
    const stocks = await prismaClient.stocks.findMany({
      select: {
        id: true,
        company: true,
        valuation: true,
        user: true,
      },
    });
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

  prismaStocksToStocks(params: PrismaStocks & { userId?: string[] }): Stocks {
    return new Stocks({
      id: params.id,
      company: params.company,
      valuation: params.valuation,
      userIds: params.userId,
    });
  }
}
