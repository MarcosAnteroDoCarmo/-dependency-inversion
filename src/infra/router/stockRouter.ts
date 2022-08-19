import express from "express";
import { makeStockController } from "../../composition/application/controllers/makeStockController";

export const stocksRouter = express.Router();
const stockControler = makeStockController();

stocksRouter.post("/stocks", stockControler.create.bind(stockControler));

stocksRouter.get("/stocks", stockControler.list.bind(stockControler));

stocksRouter.get("/stocks/:id", stockControler.findOne.bind(stockControler));

stocksRouter.get("/manyStocks", stockControler.findMany.bind(stockControler));

stocksRouter.delete(
  "/stocks/:id",
  stockControler.deleteOne.bind(stockControler)
);

stocksRouter.put("/stocks/:id", stockControler.update.bind(stockControler));
