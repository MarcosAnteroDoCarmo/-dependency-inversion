export type ConstructProfileDTO = {
  id?: string;
  userName: string;
  createdAt: Date;
  userId: string;
};

export class Profile {
  _id?: string;
  _userName: string;
  _createdAt: Date;
  _userId: string;

  constructor(params: ConstructProfileDTO) {
    this._id = params.id;
    this._userName = params.userName;
    this._createdAt = params.createdAt || new Date();
    this._userId = params.userId;
  }

  get id(): string | undefined {
    return this._id;
  }

  get userName(): string {
    return this._userName;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get userId(): string {
    return this._userId;
  }

  set id(value: string | undefined) {
    this._id = value;
  }
  set userName(value: string) {
    this._userName = value;
  }
  set createdAt(value: Date) {
    this._createdAt = value;
  }
  set userId(value: string) {
    this._userId = value;
  }
}
