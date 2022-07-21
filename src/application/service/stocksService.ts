import { ConstructStockDTO, Stocks } from "../../domain/entities/stocks";
import { StocksRepo } from "../../infra/repositories/stocksRepo";

Stocks;

export class StocksService {
  private repository: StocksRepo;

  constructor() {
    this.repository = new StocksRepo();
  }

  createStocks(params: ConstructStockDTO): Promise<Stocks> {
    const { id, company, valuation, userIds: userId } = params;

    const stocks = new Stocks({ id, company, valuation, userIds: userId });

    return this.repository.createStocks(stocks);
  }

  findOneStocks(id: string) {
    const stocks = this.repository.findOneStocks(id);

    return stocks;
  }

  findManyStocks(valuation: number) {
    const stocks = this.repository.findManyStocks(valuation);

    return stocks;
  }

  listStocks() {
    const stocks = this.repository.listStocks();

    return stocks;
  }

  deleteStocks(id: string) {
    const stocks = this.repository.deleteStocks(id);

    return stocks;
  }

  updateStocks(params: Stocks) {
    const stocks = this.repository.updateStocks(params);

    return stocks;
  }
}
