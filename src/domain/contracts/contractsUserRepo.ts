import { Prisma } from "@prisma/client";
import { User } from "../entities/user";

export type CreateUser = User;
export type DeleteUser = { email: string };
export type UpdateUser = User;
export type TransferHouse = { recipientId: string; houseIds: string[] };
export type TransferStocks = { recipientId: string; stockIds: string[] };
export type UpdateMoney = {
  userId: string;
  value: number;
  options?: {
    select: { houses?: boolean; profile?: boolean; stocks?: boolean };
  };
};

export type FindOneUser = {
  email?: string;
  id?: string;
  options?: {
    include: { houses?: boolean; profile?: boolean; stocks?: boolean };
  };
};

export type FindManyUserParse = {
  query: {
    id?: string;
    userName?: string;
    email?: string;
    password?: string;
    money?: string | number;
    createdAt?: Date;
    profileId?: string | boolean;
    houseIds?: string | boolean;
    stockIds?: string | boolean;
    page?: string | number;
    pageSize?: string | number;
    skip?: number;
    take?: number;
    orderBy?: string;
    order?: Prisma.SortOrder;
    searchBy?: string;
    search?: string | number;
    fromCreatedAt?: string;
    toCreatedAt?: string;
    fromMoney?: string | number;
    toMoney?: string | number;
  };
};

export type FindManyUserRepository = {
  query: {
    id?: string;
    userName?: string;
    email?: string;
    password?: string;
    money?: number;
    createdAt?: Date;
    profileId?: string;
    houseIds?: string;
    stockIds?: string;
    page?: string | number;
    pageSize?: string | number;
    skip?: number;
    take?: number;
    orderBy?: string;
    order?: Prisma.SortOrder;
    searchBy?: string;
    search?: string;
    fromCreatedAt?: string;
    toCreatedAt?: string;
    fromMoney?: number;
    toMoney?: number;
  };
};
export type CountUser = Omit<
  FindManyUserRepository,
  "profileId" | "houseIds" | "stockIds"
>;

export type ListUser = {
  options?: {
    include: { houses?: boolean; profile?: boolean; stocks?: boolean };
  };
};

export interface IUserRepository {
  count: (params: CountUser) => Promise<number>;
  createUser: (params: CreateUser) => Promise<User>;
  deleteUser: (params: DeleteUser) => Promise<User>;
  updateUser: (params: UpdateUser) => Promise<User>;
  transferHouse: (params: TransferHouse) => Promise<User>;
  transferStocks: (params: TransferStocks) => Promise<User>;
  updateMoney: (params: UpdateMoney) => Promise<{
    id: string;
    email: string;
    money: number;
  }>;
  findOneUser: (params: FindOneUser) => Promise<User | void>;
  findManyUser: (params: FindManyUserRepository) => Promise<User[]>;
  listUser: (params: ListUser) => Promise<User[]>;
}
