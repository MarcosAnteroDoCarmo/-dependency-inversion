import { HouseController } from "../../../application/controllers/houseController";
import { makeHouseService } from "../services/makeHouseService";

export const makeHouseController = () => {
  const service = makeHouseService();
  return new HouseController(service);
};
