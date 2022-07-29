import { Request, Response } from "express";
import { ProfileService } from "../service/profileService";

export class ProfileController {
  constructor(private profileService: ProfileService) {}

  async create(req: Request, res: Response) {
    try {
      const { id, userName, createdAt, userId } = req.body;

      if (!userName) throw new Error(" a profileName is needed");

      console.log(req.body);

      if (await this.profileService.findOneProfile(userName))
        throw new Error("This profile already exists");

      const profile = await this.profileService.createProfile(req.body);

      console.log(profile);

      return res.send({ profile, message: "New profile created" });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);

      console.log(err);

      return res.status(500).send("Server Error");
    }
  }

  async list(req: Request, res: Response) {
    try {
      const profiles = await this.profileService.listProfile();

      return res.send({ profiles });
    } catch {
      return res.status(400).send({ message: "Error reading profile" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { userName } = req.params;

      const profiles = await this.profileService.findOneProfile(userName);

      return res.send({ profiles });
    } catch {
      return res.status(400).send({ message: "Error reading profile" });
    }
  }

  async findMany(req: Request, res: Response) {
    try {
      const { userName } = req.params;

      const profiles = await this.profileService.findManyProfile(userName);

      return res.send({ profiles });
    } catch {
      return res.status(400).send({ message: "Error reading profile" });
    }
  }

  async deleteOne(req: Request, res: Response) {
    try {
      const { userName } = req.params;

      if (!userName) throw new Error("I need userName for this!");

      if (!(await this.profileService.findOneProfile(userName)))
        throw new Error("This userName does not exist");

      await this.profileService.deleteProfile(userName);

      return res.send({ message: "profile deleted" });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);
      return res.status(500).send("Server Error");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { userName } = req.params;
      const data = req.body;

      if (!(await this.profileService.findOneProfile(userName)))
        throw new Error("This userName does not exist");

      if (userName !== data.userName)
        throw new Error("Unable to change userName");

      const profile = await this.profileService.updateProfile(data);

      return res.send({ userName, profile });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);
      return res.status(500).send("Error updating profile");
    }
  }
}
