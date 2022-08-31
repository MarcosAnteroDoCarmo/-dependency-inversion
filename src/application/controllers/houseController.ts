import { Request, Response } from "express";
import { HouseService } from "../service/houseService";

export class HouseController {
  constructor(private houseService: HouseService) {}

  async create(req: Request, res: Response) {
    try {
      const { address, valuation } = req.body;

      if (!address) throw new Error(" a address is needed");

      if (!valuation) throw new Error(" a valuation is needed");

      if (await this.houseService.findOneHouse({ address }))
        throw new Error("This House already exists");

      const house = await this.houseService.createHouse(req.body);

      return res.send({ house, message: "New House created" });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);

      return res.status(500).send("Server Error");
    }
  }

  async list(req: Request, res: Response) {
    try {
      const houses = await this.houseService.listHouse();

      return res.send({ houses });
    } catch {
      return res.status(400).send({ message: "Error reading House" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { address } = req.params;

      const houses = await this.houseService.findOneHouse({ address });

      return res.send({ houses });
    } catch {
      return res.status(400).send({ message: "Error reading House" });
    }
  }

  async findMany(req: Request, res: Response) {
    try {
      const { ids } = req.body;

      const houses = await this.houseService.findManyHouse({ ids });

      return res.send({ houses });
    } catch {
      return res.status(400).send({ message: "Error reading House" });
    }
  }

  async deleteOne(req: Request, res: Response) {
    try {
      const { address } = req.params;

      if (!address) throw new Error("I need address for this!");

      if (!(await this.houseService.findOneHouse({ address })))
        throw new Error("This address does not exist");

      await this.houseService.deleteHouse(address);

      return res.send({ message: "House deleted" });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);
      return res.status(500).send("Server Error");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { address } = req.params;
      const data = req.body;

      if (!(await this.houseService.findOneHouse({ address })))
        throw new Error("This address does not exist");

      if (address !== data.address) throw new Error("Unable to change address");

      const house = await this.houseService.updateHouse(data);

      return res.send({ address, house });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);
      return res.status(500).send("Error updating House");
    }
  }
}
