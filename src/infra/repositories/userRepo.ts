import { UserService } from "../../application/service/userService";
import { IUserRepository } from "../../domain/contracts/contractsUserRepo";
import { User } from "../../domain/user";
import { prismaClient } from "../data/mysql/prismaClient";

type PrismaUser = {
  id?: string;
  email: string;
  password: string;
  userName: string;
  houses?: string;
  profile?: string;
  stocks?: string;
};

export type ManyUsers = {
  id: string;
  userName: string;
  email: string;
  password: string;
  profile: string | null;
  houses: string | null;
  stocks: string | null;
}[];

export class UserRepo implements IUserRepository {
  constructor() {}

  async createUser(params: User) {
    const user = (await prismaClient.user.create({
      data: {
        email: params.email,
        password: params.password,
        userName: params.userName,
        houses: params.houses,
        profile: params.profile,
        stocks: params.stocks,
      },
    })) as PrismaUser;

    return this.prismaUserToUser(user);
  }

  async findOneUser(email: string) {
    const user = (await prismaClient.user.findUnique({
      where: { email },
    })) as PrismaUser | null;

    if (!user) throw new Error("User not found");

    return this.prismaUserToUser(user);
  }

  async findManyUser(userName: string) {
    const user = await prismaClient.user.findMany({
      where: { userName },
      select: {
        id: true,
        email: true,
        userName: true,
        password: true,
        profile: true,
        houses: true,
        stocks: true,
      },
    });

    if (!user) throw new Error("User not found");

    return user;
  }

  async listUser() {
    const users = await prismaClient.user.findMany();

    if (!users) throw new Error("User not found");

    return users;
  }

  async deleteUser(email: string) {
    const user = (await prismaClient.user.delete({
      where: { email },
    })) as PrismaUser | null;

    if (!user) throw new Error("User not found");

    return this.prismaUserToUser(user);
  }

  async updateUser(params: User) {
    const user = (await prismaClient.user.update({
      where: { email: params.email },
      data: {
        email: params.email,
        password: params.password,
        userName: params.userName,
        houses: params.houses,
        profile: params.profile,
        stocks: params.stocks,
      },
    })) as PrismaUser | null;

    if (!user) throw new Error("User not found");

    return this.prismaUserToUser(user);
  }

  prismaUserToUser(params: PrismaUser): User {
    return new User({
      id: params.id,
      userName: params.userName,
      email: params.email,
      password: params.password,
      profile: params.profile,
      houses: params.houses,
      stocks: params.stocks,
    });
  }
}

// const repository = new UserRepo();

// const createUser = async (params: User) => {
//   const user = await repository.createUser(params);

//   console.log(user);
// };

// const findUser = async (email:string) => {
//   const user = await repository.findOneUser(email);

//   console.log(user);
// };

// const many = async (userName:string) => {
//   const users = await repository.findManyUser(userName);

//   console.log(users);
// };

// const list = async () => {

//  const user = await repository.listUser()

//  console.log(user)
// }

// const delet = async (email:string) => {
//   const user = await repository.deleteUser(email);

//   console.log(user);
// };

// const update = async (params: User) => {
//   const v = await repository.updateUser(params);

//   console.log(v);
// };

// // const user = new User({
// //   email: "marcos20",
// //   password: "marcos7755",
// //   userName: "marcos3",
// //   houses: "marcos5555",
// //   profile: "marcos0000",
// //   stocks: "marcos9889",
// // });

// // console.log(user);

// // createUser(user);
// // findUser("marcos20");
// // many("marcos3");
// // list();
// // delet("marcos20");
// // update(user);
