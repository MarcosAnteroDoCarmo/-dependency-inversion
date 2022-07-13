import { ConstructUserDTO, User } from "../../domain/user";

export class UserService {
  private constructor() {}

  static createUser(params: ConstructUserDTO): User {
    const { id, userName, email, password, profile, houses, stocks } = params;

    return new User({ id, userName, email, password, profile, houses, stocks });
  }

   static findOneUser(email: User){

    
   }



  }
  
  //  static deleteUser: (params: ConstructUserDTO)
  //  findManyUser: (params: User)
  //  listUser: (params: User)
  //  updateUser: (params: User)
  
  // const userTest = UserService.createUser({
//   userName: "marcos",
//   email: "marcos@123",
//   password: "123",
//   profile: "marcosla",
//   houses: "444",
// });

// console.log(userTest);
