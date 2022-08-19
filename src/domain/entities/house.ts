export type ConstructHouseDTO = {
  id?: string;
  address: string;
  valuation: number;
  createdAt: Date;
  userId?: string;
};

export class House {
  private _id?: string;
  private _address: string;
  private _valuation: number;
  private _createdAt: Date;
  private _userId: string | undefined;

  constructor(params: ConstructHouseDTO) {
    this._id = params.id;
    this._address = params.address;
    this._valuation = params.valuation;
    this._createdAt = params.createdAt || new Date();
    this._userId = params.userId;
  }

  get id(): string | undefined {
    return this._id;
  }

  get address(): string {
    return this._address;
  }

  get valuation(): number {
    return this._valuation;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get userId(): string | undefined {
    return this._userId;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  set address(value: string) {
    this._address = value;
  }

  set valuation(value: number) {
    this._valuation = value;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  set userId(value: string | undefined) {
    this._userId = value;
  }
}
