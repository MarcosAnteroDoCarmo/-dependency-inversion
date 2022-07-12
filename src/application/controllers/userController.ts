import express from "express";
import { UserService } from "../service/userService";

const userRouter = express.Router();

userRouter.post("/users", async (req, res) => {
  try {
    const { userName } = req.body;
    const { email } = req.body;
    const { password } = req.body;
    const { profile } = req.body;
    const { houses } = req.body;

    if (!userName) throw new Error(" a userName is needed");
    if (!email) throw new Error(" a email is needed");
    if (!password) throw new Error(" a password is needed");

    // if (await UserService.findOneUser({email})) throw new Error(" a profile is needed")

    if (!houses) throw new Error(" a houses is needed");
  } catch {}
});
