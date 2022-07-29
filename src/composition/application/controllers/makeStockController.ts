import { StockController } from "../../../application/controllers/stockController";
import { makeStockService } from "../services/makeStockService";


export const makeStockController = () => {
  const service = makeStockService();
  return new StockController(service);
};