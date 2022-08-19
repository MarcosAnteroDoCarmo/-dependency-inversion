import {
  FindManyStocks,
  FindOneStock,
  IStocksRepository,
} from "../../domain/contracts/contractsStocksRepo";
import { ConstructStockDTO, Stocks } from "../../domain/entities/stocks";

export class StockService {
  constructor(private stockRepository: IStocksRepository) {}

  createStocks(params: ConstructStockDTO): Promise<Stocks> {
    const { id, company, valuation, createdAt, userIds } = params;

    const stocks = new Stocks({ id, company, valuation, createdAt, userIds });

    return this.stockRepository.createStocks(stocks);
  }

  findOneStock(params: FindOneStock) {
    const stocks = this.stockRepository.findOneStock(params);

    return stocks;
  }

  findManyStocks(params: FindManyStocks) {
    const stocks = this.stockRepository.findManyStocks(params);

    return stocks;
  }

  listStocks() {
    const stocks = this.stockRepository.listStocks();

    return stocks;
  }

  deleteStocks(id: string) {
    const stocks = this.stockRepository.deleteStocks(id);

    return stocks;
  }

  updateStocks(params: Stocks) {
    const stocks = this.stockRepository.updateStocks(params);

    return stocks;
  }
}
