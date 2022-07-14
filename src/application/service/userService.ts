import { ConstructUserDTO, User } from "../../domain/user";
import { UserRepo } from "../../infra/repositories/userRepo";

const repository = new UserRepo();

export class UserService {
  private constructor() {}

  static createUser(params: ConstructUserDTO): User {
    const { id, userName, email, password, profile, houses, stocks } = params;

    const user = new User({
      id,
      userName,
      email,
      password,
      profile,
      houses,
      stocks,
    });

    repository.createUser(user);

    return user;
  }

  static findOneUser(email: string) {
    const user = repository.findOneUser(email);

    return user;
  }

  static findManyUser(userName: string) {
    const user = repository.findManyUser(userName);

    return user;
  }

  static listUser() {
    const user = repository.listUser();

    return user;
  }

  static deleteUser(email: string) {
    const user = repository.deleteUser(email);

    return user;
  }

  static updateUser(params: User) {
    const user = repository.updateUser(params);

    return user;
  }
}

// UserService.createUser({
//     email: "marcos23",
//     password: "marcos7755",
//     userName: "marcos3",
//     houses: "marcos5555",
//     profile: "marcos0000",
//     stocks: "marcos9889",
//   })

// const findUser = async (email:string) => {
//   const user = await UserService.findOneUser(email);

//   console.log(user);
// };
// findUser("marcos25")

// const findMany = async (userName:string) => {
//   const user = await UserService.findManyUser(userName);

//   console.log(user);
// };
// findMany("marcos3")

// const list = async () => {
//   const user = await UserService.listUser();

//   console.log(user);
// };
// list();

// const delet = async (email: string) => {
//   const user = await UserService.deleteUser(email);

//   console.log(user);
// };
// delet("marcos11");

// const user = new User({
//   email: "marcos16",
//   password: "marcos7755",
//   userName: "marcos3",
//   houses: "marcos5555",
//   profile: "marcos0000",
//   stocks: "marcos9889",
// });

// console.log(user);

// const update = async (params: User)=>{
//   const user = await UserService.updateUser(params)

//   console.log(user)
// }
// update(user)