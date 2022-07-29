import { IHouseRepository } from "../../domain/contracts/contractsHouseRepo";
import { ConstructHouseDTO, House } from "../../domain/entities/house";

export class HouseService {
  constructor(private houseRepository: IHouseRepository) {}

  createHouse(params: ConstructHouseDTO): Promise<House> {
    const { id, address, valuation, userId } = params;

    const house = new House({ id, address, valuation, userId });

    return this.houseRepository.createHouse(house);
  }

  findOneHouse(address: string) {
    const house = this.houseRepository.findOneHouse(address);

    return house;
  }

  findManyHouse(valuation: number) {
    const house = this.houseRepository.findManyHouse(valuation);

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
