import { House as PrismaHouse } from "@prisma/client";
import {
  FindManyHouse,
  FindOneHouse,
  IHouseRepository,
} from "../../domain/contracts/contractsHouseRepo";
import { House } from "../../domain/entities/house";
import { prismaClient } from "../data/mysql/prismaClient";

export class HouseRepo implements IHouseRepository {
  constructor() {}

  async createHouse(params: House) {
    const house = await prismaClient.house.create({
      data: {
        id: params.id,
        address: params.address,
        createdAt: params.createdAt,
        valuation: params.valuation,
        userId: params.userId,
      },
    });

    return this.prismaHouseToHouse(house);
  }

  async findOneHouse(params: FindOneHouse) {
    const { id, address } = params;

    const house = await prismaClient.house.findUnique({
      where: { id, address },
      include: { user: params.options?.include.user || false },
    });

    if (!house) {
      console.log("House not found");

      return house;
    }

    return this.prismaHouseToHouse(house);
  }

  async findManyHouse(params: FindManyHouse) {
    const houses = await prismaClient.house.findMany({
      where: { id: { in: params.ids }, userId: params.userId },
    });

    if (!houses) throw new Error("House not found");

    return houses.map(this.prismaHouseToHouse);
  }

  async listHouse() {
    const houses = await prismaClient.house.findMany({});
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
    // if (params.userId == null) {
    //   return new House({
    //     id: params.id,
    //     address: params.address,
    //     valuation: params.valuation,
    //     createdAt:params.createdAt,
    //   });
    // }

    return new House({
      id: params.id,
      address: params.address,
      valuation: params.valuation,
      createdAt: params.createdAt,
      userId: params.userId ? params.userId : undefined,
    });
  }
}
