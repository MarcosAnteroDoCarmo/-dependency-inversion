import { House } from "../house";

export interface IHouseRepository {
  createHouse: (params: House) => Promise<House>;
  deleteHouse: (params: House) => Promise<House>;
  findOneHouse: (id: House) => Promise<House>;
  findManyHouse: (params: House) => Promise<House>;
  listHouse: (params: House) => Promise<House>;
  updateHouse: (params: House) => Promise<House>;
}