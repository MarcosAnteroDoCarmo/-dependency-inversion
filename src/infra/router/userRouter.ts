import express from "express";
import { parseFindMany } from "../../application/middleware/parseFindMany";
import { makeUserController } from "../../composition/application/controllers/makeUserController";

export const userRouter = express.Router();

const userController = makeUserController();

userRouter.post("/users", userController.create.bind(userController));

userRouter.get("/users", userController.list.bind(userController));

userRouter.get("/users/:email", userController.findOne.bind(userController));

userRouter.get("/manyusers",parseFindMany, userController.findMany.bind(userController));

userRouter.delete("/users/:email",userController.deleteOne.bind(userController));

userRouter.put("/users/:email", userController.update.bind(userController));
