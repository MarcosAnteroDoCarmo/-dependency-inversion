import { House as PrismaHouse } from "@prisma/client";
import { IHouseRepository } from "../../domain/contracts/contractsHouseRepo";
import { House } from "../../domain/entities/house";
import { prismaClient } from "../data/mysql/prismaClient";

export class HouseRepo implements IHouseRepository {
  constructor() {}

  async createHouse(params: House) {
    const house = await prismaClient.house.create({
      data: {
        id: params.id,
        address: params.address,
        valuation: params.valuation,
        userId: params.userId,
      },
    });

    return this.prismaHouseToHouse(house);
  }

  async findOneHouse(address: string) {
    const house = await prismaClient.house.findUnique({
      where: { address },
    });

    if (!house) {
      console.log("House not found");

      return house;
    }

    return this.prismaHouseToHouse(house);
  }

  async findManyHouse(valuation: number) {
    const houses = await prismaClient.house.findMany({
      where: { valuation },
      select: {
        id: true,
        address: true,
        valuation: true,
        userId: true,
        user: true,
      },
    });

    if (!houses) throw new Error("House not found");

    return houses.map(this.prismaHouseToHouse);
  }

  async listHouse() {
    const houses = await prismaClient.house.findMany({
      select: {
        id: true,
        address: true,
        valuation: true,
        userId: true,
        user: true,
      },
    });
    if (!houses) throw new Error("House not found");

    return houses.map(this.prismaHouseToHouse);
  }

  async deleteHouse(address: string) {
    const house = await prismaClient.house.delete({
      where: { address },
    });

    if (!house) throw new Error("House not found");

    return this.prismaHouseToHouse(house);
  }

  async updateHouse(params: House) {
    const house = await prismaClient.house.update({
      where: { address: params.address },
      data: {
        id: params.id,
        address: params.address,
        valuation: params.valuation,
        userId: params.userId,
      },
    });

    if (!house) throw new Error("House not found");

    return this.prismaHouseToHouse(house);
  }

  prismaHouseToHouse(params: PrismaHouse): House {
    if (params.userId == null) {
      return new House({
        id: params.id,
        address: params.address,
        valuation: params.valuation,
      });
    }

    return new House({
      id: params.id,
      address: params.address,
      valuation: params.valuation,
      userId: params.userId,
    });
  }
}
