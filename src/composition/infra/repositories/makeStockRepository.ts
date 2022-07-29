import { StockRepo } from "../../../infra/repositories/stockRepo";

export const makeStockRepository = () => {
  return new StockRepo();
};
