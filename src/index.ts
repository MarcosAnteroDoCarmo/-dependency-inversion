import express from "express";
import bodyParser from "body-parser";
import { userRouter } from "./application/controllers/userController";
import { profileRouter } from "./application/controllers/profileController";
import { houseRouter } from "./application/controllers/houseController";
import { stocksRouter } from "./application/controllers/stocksController";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRouter);
app.use(profileRouter);
app.use(houseRouter);
app.use(stocksRouter);

const porta = 3000;

app.listen(porta, () => console.log(`Rodando na porta ${porta} !!`));
