import { HouseService } from "../../../application/service/houseService";
import { makeHouseRepository } from "../../infra/repositories/makeHouseRepository";

export const makeHouseService = () => {
  const repository = makeHouseRepository();
  return new HouseService(repository);
};
