import { NextFunction, Request, Response } from "express";
import { FindManyUserParse } from "../../domain/contracts/contractsUserRepo";
import {
  getRelationTrueOrFalse,
  stringToNumberOrUndefined,
} from "../../helpers";

export const parseFindMany = (
  req: Request<{}, {}, {}, FindManyUserParse["query"]>,
  res: Response,
  next: NextFunction
) => {
  const query = req.query as FindManyUserParse["query"];

  

  if (query.pageSize) {
    query.take = Number(query.pageSize || 5);
  }

  if (query.page) {
    query.skip = Number(query.page || 0) * Number(query.pageSize || 1);
  }
  

  if (query.money) {
    query.money = stringToNumberOrUndefined(query.money);
  }

  if (query.fromMoney) {
    query.fromMoney = stringToNumberOrUndefined(query.fromMoney);
  }

  if (query.toMoney) {
    query.toMoney = stringToNumberOrUndefined(query.toMoney);
  }

  if (query.profileId) {
    query.profileId = getRelationTrueOrFalse(query.profileId);
  }

  if (query.houseIds) {
    query.houseIds = getRelationTrueOrFalse(query.houseIds);
  }

  if (query.stockIds) {
    query.stockIds = getRelationTrueOrFalse(query.stockIds);
  }

  next();
};
