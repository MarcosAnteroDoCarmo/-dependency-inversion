import { Request, Response } from "express";
import { UserService } from "../service/userService";

export class UserController {
  constructor(private userService: UserService) {}

  async create(req: Request, res: Response) {
    try {
      const { email, password, userName } = req.body;

      if (!userName) throw new Error(" a userName is needed");
      if (!email) throw new Error(" a email is needed");
      if (!password) throw new Error(" a password is needed");

      console.log("controller........................................");
      console.log(req.body);

      if (await this.userService.findOneUser({ email }))
        throw new Error("This user already exists");

      const user = await this.userService.createUser(req.body);

      console.log("Retorno do Controller.............................");
      console.log(user);

      return res.send({ user, message: "New user created" });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);

      console.log(err);

      return res.status(500).send("Server Error");
    }
  }

  async list(req: Request, res: Response) {
    try {
      const options = {
        include: { houses: true, profile: true, stocks: true },
      };
      const users = await this.userService.listUser({ options });

      return res.send({ users });
    } catch {
      return res.status(400).send({ message: "Error reading user" });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const users = await this.userService.findOneUser({ email });

      return res.send({ users });
    } catch {
      return res.status(400).send({ message: "Error reading user" });
    }
  }

  async findMany(req: Request, res: Response) {
    try {
      const queryOptions = req.query;

      const users = await this.userService.findManyUser({
        queryOptions,
      });
      const count = await this.userService.count();

      return res.send({ count, users });
    } catch (e) {
      console.error(e);
      return res.status(400).send({ message: "Error reading user" });
    }
  }

  async deleteOne(req: Request, res: Response) {
    try {
      const { email } = req.params;

      if (!email) throw new Error("I need email for this!");

      if (!(await this.userService.findOneUser({ email })))
        throw new Error("This email does not exist");

      await this.userService.deleteUser({ email });

      return res.send({ message: "User deleted" });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);
      return res.status(500).send("Server Error");
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const data = req.body;

      if (!(await this.userService.findOneUser({ email })))
        throw new Error("This email does not exist");

      if (email !== data.email) throw new Error("Unable to change email");

      const user = await this.userService.updateUser(data);

      return res.send({ email, user });
    } catch (err: unknown) {
      if (err instanceof Error) return res.status(400).send(err.message);
      return res.status(500).send("Error updating user");
    }
  }
}
