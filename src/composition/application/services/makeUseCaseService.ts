import { UseCaseService } from "../../../application/service/useCaseService";
import { makeHouseRepository } from "../../infra/repositories/makeHouseRepository";
import { makeStockRepository } from "../../infra/repositories/makeStockRepository";
import { makeUserRepository } from "../../infra/repositories/makeUserRepository";

export const makeUseCaseService = () => {
  const userRepository = makeUserRepository();
  const houseRepository = makeHouseRepository();
  const stockRepository = makeStockRepository();

  return new UseCaseService(userRepository, houseRepository, stockRepository);
};
