import express from "express";
import { makeHouseController } from "../../composition/application/controllers/makeHouseController";

export const houseRouter = express.Router();

const houseController = makeHouseController();

houseRouter.post("/houses", houseController.create.bind(houseController));

houseRouter.get("/houses", houseController.list.bind(houseController));

houseRouter.get(
  "/houses/:address",
  houseController.findOne.bind(houseController)
);

houseRouter.get("/manyHouses", houseController.findMany.bind(houseController));

houseRouter.delete(
  "/houses/:address",
  houseController.deleteOne.bind(houseController)
);

houseRouter.put(
  "/houses/:address",
  houseController.update.bind(houseController)
);
