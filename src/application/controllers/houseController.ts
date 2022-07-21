import express from "express";
import { HouseService } from "../service/houseService";

export const houseRouter = express.Router();

const houseService = new HouseService();

houseRouter.post("/houses", async (req, res) => {
  try {
    const { id, address, valuation, userId } = req.body;

    if (!address) throw new Error(" a address is needed");
    if (!valuation) throw new Error(" a valuation is needed");

    console.log(req.body);

    if (await houseService.findOneHouse(address))
      throw new Error("This House already exists");

    const house = await houseService.createHouse(req.body);

    console.log(house);

    return res.send({ house, message: "New House created" });
  } catch (err: unknown) {
    if (err instanceof Error) return res.status(400).send(err.message);

    console.log(err);

    return res.status(500).send("Server Error");
  }
});

houseRouter.get("/houses", async (req, res) => {
  try {
    const houses = await houseService.listHouse();

    return res.send({ houses });
  } catch {
    return res.status(400).send({ message: "Error reading House" });
  }
});

houseRouter.get("/houses/:address", async (req, res) => {
  try {
    const { address } = req.params;

    const houses = await houseService.findOneHouse(address);

    return res.send({ houses });
  } catch {
    return res.status(400).send({ message: "Error reading House" });
  }
});

houseRouter.get("/manyHouses/:valuation", async (req, res) => {
  try {
    const { valuation } = req.params;

    const houses = await houseService.findManyHouse(parseFloat(valuation));

    return res.send({ houses });
  } catch {
    return res.status(400).send({ message: "Error reading House" });
  }
});

houseRouter.delete("/houses/:address", async (req, res) => {
  try {
    const { address } = req.params;

    if (!address) throw new Error("I need address for this!");

    if (!(await houseService.findOneHouse(address)))
      throw new Error("This address does not exist");

    await houseService.deleteHouse(address);

    return res.send({ message: "House deleted" });
  } catch (err: unknown) {
    if (err instanceof Error) return res.status(400).send(err.message);
    return res.status(500).send("Server Error");
  }
});

houseRouter.put("/houses/:address", async (req, res) => {
  try {
    const { address } = req.params;
    const data = req.body;

    if (!(await houseService.findOneHouse(address)))
      throw new Error("This address does not exist");

    if (address !== data.address) throw new Error("Unable to change address");

    const house = await houseService.updateHouse(data);

    return res.send({ address, house });
  } catch (err: unknown) {
    if (err instanceof Error) return res.status(400).send(err.message);
    return res.status(500).send("Error updating House");
  }
});
