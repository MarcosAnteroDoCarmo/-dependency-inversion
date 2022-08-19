import { Prisma } from "@prisma/client";
import { User } from "../entities/user";

export type CreateUser = User;
export type DeleteUser = { email: string };
export type UpdateUser = User;
export type TransferHouse = { recipientId: string; houseIds: string[] };
export type TransferStocks = { recipientId: string; stockIds: string[] };
export type UpdadeMoney = {
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

export type FindManyUser = {
  queryOptions?: {
    id?: string;
    userName?: string;
    email?: string;
    password?: string;
    money?: number;
    createdAt?: Date;
    profileId?: boolean;
    houseIds?: boolean;
    stockIds?: boolean;
    page?: number;
    pageSize?: number;
    orderBy?: string;
    order?: Prisma.SortOrder;
    searchBy?: string;
    search?: string;
    from?: string;
    to?: string;
    not?: string;
  };
};

export type ListUser = {
  options?: {
    include: { houses?: boolean; profile?: boolean; stocks?: boolean };
  };
};

export interface IUserRepository {
  count: () => Promise<number>;
  createUser: (params: CreateUser) => Promise<User>;
  deleteUser: (params: DeleteUser) => Promise<User>;
  updateUser: (params: UpdateUser) => Promise<User>;
  transferHouse: (params: TransferHouse) => Promise<User>;
  transferStocks: (params: TransferStocks) => Promise<User>;
  updadeMoney: (params: UpdadeMoney) => Promise<{
    id: string;
    email: string;
    money: number;
  }>;
  findOneUser: (params: FindOneUser) => Promise<User | void>;
  findManyUser: (params: FindManyUser) => Promise<User[]>;
  listUser: (params: ListUser) => Promise<User[]>;
}
