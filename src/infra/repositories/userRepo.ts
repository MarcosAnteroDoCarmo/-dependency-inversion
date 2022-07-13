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

    console.log(user);

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
    const user = await prismaClient.user.findMany({where:{userName},
      select: { userName: true },
    });

    if (!user) throw new Error("User not found");

    return this.prismaUserToUser(user);
  }

  async deleteUser(email: string) {
    const user = (await prismaClient.user.delete({
      where: { email },
    })) as PrismaUser | null;

    if (!user) throw new Error("User not found");

    return this.prismaUserToUser(user);
  }

  prismaUserToUser(params: PrismaUser): User {
    return UserService.createUser({
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

const repository = new UserRepo();

// const user2 = UserService.createUser({
//   email: "marcos14",
//   password: "marcos2",
//   userName: "marcos3",
//   houses: "marcos4",
//   profile: "marcos5",
//   stocks: "marcos6"
// });

// console.log(user2)
// repository.createUser(user2)

// const findUser = async () => {
//   const user = await repository.findOneUser("marcos13");

//   console.log(user);
// };

// findUser();

// const delet = async () => {
//   const user = await repository.deleteUser("marcos12");

//   console.log(user);
// };

// delet();
