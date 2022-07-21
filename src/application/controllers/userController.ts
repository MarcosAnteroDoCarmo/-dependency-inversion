import express from "express";
import { UserService } from "../service/userService";

export const userRouter = express.Router();

const userService = new UserService();

userRouter.post("/users", async (req, res) => {
  try {
    const { email, password, userName, houseIds, profile, profileId, stocks } = req.body;

    if (!userName) throw new Error(" a userName is needed");
    if (!email) throw new Error(" a email is needed");
    if (!password) throw new Error(" a password is needed");

    console.log(req.body);

    if (await userService.findOneUser(email))
      throw new Error("This user already exists");

    const user = await userService.createUser(req.body);

    console.log(user);

    return res.send({ user, message: "New user created" });
  } catch (err: unknown) {
    if (err instanceof Error) return res.status(400).send(err.message);

    console.log(err);

    return res.status(500).send("Server Error");
  }
});

userRouter.get("/users", async (req, res) => {
  try {
    const users = await userService.listUser();

    return res.send({ users });
  } catch {
    return res.status(400).send({ message: "Error reading user" });
  }
});

userRouter.get("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const users = await userService.findOneUser(email);

    return res.send({ users });
  } catch {
    return res.status(400).send({ message: "Error reading user" });
  }
});

userRouter.get("/manyusers/:userName", async (req, res) => {
  try {
    const { userName } = req.params;

    const users = await userService.findManyUser(userName);

    return res.send({ users });
  } catch {
    return res.status(400).send({ message: "Error reading user" });
  }
});

userRouter.delete("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) throw new Error("I need email for this!");

    if (!(await userService.findOneUser(email)))
      throw new Error("This email does not exist");

    await userService.deleteUser(email);

    return res.send({ message: "User deleted" });
  } catch (err: unknown) {
    if (err instanceof Error) return res.status(400).send(err.message);
    return res.status(500).send("Server Error");
  }
});

userRouter.put("/users/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const data = req.body;

    if (!(await userService.findOneUser(email)))
      throw new Error("This email does not exist");

    if (email !== data.email) throw new Error("Unable to change email");

    const user = await userService.updateUser(data);

    return res.send({ email, user });
  } catch (err: unknown) {
    if (err instanceof Error) return res.status(400).send(err.message);
    return res.status(500).send("Error updating user");
  }
});
