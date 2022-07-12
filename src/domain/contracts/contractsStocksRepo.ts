import { Stocks } from "../stocks";

export interface IStocksRepository {
  createStocks: (params: Stocks) => Promise<Stocks>;
  deleteStocks: (params: Stocks) => Promise<Stocks>;
  findOneStocks: (id: Stocks) => Promise<Stocks>;
  findManyStocks: (params: Stocks) => Promise<Stocks>;
  listStocks: (params: Stocks) => Promise<Stocks>;
  updateStocks: (params: Stocks) => Promise<Stocks>;
}