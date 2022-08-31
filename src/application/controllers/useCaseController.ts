import { Request, Response } from "express";
import { UseCaseService } from "../service/useCaseService";

export class UseCaseController {
  constructor(private useCaseService: UseCaseService) {}

  async transferMoney(req: Request, res: Response) {
    try {
      const { userId, recipientUserId, amountMoney } = req.body;

      const trade = await this.useCaseService.transferMoney(
        userId,
        recipientUserId,
        amountMoney
      );

      const message = "transfer made successfully";

      return res.send({ message, trade });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);
      return res.status(500).send("Error transferring money");
    }
  }

  async buyHouse(req: Request, res: Response) {
    try {
      const { buyerId, houseId, amountMoney } = req.body;

      const tradeHouse = await this.useCaseService.buyHouse(
        buyerId,
        houseId,
        amountMoney
      );

      const message = "transfer made successfully";

      return res.send({ message, tradeHouse });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);
      return res.status(500).send("Error transferring house");
    }
  }

  async buyStocks(req: Request, res: Response) {
    try {
      const { buyerId, stockId, amountMoney } = req.body;

      const tradeStock = await this.useCaseService.buyStock(
        buyerId,
        stockId,
        amountMoney
      );

      const message = "transfer made successfully";

      return res.send({ message, tradeStock });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);
      return res.status(500).send("Error transferring house");
    }
  }
  async patrimony(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      const patrimony = await this.useCaseService.patrimony(userId);

      const message = "transfer made successfully";

      return res.send({ message, patrimony });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);
      return res.status(500).send("Error transferring house");
    }
  }
}
