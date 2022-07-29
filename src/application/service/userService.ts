import { IUserRepository } from "../../domain/contracts/contractsUserRepo";
import { ConstructUserDTO, User } from "../../domain/entities/user";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  createUser(params: ConstructUserDTO): Promise<User> {
    const {
      id,
      userName,
      email,
      password,
      profileId,
      houseIds,
      stockIds,
    } = params;

    const user = new User({
      id,
      userName,
      email,
      password,
      profileId,
      houseIds,
      stockIds,
    });

    console.log("service..............................................")
    console.log(user)

    return this.userRepository.createUser(user);
  }

  findOneUser(email: string) {
    const user = this.userRepository.findOneUser(email);

    return user;
  }

  findManyUser(userName: string) {
    const user = this.userRepository.findManyUser(userName);

    return user;
  }

  listUser(options?: {
    include: { houses: boolean; profile: boolean; stocks: boolean };
  }) {
    const user = this.userRepository.listUser(options);

    return user;
  }

  deleteUser(email: string) {
    const user = this.userRepository.deleteUser(email);

    return user;
  }

  updateUser(params: User) {
    const user = this.userRepository.updateUser(params);

    return user;
  }
}

