import { ConstructUserDTO, User } from "../../domain/entities/user";
import { UserRepo } from "../../infra/repositories/userRepo";

export class UserService {
  private repository: UserRepo;

  constructor() {
    this.repository = new UserRepo();
  }

  createUser(params: ConstructUserDTO): Promise<User> {
    const {
      id,
      userName,
      email,
      password,
      profile,
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
      profile,
      houseIds,
      stockIds,
    });

    return this.repository.createUser(user);
  }

  findOneUser(email: string) {
    const user = this.repository.findOneUser(email);

    return user;
  }

  findManyUser(userName: string) {
    const user = this.repository.findManyUser(userName);

    return user;
  }

  listUser() {
    const user = this.repository.listUser();

    return user;
  }

  deleteUser(email: string) {
    const user = this.repository.deleteUser(email);

    return user;
  }

  updateUser(params: User) {
    const user = this.repository.updateUser(params);

    return user;
  }
}
