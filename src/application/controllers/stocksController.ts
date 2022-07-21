import express from "express";
import { StocksService } from "../service/stocksService";

export const stocksRouter = express.Router();

const stocksService = new StocksService();

stocksRouter.post("/stocks", async (req, res) => {
  try {
    const { id, company, valuation, userId } = req.body;

    if (!company) throw new Error(" a company is needed");
    if (!valuation) throw new Error(" a valuation is needed");

    console.log(req.body);

    const stocks = await stocksService.createStocks(req.body);

    console.log(stocks);

    return res.send({ Stocks: stocks, message: "New Stocks created" });
  } catch (err: unknown) {
    console.error(err);

    if (err instanceof Error) return res.status(400).send(err.message);

    return res.status(500).send("Server Error");
  }
});

stocksRouter.get("/stocks", async (req, res) => {
  try {
    const stocks = await stocksService.listStocks();

    return res.send({ Stocks: stocks });
  } catch {
    return res.status(400).send({ message: "Error reading Stocks" });
  }
});

stocksRouter.get("/stocks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const stocks = await stocksService.findOneStocks(id);

    return res.send({ stocks });
  } catch {
    return res.status(400).send({ message: "Error reading Stocks" });
  }
});

stocksRouter.get("/manyStocks/:valuation", async (req, res) => {
  try {
    const { valuation } = req.params;

    const stocks = await stocksService.findManyStocks(parseFloat(valuation));

    return res.send({ stocks });
  } catch {
    return res.status(400).send({ message: "Error reading Stocks" });
  }
});

stocksRouter.delete("/stocks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("I need email for this!");

    if (!(await stocksService.findOneStocks(id)))
      throw new Error("This email does not exist");

    await stocksService.deleteStocks(id);

    return res.send({ message: "Stocks deleted" });
  } catch (err: unknown) {
    if (err instanceof Error) return res.status(400).send(err.message);
    return res.status(500).send("Server Error");
  }
});

stocksRouter.put("/stocks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!(await stocksService.findOneStocks(id)))
      throw new Error("This email does not exist");

    if (id !== data.id) throw new Error("Unable to change id");

    const stocks = await stocksService.updateStocks(data);

    return res.send({ id, stocks });
  } catch (err: unknown) {
    if (err instanceof Error) return res.status(400).send(err.message);
    return res.status(500).send("Error updating Stocks");
  }
});
