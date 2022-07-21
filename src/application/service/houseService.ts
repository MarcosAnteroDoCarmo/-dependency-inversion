import { ConstructHouseDTO, House } from "../../domain/entities/house";
import { HouseRepo } from "../../infra/repositories/houseRepo";

export class HouseService {
  private repository: HouseRepo;

  constructor() {
    this.repository = new HouseRepo();
  }

  createHouse(params: ConstructHouseDTO): Promise<House> {
    const { id, address, valuation, userId } = params;

    const house = new House({ id, address, valuation, userId });

    return this.repository.createHouse(house);
  }

  findOneHouse(address: string) {
    const house = this.repository.findOneHouse(address);

    return house;
  }

  findManyHouse(valuation: number) {
    const house = this.repository.findManyHouse(valuation);

    return house;
  }

  listHouse() {
    const house = this.repository.listHouse();

    return house;
  }

  deleteHouse(address: string) {
    const house = this.repository.deleteHouse(address);

    return house;
  }

  updateHouse(params: House) {
    const house = this.repository.updateHouse(params);

    return house;
  }
}
