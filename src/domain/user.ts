export type ConstructUserDTO = {
  id?: string;
  userName: string;
  email: string;
  password: string;
  profile?: string;
  houses?: string;
};

export class User {
  private _id?: string;
  private _userName: string;
  private _email: string;
  private _password: string;
  private _profile: string | undefined;
  private _houses: string | undefined;

   constructor(params: ConstructUserDTO) {
    this._id = params.id;
    this._userName = params.userName;
    this._email = params.email;
    this._password = params.password;
    this._profile = params.profile;
    this._houses = params.houses;
  }

 

  get id(): string | undefined{
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
  get profile(): string | undefined {
    return this._profile;
  }

  get houses(): string | undefined {
    return this._houses;
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
  set profile(value: string | undefined) {
    this._profile = value;
  }
  set houses(value: string | undefined) {
    this._houses = value;
  }
}


