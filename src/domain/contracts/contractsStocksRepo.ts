import { Stocks } from "../entities/stocks";

export type FindManyStocks = { ids?: string[]; userIds?: string };

export type FindOneStock = {
  id?: string;
  company?: string;
  options?: { include: { user?: boolean } };
};

export interface IStocksRepository {
  createStocks: (params: Stocks) => Promise<Stocks>;
  deleteStocks: (id: string) => Promise<Stocks>;
  findOneStock: (params: FindOneStock) => Promise<Stocks | null>;
  findManyStocks: (params: FindManyStocks) => Promise<Stocks[]>;
  listStocks: () => Promise<Stocks[]>;
  updateStocks: (params: Stocks) => Promise<Stocks>;
}
