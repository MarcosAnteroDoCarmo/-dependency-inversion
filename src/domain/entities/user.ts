export type ConstructUserDTO = {
  id?: string;
  userName: string;
  email: string;
  password: string;
  profileId?: string;
  profile?: string;
  houseIds?: string[];
  stockIds?: string[];
};

export class User {
  private _id?: string;
  private _userName: string;
  private _email: string;
  private _password: string;
  private _profileId?: string;
  private _profile?: string;
  private _houseIds?: string[];
  private _stockIds?: string[];

  constructor(params: ConstructUserDTO) {
    this._id = params.id;
    this._userName = params.userName;
    this._email = params.email;
    this._password = params.password;
    this._profileId = params.profileId;
    this._profile = params.profile;
    this._houseIds = params.houseIds;
    this._stockIds = params.stockIds;
  }

  get id(): string | undefined {
    return this._id;
  }
  get userName(): string {
    return this._userName;
  }
  get email(): string {
    return this._email;
  }
  get password(): string {
    return this._password;
  }
  get profileId(): string | undefined {
    return this._profileId;
  }
  get profile(): string | undefined {
    return this._profile;
  }

  get houseIds(): string[] | undefined {
    return this._houseIds;
  }
  get stockIds(): string[] | undefined {
    return this._stockIds;
  }

  set id(value: string | undefined) {
    this._id = value;
  }
  set userName(value: string) {
    this._userName = value;
  }
  set email(value: string) {
    this._email = value;
  }
  set password(value: string) {
    this._password = value;
  }
  set profileId(value: string | undefined) {
    this._profileId = value;
  }
  set profile(value: string | undefined) {
    this._profile = value;
  }
  set houseIds(value: string[] | undefined) {
    this._houseIds = value;
  }
  set stockIds(value: string[] | undefined) {
    this._stockIds = value;
  }
}
