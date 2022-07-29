import express from "express";
import bodyParser from "body-parser";
import { userRouter } from "./infra/router/userRouter";
import { profileRouter } from "./infra/router/profileRouter";
import { houseRouter } from "./infra/router/houseRouter";
import { stocksRouter } from "./infra/router/stockRouter";


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRouter);
app.use(profileRouter);
app.use(houseRouter);
app.use(stocksRouter);

const porta = 3000;

app.listen(porta, () => console.log(`Rodando na porta ${porta} !!`));
