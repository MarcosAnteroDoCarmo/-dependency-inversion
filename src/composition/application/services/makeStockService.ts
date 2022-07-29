import { StockService } from "../../../application/service/stockService";
import { makeStockRepository } from "../../infra/repositories/makeStockRepository";

export const makeStockService = () => {
  const repository = makeStockRepository();
  return new StockService(repository);
};
