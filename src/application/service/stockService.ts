import { IStocksRepository } from "../../domain/contracts/contractsStocksRepo";
import { ConstructStockDTO, Stocks } from "../../domain/entities/stocks";

export class StockService {
  constructor(private stockRepository: IStocksRepository) {}

  createStocks(params: ConstructStockDTO): Promise<Stocks> {
    const { id, company, valuation, userIds: userId } = params;

    const stocks = new Stocks({ id, company, valuation, userIds: userId });

    return this.stockRepository.createStocks(stocks);
  }

  findOneStocks(id: string) {
    const stocks = this.stockRepository.findOneStocks(id);

    return stocks;
  }

  findManyStocks(valuation: number) {
    const stocks = this.stockRepository.findManyStocks(valuation);

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
