import { IHouseRepository } from "../../domain/contracts/contractsHouseRepo";
import { IStocksRepository } from "../../domain/contracts/contractsStocksRepo";
import { IUserRepository } from "../../domain/contracts/contractsUserRepo";

export class UseCaseService {
  constructor(
    private userRepository: IUserRepository,
    private houseRepository: IHouseRepository,
    private stockRepository: IStocksRepository
  ) {}

  async transferMoney(
    userId: string,
    recipientUserId: string,
    amountMoney: number
  ) {
    try {
      if (!userId || !recipientUserId || !amountMoney) {
        throw new Error("A mandatory field has not been filled");
      }

      if (amountMoney < 0) {
        throw new Error("It is not possible to transfer negative values");
      }

      const payUser = await this.userRepository.findOneUser({ id: userId });

      if (!payUser) {
        throw new Error("I need a User for this");
      }

      if (!payUser.money) {
        payUser.money = 0;
      }

      if (payUser.money < amountMoney) {
        throw new Error("Not enough money for it");
      }

      const receiverUser = await this.userRepository.findOneUser({
        id: recipientUserId,
      });

      if (!receiverUser) {
        throw new Error("I need a receiving User for this");
      }
      if (!receiverUser.money) {
        receiverUser.money = 0;
      }

      const newValuePay = payUser.money - amountMoney;

      const newValueReceiver = receiverUser.money + amountMoney;

      const payUserNow = await this.userRepository.updadeMoney({
        userId: userId,
        value: newValuePay,
      });

      const receiverUserNow = await this.userRepository.updadeMoney({
        userId: recipientUserId,
        value: newValueReceiver,
      });

      return [payUserNow, receiverUserNow];
    } catch (err) {
      throw new Error("Transfer cannot be performed");
    }
  }

  async buyHouse(buyerId: string, houseId: string, amountMoney: number) {
    try {
      if (!buyerId || !houseId || !amountMoney) {
        throw new Error("A mandatory field has not been filled");
      }
      if (amountMoney < 0) {
        throw new Error("It is not possible to transfer negative values");
      }

      const buyerUser = await this.userRepository.findOneUser({ id: buyerId });

      if (!buyerUser) {
        throw new Error("This User does not exist");
      }

      if (!buyerUser.money) {
        buyerUser.money = 0;
      }

      if (buyerUser.money < amountMoney) {
        throw new Error("Not enough money for it");
      }
      const newValue = buyerUser.money - amountMoney;

      const house = await this.houseRepository.findOneHouse({
        id: houseId,
        options: { include: { user: true } },
      });

      if (!house) {
        throw new Error("This House does not exist");
      }

      await this.userRepository.transferHouse({
        recipientId: buyerId,
        houseIds: [houseId],
      });

      const buyerUserNow = await this.userRepository.updadeMoney({
        userId: buyerId,
        value: newValue,
        options: { select: { houses: true } },
      });

      if (!house.userId) {
        return buyerUserNow;
      }

      const sellerUse = await this.userRepository.findOneUser({
        id: house.userId,
      });

      if (!sellerUse) {
        return buyerUserNow;
      }

      if (!sellerUse.id) {
        throw new Error("the owner does not have an ID");
      }

      if (!sellerUse.money) {
        sellerUse.money = 0;
      }

      const newValueReceiver = sellerUse.money + amountMoney;

      const sellerUserNow = await this.userRepository.updadeMoney({
        userId: sellerUse.id,
        value: newValueReceiver,
      });

      return [buyerUserNow, sellerUserNow];
    } catch (err) {
      throw new Error("Transfer cannot be performed");
    }
  }

  async buyStock(buyerId: string, stockId: string[], amountMoney: number) {
    try {
      if (!buyerId || !stockId || !amountMoney) {
        throw new Error("A mandatory field has not been filled");
      }
      if (amountMoney < 0) {
        throw new Error("It is not possible to transfer negative values");
      }

      const buyerUser = await this.userRepository.findOneUser({ id: buyerId });

      if (!buyerUser) {
        throw new Error("This User does not exist");
      }

      if (!buyerUser.money) {
        buyerUser.money = 0;
      }

      if (buyerUser.money < amountMoney) {
        throw new Error("Not enough money for it");
      }
      const newValue = buyerUser.money - amountMoney;

      const stock = async (stocks: string[]) => {
        const stockList = [];

        await stockList.push(
          stocks.map((stockId) =>
            this.stockRepository.findOneStock({
              id: stockId,
              options: { include: { user: false } },
            })
          )
        );
      };

      if (!stock) {
        throw new Error("stocks not found");
      }

      await this.userRepository.transferStocks({
        recipientId: buyerId,
        stockIds: stockId,
      });

      const buyerUserNow = await this.userRepository.updadeMoney({
        userId: buyerId,
        value: newValue,
        options: { select: { stocks: true } },
      });

      return buyerUserNow;
    } catch (err) {
      throw new Error("Transfer cannot be performed");
    }
  }

  async patrimony(userId: string) {
    const user = await this.userRepository.findOneUser({
      id: userId,
      options: { include: { houses: true, stocks: true } },
    });

    if (!user?.id || !user) {
      throw new Error("This User does not exist");
    }

    if (!user.houseIds) {
      user.houseIds = [];
    }

    if (!user.stockIds) {
      user.stockIds = [];
    }

    if (!user.money) {
      user.money = 0;
    }

    if (user.houseIds.length === 0 && user.stockIds.length === 0) {
      const patrimony = user.money;

      return patrimony;
    }

    const houses = await this.houseRepository.findManyHouse({
      userId: user.id,
    });

    const housesValuation = houses.reduce(
      (inicial, house) => inicial + (house?.valuation ?? 0),
      0
    );

    const stocks = await this.stockRepository.findManyStocks({
      userIds: user.id,
    });

    const stockValuation = stocks.reduce(
      (inicial, stock) => inicial + (stock?.valuation ?? 0),
      0
    );

    const patrimony = user.money + housesValuation + stockValuation;

    return patrimony;
  }
}
