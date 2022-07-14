import express from "express";
import { UserService } from "../service/userService";

export const userRouter = express.Router();

userRouter.post("/users", async (req, res) => {
  try {
    const { userName } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const { profile } = req.body;
    const { houses } = req.body;
    const { stocks } = req.body;

    if (!userName) throw new Error(" a userName is needed");
    if (!email) throw new Error(" a email is needed");
    if (!password) throw new Error(" a password is needed");

    if (await UserService.findOneUser(email))
      throw new Error("This user already exists");

    const user = await UserService.createUser({
      userName,
      email,
      password,
      profile,
      houses,
      stocks,
    });

    return res.send({ user, message: "New user created" });
  } catch (err: unknown) {
    if (err instanceof Error) return res.status(400).send(err.message);
    console.log(err);
    return res.status(500).send("Server Error");
  }
});


// export default userRouter