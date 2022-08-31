import express from "express";
import bodyParser from "body-parser";
import { houseRouter } from "./infra/router/houseRouter";
import { profileRouter } from "./infra/router/profileRouter";
import { stocksRouter } from "./infra/router/stockRouter";
import { useCaseRouter } from "./infra/router/useCaseRouter";
import { userRouter } from "./infra/router/userRouter";

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(houseRouter);
app.use(profileRouter);
app.use(stocksRouter);
app.use(useCaseRouter);
app.use(userRouter);

const port = 3000;

app.listen(port, () => console.log(`Running on port  ${port} !!`));
