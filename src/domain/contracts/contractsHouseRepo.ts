import { House } from "../entities/house";

export type FindManyHouse = { ids?: string[]; userId?: string };

export type FindOneHouse = {
  address?: string;
  id?: string;
  options?: { include: { user?: boolean } };
};

export interface IHouseRepository {
  createHouse: (params: House) => Promise<House>;
  deleteHouse: (address: string) => Promise<House>;
  updateHouse: (params: House) => Promise<House>;
  findOneHouse: (params: FindOneHouse) => Promise<House | null>;
  findManyHouse: (params: FindManyHouse) => Promise<House[]>;
  listHouse: () => Promise<House[]>;
}
