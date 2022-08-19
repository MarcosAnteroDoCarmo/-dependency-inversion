import {
  FindManyHouse,
  FindOneHouse,
  IHouseRepository,
} from "../../domain/contracts/contractsHouseRepo";
import { ConstructHouseDTO, House } from "../../domain/entities/house";

export class HouseService {
  constructor(private houseRepository: IHouseRepository) {}

  createHouse(params: ConstructHouseDTO): Promise<House> {
    const { id, address, createdAt, valuation, userId } = params;

    const house = new House({ id, address, createdAt, valuation, userId });

    return this.houseRepository.createHouse(house);
  }

  findOneHouse(params: FindOneHouse) {
    const house = this.houseRepository.findOneHouse(params);

    return house;
  }

  findManyHouse(params: FindManyHouse) {
    const house = this.houseRepository.findManyHouse(params);

    return house;
  }

  listHouse() {
    const house = this.houseRepository.listHouse();

    return house;
  }

  deleteHouse(address: string) {
    const house = this.houseRepository.deleteHouse(address);

    return house;
  }

  updateHouse(params: House) {
    const house = this.houseRepository.updateHouse(params);

    return house;
  }
}
