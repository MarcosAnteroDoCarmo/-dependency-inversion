import { Request, Response } from "express";
import { StockService } from "../service/stockService";

export class StockController {
  constructor(private stockService: StockService) {}

  async create(req: Request, res: Response) {
    try {
      const { company, valuation } = req.body;

      if (!company) throw new Error(" a company is needed");
      if (!valuation) throw new Error(" a valuation is needed");

      console.log(req.body);

      const stocks = await this.stockService.createStocks(req.body);

      console.log(stocks);

      return res.send({ Stocks: stocks, message: "New Stocks created" });
    } catch (err: unknown) {
      console.error(err);

      if (err instanceof Error) return res.status(400).send(err.message);

      return res.status(500).send("Server Error");
    }
  }

  async list(req: Request, res: Response) {
    try {
      const stocks = await this.stockService.listStocks();

      return res.send({ Stocks: stocks });
    } catch {
      return res.status(400).send({ message: "Error reading Stocks" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const stocks = await this.stockService.findOneStock({ id });

      return res.send({ stocks });
    } catch {
      return res.status(400).send({ message: "Error reading Stocks" });
    }
  }

  async findMany(req: Request, res: Response) {
    try {
      const { ids } = req.body;

      const stocks = await this.stockService.findManyStocks({ ids });

      return res.send({ stocks });
    } catch {
      return res.status(400).send({ message: "Error reading Stocks" });
    }
  }

  async deleteOne(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) throw new Error("I need email for this!");

      if (!(await this.stockService.findOneStock({ id })))
        throw new Error("This email does not exist");

      await this.stockService.deleteStocks(id);

      return res.send({ message: "Stocks deleted" });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);
      return res.status(500).send("Server Error");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      if (!(await this.stockService.findOneStock({ id })))
        throw new Error("This email does not exist");

      if (id !== data.id) throw new Error("Unable to change id");

      const stocks = await this.stockService.updateStocks(data);

      return res.send({ id, stocks });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);
      return res.status(500).send("Error updating Stocks");
    }
  }
}
