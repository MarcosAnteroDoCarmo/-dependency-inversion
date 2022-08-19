import { UseCaseController } from "../../../application/controllers/useCaseController";
import { makeUseCaseService } from "../services/makeUseCaseService";


export const makeUseCaseController = () => {
  const service = makeUseCaseService();
  return new UseCaseController(service);
};
