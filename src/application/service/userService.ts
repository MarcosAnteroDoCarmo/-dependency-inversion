import {
  CountUser,
  DeleteUser,
  FindManyUserRepository,
  FindOneUser,
  IUserRepository,
  ListUser,
  UpdateUser,
} from "../../domain/contracts/contractsUserRepo";
import { ConstructUserDTO, User } from "../../domain/entities/user";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  createUser(params: ConstructUserDTO): Promise<User> {
    const {
      id,
      userName,
      email,
      password,
      money,
      createdAt,
      profileId,
      houseIds,
      stockIds,
    } = params;

    const user = new User({
      id,
      userName,
      email,
      password,
      money,
      createdAt,
      profileId,
      houseIds,
      stockIds,
    });

    return this.userRepository.createUser(user);
  }

  findOneUser(params: FindOneUser) {
    const user = this.userRepository.findOneUser(params);

    return user;
  }

  async findManyUser(params: FindManyUserRepository) {
    const user = await this.userRepository.findManyUser(params);

    return user;
  }

  listUser(params: ListUser) {
    const user = this.userRepository.listUser(params);

    return user;
  }

  count(params: CountUser) {
    const user = this.userRepository.count(params);

    return user;
  }

  deleteUser(params: DeleteUser) {
    const user = this.userRepository.deleteUser(params);

    return user;
  }

  updateUser(params: UpdateUser) {
    const user = this.userRepository.updateUser(params);

    return user;
  }
}
