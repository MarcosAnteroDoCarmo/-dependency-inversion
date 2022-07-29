import { House } from "../entities/house";

export interface IHouseRepository {
  createHouse: (params: House) => Promise<House>;
  deleteHouse: (address: string) => Promise<House>;
  updateHouse: (params: House) => Promise<House>;
  findOneHouse: (address: string) => Promise<House | null>;
  findManyHouse: (valuation: number) => Promise<House[]>;
  listHouse: () => Promise<House[]>;
}
