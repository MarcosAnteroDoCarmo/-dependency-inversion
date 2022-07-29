import { HouseRepo } from "../../../infra/repositories/houseRepo";


export const makeHouseRepository = () => {
  return new HouseRepo();
};