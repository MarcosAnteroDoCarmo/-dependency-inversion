import express from "express";
import { ProfileService } from "../service/profileService";

export const profileRouter = express.Router();

const profileService = new ProfileService();

profileRouter.post("/profiles", async (req, res) => {
  try {
    const { id, userName, createdAt, userId } = req.body;

    if (!userName) throw new Error(" a profileName is needed");

    console.log(req.body);

    if (await profileService.findOneProfile(userName))
      throw new Error("This profile already exists");

    const profile = await profileService.createProfile(req.body);

    console.log(profile);

    return res.send({ profile, message: "New profile created" });
  } catch (err: unknown) {
    if (err instanceof Error) return res.status(400).send(err.message);

    console.log(err);

    return res.status(500).send("Server Error");
  }
});

profileRouter.get("/profiles", async (req, res) => {
  try {
    const profiles = await profileService.listProfile();

    return res.send({ profiles });
  } catch {
    return res.status(400).send({ message: "Error reading profile" });
  }
});

profileRouter.get("/profiles/:email", async (req, res) => {
  try {
    const { email } = req.params;

    const profiles = await profileService.findOneProfile(email);

    return res.send({ profiles });
  } catch {
    return res.status(400).send({ message: "Error reading profile" });
  }
});

profileRouter.get("/manyprofiles/:profileName", async (req, res) => {
  try {
    const { profileName } = req.params;

    const profiles = await profileService.findManyProfile(profileName);

    return res.send({ profiles });
  } catch {
    return res.status(400).send({ message: "Error reading profile" });
  }
});

profileRouter.delete("/profiles/:email", async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) throw new Error("I need email for this!");

    if (!(await profileService.findOneProfile(email)))
      throw new Error("This email does not exist");

    await profileService.deleteProfile(email);

    return res.send({ message: "profile deleted" });
  } catch (err: unknown) {
    if (err instanceof Error) return res.status(400).send(err.message);
    return res.status(500).send("Server Error");
  }
});

profileRouter.put("/profiles/:userName", async (req, res) => {
  try {
    const { userName } = req.params;
    const data = req.body;

    if (!(await profileService.findOneProfile(userName)))
      throw new Error("This email does not exist");

    if (userName !== data.userName) throw new Error("Unable to change userName");

    const profile = await profileService.updateProfile(data);

    return res.send({ userName, profile });
  } catch (err: unknown) {
    if (err instanceof Error) return res.status(400).send(err.message);
    return res.status(500).send("Error updating profile");
  }
});
