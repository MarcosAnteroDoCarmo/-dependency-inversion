import { Stocks } from "../entities/stocks";

export interface IStocksRepository {
  createStocks: (params: Stocks) => Promise<Stocks>;
  deleteStocks: (id: string) => Promise<Stocks>;
  findOneStocks: (id: string) => Promise<Stocks | null>;
  findManyStocks: (valuation: number) => Promise<Stocks[]>;
  listStocks: () => Promise<Stocks[]>;
  updateStocks: (params: Stocks) => Promise<Stocks>;
}
