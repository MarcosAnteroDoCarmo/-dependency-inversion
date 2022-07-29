import express from "express";
import { makeProfileController } from "../../composition/application/controllers/makeProfileController";

export const profileRouter = express.Router();

const profileController = makeProfileController();

profileRouter.post(
  "/profiles",
  profileController.create.bind(profileController)
);

profileRouter.get("/profiles", profileController.list.bind(profileController));

profileRouter.get(
  "/profiles/:userName",
  profileController.findOne.bind(profileController)
);

profileRouter.get(
  "/manyprofiles/:userName",
  profileController.findMany.bind(profileController)
);

profileRouter.delete(
  "/profiles/:userName",
  profileController.deleteOne.bind(profileController)
);

profileRouter.put(
  "/profiles/:userName",
  profileController.update.bind(profileController)
);
