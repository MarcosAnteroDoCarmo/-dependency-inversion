import express from "express";
import { UseCaseController } from "../../application/controllers/useCaseController";
import { makeUseCaseController } from "../../composition/application/controllers/makeUseCaseController";

export const useCaseRouter = express.Router();

const useCaseController = makeUseCaseController();

useCaseRouter.post(
  "/transfermoney",
  useCaseController.transferMoney.bind(useCaseController)
);

useCaseRouter.post(
  "/buyhouse",
  useCaseController.buyHouse.bind(useCaseController)
);

useCaseRouter.post(
  "/buystocks",
  useCaseController.buyStocks.bind(useCaseController)
);

useCaseRouter.post(
  "/patrimony",
  useCaseController.patrimony.bind(useCaseController)
);
